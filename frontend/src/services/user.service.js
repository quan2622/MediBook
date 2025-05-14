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

export default {
  handleLogin,
  getAllUser,
  createNewUser,
}