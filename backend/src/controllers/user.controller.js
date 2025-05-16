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
  let { id } = req.query;
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

// POST /api/create-user
const createUser = async (req, res, next) => {
  const response = await userService.createNewUser(req.body);
  return res.status(200).json({ ...response })
}

// PUT /api/edit-user
const editUser = async (req, res, next) => {
  const response = await userService.updateUserData(req.body);
  return res.status(200).json({ ...response })
}

// DELETE /api/delete-user
const deleteUser = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId)
    return res.status(200).json({
      EC: 1,
      EM: "Missing required parameters"
    });
  const response = await userService.deleteUserById(userId);
  return res.status(200).json({ ...response })
}



module.exports = {
  hanleLogin,
  getAllUser,
  createUser,
  editUser,
  deleteUser,
}