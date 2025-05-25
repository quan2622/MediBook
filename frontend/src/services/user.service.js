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

export default {
  handleLogin,
  getAllUser,
  createNewUser,
  deleteUser,
  updateDataUser,
  getAllCodeService,
}