const doctorService = require("../services/doctor.service");

// GET api/top-doctor-home
const getTopDoctorHome = async (req, res) => {
  let limit = +req.query.limit;
  if (!limit) limit = 10;
  try {
    const data = await doctorService.getTopDoctorHome(limit);
    return res.status(200).json({ ...data })
  } catch (error) {
    console.log("Error get top doctor: ", error);
    return res.status(200).json({
      EC: 1,
      EM: "Error when get doctor limit!"
    })
  }
}

module.exports = {
  getTopDoctorHome,
}