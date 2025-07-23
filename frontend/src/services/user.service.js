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

const getDetailDataDoctor = (doctorId, hasMarkdown = false) => {
  try {
    return axios.get(`/api/get-detail-doctor?id=${doctorId}&markdown=${hasMarkdown}`)
  } catch (error) {
    console.log(error);
  }
}

const saveScheduleDoctor = (data) => {
  try {
    return axios.post('/api/bulk-create-schedule', { data: data })
  } catch (error) {
    console.log(error)
  }
}

const fetchScheduleDoctor = (doctorId, day) => {
  try {
    return axios.get(`/api/get-schedule-doctor?doctorId=${doctorId}&day=${day}`)
  } catch (error) {
    console.log(error)
  }
}

const getExtraInfoDoctor = (doctorId) => {
  try {
    return axios.get(`/api/get-extra-info-doctor-by-id/${doctorId}`)
  } catch (error) {
    console.log(error)
  }
}

const getProfileDoctor = (doctorId) => {
  try {
    return axios.get(`/api/get-profile-doctor-by-id/${doctorId}`)
  } catch (error) {
    console.log(error)
  }
}

const postBookingAppoinment = (dataBooking) => {
  try {
    return axios.post(`/api/post-booking-appoinment`, dataBooking);
  } catch (error) {
    console.log(error);
  }
}

const verifyBooking = (dataVerify) => {
  try {
    return axios.post(`/api/verify-booking-appoinment`, dataVerify);
  } catch (error) {
    console.log(error);
  }
}

const getDataBooking = (token) => {
  try {
    return axios.get(`/api/get-booking-appoinment/${token}`);
  } catch (error) {
    console.log(error);
  }
}

const createNewSpecialty = (payload) => {
  try {
    return axios.post("/api/create-new-specialty", payload);
  } catch (error) {
    console.log(error)
  }
}

const getAllSpecialty = () => {
  try {
    return axios.get(`/api/get-all-specialty`);
  } catch (error) {
    console.log(error);
  }
}

const getDetailSpecialty = (specialtyId, location) => {
  try {
    return axios.get(`/api/get-detail-specialty?id=${specialtyId}&location=${location}`);
  } catch (error) {
    console.log(error);
  }
}

const createNewClinic = (payload) => {
  try {
    return axios.post("/api/create-new-clinic", payload);
  } catch (error) {
    console.log(error)
  }
}

const getAllClinic = () => {
  try {
    return axios.get(`/api/get-all-clinic`);
  } catch (error) {
    console.log(error);
  }
}


const getDetailClinic = (clinicId) => {
  try {
    return axios.get(`/api/get-detail-clinic?id=${clinicId}`);
  } catch (error) {
    console.log(error);
  }
}

const getListPatientForDoctor = (doctorId, date) => {
  try {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`);
  } catch (error) {
    console.log(error);
  }
}

const sendRemedy = (payload) => {
  try {
    return axios.post(`/api/send-remedy`, payload);
  } catch (error) {
    console.log(error);
  }
}

const loginWithGoogle = (credentialResponse) => {
  return axios.post('/api/auth/google', {
    token: credentialResponse.credential
  });
}

const userService = {
  loginWithGoogle,
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
  saveScheduleDoctor,
  fetchScheduleDoctor,
  getExtraInfoDoctor,
  getProfileDoctor,
  postBookingAppoinment,
  verifyBooking,
  getDataBooking,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialty,
  createNewClinic,
  getAllClinic,
  getDetailClinic,
  getListPatientForDoctor,
  sendRemedy,
};

export default userService;