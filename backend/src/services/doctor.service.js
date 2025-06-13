const { where } = require("sequelize");
const db = require("../models");
import _ from 'lodash'
require('dotenv').config();

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

const getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {};
      const data = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        limit: limit,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['password'] },
        include: [
          { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
          { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
        ],
        raw: true,
        nest: true,
      });
      if (data) {
        response.EC = 0;
        response.EM = "Get data success";
        response.data = data;
      } else {
        response.EC = 3;
        response.EM = "Get data failed";
      }
      resolve(response);
    } catch (error) {
      reject(error);
    }
  })
}

const getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: { exclude: ['password', 'image'] }
      })
      resolve({
        EC: 0,
        EM: "Get all doctor success",
        data: doctors
      });
    } catch (error) {
      reject(error);
    }
  })
}


const createNewDetailDoctor = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("Check data payload: ", payload);
      if (!payload.doctorId || !payload.contentHTML || !payload.contentMarkdown || !payload.action || !payload.selectedPrice || !payload.selectedPayment || !payload.selectedProvince || !payload.nameClinic || !payload.addressClinic)
        resolve({ EC: 2, EM: "Missing required params" })


      // UPSERT MARKDOWN
      if (payload.action === "CREATE") {
        await db.Markdown.create({
          contentHTML: payload.contentHTML,
          contentMarkdown: payload.contentMarkdown,
          description: payload.description,
          doctorId: payload.doctorId,
        })
      } else if (payload.action === "EDIT") {
        const res = await db.Markdown.update(
          {
            contentHTML: payload.contentHTML,
            contentMarkdown: payload.contentMarkdown,
            description: payload.description,
          },
          { where: { doctorId: payload.doctorId } }
        )
        if (res[0] === 0) resolve({ EC: 3, EM: "Markdown doctor not found" })
      }

      // UPSERT DOCTOR INFO
      const [doctorInfo, created] = await db.Doctor_Info.upsert({
        doctorId: payload.doctorId,
        priceId: payload.selectedPrice,
        provinceId: payload.selectedProvince,
        paymentId: payload.selectedPayment,
        addressClinic: payload.addressClinic,
        nameClinic: payload.nameClinic,
        note: payload.note,
      });

      if (created) {
        resolve({ EC: 0, EM: "Created Doctor Info Successed" });
      } else {
        resolve({ EC: 0, EM: "Update Doctor Info Successed" });
      }

      resolve({ EC: 0, EM: " Save Markdown Success" });
    } catch (error) {
      reject(error);
    }
  })
}

const getDetailDoctorById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.findOne({
        where: { id: doctorId },
        attributes: {
          exclude: ['password'],
        },
        include: [
          { model: db.Markdown, as: 'markdown_data', attributes: ["description", "contentMarkdown", "contentHTML"] },
          { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
          {
            model: db.Doctor_Info, as: 'doctor_info',
            attributes: {
              exclude: ['id', 'doctorId']
            },
            include: [
              { model: db.Allcode, as: 'price_data', attributes: ['valueEn', 'valueVi'] },
              { model: db.Allcode, as: 'payment_data', attributes: ['valueEn', 'valueVi'] },
              { model: db.Allcode, as: 'province_data', attributes: ['valueEn', 'valueVi'] },
            ],
          },
        ],
        raw: false,
        nest: true,
      });

      // console.log("Full result:", JSON.stringify(res, null, 2));
      if (!res) resolve({ EC: 3, EM: "Cannot find doctor" });
      if (res.image) {
        res.image = Buffer.from(res.image, 'base64').toString('binary');
      }
      resolve({ EC: 0, EM: "Get detail success", detail: res });
    } catch (error) {
      reject(error);
    }
  })
}

const getMarkDownDoctor = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Markdown.findOne({
        where: { doctorId: doctorId },
        attributes: ['contentHTML', 'contentMarkdown', 'description']
      });

      const doctorInfo = await db.Doctor_Info.findOne({
        where: { doctorId: doctorId },
        attributes: {
          exclude: ['id', 'doctorId']
        }
      })

      const newData = _.cloneDeep(res);
      newData.doctorInfo = doctorInfo || {};

      if (!newData) resolve({ EC: 3, EM: "Cannot find doctor", detail: {} });
      resolve({ EC: 0, EM: "Get markdown doctor success", detail: newData });
    } catch (error) {
      reject(error);
    }
  })
}

const bulkCreateSchedule = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!payload && !payload.data) resolve({ EC: 1, EM: "Missing required params" });
      else {
        let scheduleData = payload.data;
        scheduleData = scheduleData.map(item => ({
          ...item,
          maxNumber: MAX_NUMBER_SCHEDULE,
        }));

        // get existing schedule
        const { doctorId, date } = scheduleData[0];
        let existSchedule = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: date },
          attributes: ['maxNumber', 'date', 'timeType', 'doctorId']
        });

        // compare schedule
        const diffSchedule = _.differenceWith(scheduleData, existSchedule, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        })
        if (diffSchedule && diffSchedule.length > 0) {
          await db.Schedule.bulkCreate(diffSchedule);
          resolve({ EC: 0, EM: "Save schedule success" });
        }
        resolve({ EC: 0, EM: "Cannot save more schedule!" });
      }
    } catch (error) {
      reject(error);
    }
  })
}

const getScheduleDoctor = (doctorId, day) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!day && !doctorId) resolve({ EC: 1, EM: "Missing required params" });
      else {
        let data = await db.Schedule.findAll({
          where: { doctorId: doctorId, date: day },
          include: [
            { model: db.Allcode, as: 'scheduleData', attributes: ['valueEn', 'valueVi'] },
          ],
          raw: true,
          nest: true,
        });
        if (!data) data = [];
        resolve({ EC: 0, data: data });
      }
    } catch (error) {
      reject(error);
    }
  })

}

const getExtraInfoDoctorById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({ EC: 1, EM: "Missing required params" });
      }
      else {
        const res = await db.Doctor_Info.findOne({
          where: { doctorId: doctorId },
          attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] },
          include: [
            { model: db.Allcode, as: 'price_data', attributes: ['valueEn', 'valueVi'] },
            { model: db.Allcode, as: 'payment_data', attributes: ['valueEn', 'valueVi'] },
            { model: db.Allcode, as: 'province_data', attributes: ['valueEn', 'valueVi'] },
          ],
          raw: false,
          nest: true,
        });

        if (!res) {
          resolve({ EC: 2, EM: "Cannot find doctor info", infoDoctor: {} })
        }
        resolve({ EC: 0, EM: "OK", infoDoctor: res });
      }
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  createNewDetailDoctor: createNewDetailDoctor,
  getDetailDoctorById: getDetailDoctorById,
  getMarkDownDoctor: getMarkDownDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctor: getScheduleDoctor,
  getExtraInfoDoctorById: getExtraInfoDoctorById
}