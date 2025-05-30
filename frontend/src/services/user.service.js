import axios from "../axios"

const handleLogin = (email, password) => {
  try {
    return axios.post('/api/login', { email, password });
  } catch (error) {
    console.log(error)
  }
}

const getAllUser = (id) => {
  try {
    // id is all if getAll data & idUser if get detail info user
    return axios.get('/api/get-all-user', { params: { id: id } });
  } catch (error) {
    console.log(error)
  }
}

const createNewUser = (data) => {
  try {
    return axios.post("/api/create-user", data);
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = (id) => {
  try {
    return axios.delete(`/api/delete-user`, { data: { userId: id } });
  } catch (error) {
    console.log(error);
  }
}

const updateDataUser = (data) => {
  try {
    return axios.put('/api/edit-user', data);
  } catch (error) {
    console.log(error)
  }
}

const getAllCodeService = (typeOfCode) => {
  try {
    return axios.get(`/api/allcode?type=${typeOfCode}`);
  } catch (error) {
    console.log(error)
  }
}

const getTopDoctorHome = (limit) => {
  try {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
  } catch (error) {
    console.log(error);
  }
}

const getAllDoctor = () => {
  try {
    return axios.get("/api/get-all-doctor");
  } catch (error) {
    console.log(error);
  }
}

const saveDetaiDatalDoctor = (data) => {
  try {
    return axios.post("/api/save-detail-doctor", data);
  } catch (error) {
    console.log(error);
  }
}

const getDetailDataDoctor = (doctorId) => {
  try {
    return axios.get(`/api/get-detail-doctor?id=${doctorId}`)
  } catch (error) {
    console.log(error);
  }
}

const userService = {
  handleLogin,
  getAllUser,
  createNewUser,
  deleteUser,
  updateDataUser,
  getAllCodeService,
  getTopDoctorHome,
  getAllDoctor,
  saveDetaiDatalDoctor,
  getDetailDataDoctor,
};

export default userService;