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
      if (!payload.doctorId || !payload.contentHTML || !payload.contentMarkdown)
        resolve({ EC: 2, EM: "Missing required params" })

      await db.Markdown.create({
        contentHTML: payload.contentHTML,
        contentMarkdown: payload.contentMarkdown,
        description: payload.description,
        doctorId: payload.doctorId,
      })
      resolve({ EC: 0, EM: " Save Detail Success" });
    } catch (error) {
      reject(error);
    }
  })
}
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  createNewDetailDoctor: createNewDetailDoctor,
}