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
        attributes: { exclude: ['password', 'image'] },
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

module.exports = {
  getTopDoctorHome: getTopDoctorHome,
}