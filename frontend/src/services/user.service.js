import axios from "../axios"

const handleLogin = (email, password) => {
  try {
    return axios.post('/api/login', { email, password });
  } catch (error) {
    console.log(error)
  }
}

export default {
  handleLogin,
}