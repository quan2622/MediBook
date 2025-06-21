import specialtyService from "../services/specialty.service";

// POST /api/create-new-specialty
const createNewSpecialty = async (req, res) => {
  try {
    const data = await specialtyService.createNewSpecialty(req.body);
    return res.status(200).json({ ...data });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EC: 1,
      EM: "Error when createnew specialty!"
    })
  }
}

// GET /api/get-all-specialty
const getAllSpecialty = async (req, res) => {
  try {
    const data = await specialtyService.getAllSpecialty();
    return res.status(200).json({ ...data });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EC: 1,
      EM: "Error when createnew specialty!"
    })
  }
}

export default {
  createNewSpecialty,
  getAllSpecialty,
}