import userService from "../services/user.service"

// POST /api/login
const hanleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("here", email, ' - ', password);
  if (!email || !password) {
    return res.status(500).json({
      EC: 1,
      message: "Missing inputs parameter",
    })
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    EC: userData.EC,
    EM: userData.EM,
    user: userData.user ? userData.user : {}
  })
}

// GET /api/get-all-user
const getAllUser = async (req, res, next) => {
  let { id } = req.body;
  if (!id) {
    return res.status(500).json({
      EC: 1,
      message: "Missing required parameter",
      user: [],
    })
  }

  const user = await userService.getAllUser(id);
  res.status(200).json({
    EC: 0,
    EM: "OK",
    user
  })
}

module.exports = {
  hanleLogin,
  getAllUser,
}