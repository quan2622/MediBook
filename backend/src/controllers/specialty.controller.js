import specialtyService from "../services/specialty.service";

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

const getDataSpecialty = (req, res) => {

}

export default {
  createNewSpecialty,
  getDataSpecialty,
}