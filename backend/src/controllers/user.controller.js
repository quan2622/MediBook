import userService from "../services/user.service"

// POST /api/login
const hanleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
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

module.exports = {
  hanleLogin,
}