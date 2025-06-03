const { where } = require("sequelize");
const db = require("../models");

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
      if (!payload.doctorId || !payload.contentHTML || !payload.contentMarkdown || !payload.action)
        resolve({ EC: 2, EM: "Missing required params" })

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
      resolve({ EC: 0, EM: " Save Detail Success" });
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
        ],
        raw: false,
        nest: true,
      });
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
      if (!res) resolve({ EC: 3, EM: "Cannot find doctor", detail: {} });
      resolve({ EC: 0, EM: "Get markdown doctor success", detail: res });
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
}