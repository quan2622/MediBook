import db from "../models/index"
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);


const handleUserLogin = async (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const emailExist = await checkUserEmail(email);
      if (emailExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ['email', 'password', 'roleId'],
          raw: true
        });
        if (user) {
          const check = bcrypt.compareSync(pass, user.password);

          if (check) {
            userData.EC = 0;
            userData.EM = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.EC = 3;
            userData.EM = "Wrong password";
          }
        } else {
          userData.EC = 2;
          userData.EM = `User not found`;
        }
      } else {
        userData.EC = 1;
        userData.EM = `Email isn't exist. Plz try other email!`;
      }

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  })
}

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { email: userEmail } })
      if (user) resolve(true);
      else resolve(false);
    } catch (error) {
      reject(error);
    }
  })
}

const getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = '';
      if (userId === "all") {
        user = await db.User.findAll({ attributes: { exclude: ['password'] } });
      }
      if (userId && userId !== "all") {
        user = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ['password'] },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  })
}

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmail = await checkUserEmail(data.email);
      if (!checkEmail) {
        let hash = await hashPassword(data.password);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hash,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          EC: 0,
          EM: "OK"
        });
      } else {
        resolve({
          EC: 1,
          EM: "Your email had been used. Try another email"
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          EC: 2,
          EM: "Missing required parameters"
        })
      }
      let user = await db.User.findOne({ where: { id: data.id }, raw: false });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve({
          EC: 0,
          EM: "Update user success",
        })
      } else {
        resolve({
          EC: 1,
          EM: "User not found",
        })
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const user = await db.User.findOne({ where: { id: userId }, raw: false });
      const user = await db.User.findOne({ where: { id: userId } });
      if (user) {
        // await user.destroy();
        await db.User.destroy({ where: { id: userId } });
        resolve({
          EC: 0,
          EM: "Delete success",
        });
      } else {
        resolve({
          EC: 2,
          EM: `User does not exist`,
        })
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
  getAllUser,
  createNewUser,
  updateUserData,
  deleteUserById,
}