const doctorService = require("../services/doctor.service");

// GET /api/top-doctor-home
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

// GET /api/get-all-doctor
const getAllDoctor = async (req, res) => {
  try {
    const data = await doctorService.getAllDoctor();
    return res.status(200).json(data)
  } catch (error) {
    console.log("Error get all doctor: ", error);
    return res.status(200).json({
      EC: 1,
      EM: "Error when get all doctor!"
    })
  }
}

// POST /api/save-detail-doctor
const createNewDetailDoctor = async (req, res) => {
  try {
    const response = await doctorService.createNewDetailDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error create detail doctor: ", error);
    return res.status(200).json({
      EC: 1,
      EM: "Error when save detail doctor!"
    })
  }
}

// GET /api/get-detail-doctor?id="doctorId"&markdown=hasMarkdown
const getDetailDoctor = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).json({ EC: 2, EM: "Missing doctorId!" });
    let response = null;
    if (req.query.markdown === 'true') {
      response = await doctorService.getMarkDownDoctor(req.query.id);
    } else {
      response = await doctorService.getDetailDoctorById(req.query.id);
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error get detail doctor: ", error);
    return res.status(500).json({
      EC: 1,
      EM: "Error when get detail doctor!"
    })
  }
}


// POST /api/bulk-create-schedule
const bulkCreateSchedule = async (req, res) => {
  try {
    const data = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error create schedule: ", error);
    return res.status(500).json({
      EC: 1,
      EM: "Error create schedule!"
    })
  }
}

// GET /api/get-schedule-doctor?doctorId=doctorId & day=day
const getScheduleDoctor = async (req, res) => {
  try {
    const data = await doctorService.getScheduleDoctor(req.query.doctorId, req.query.day);
    return res.status(200).json(data);
  } catch (error) {
    console.log("Error get schedule: ", error);
    return res.status(500).json({
      EC: 1,
      EM: "Error get schedule!"
    })
  }
}

module.exports = {
  getTopDoctorHome,
  getAllDoctor,
  createNewDetailDoctor,
  getDetailDoctor,
  bulkCreateSchedule,
  getScheduleDoctor
}