import db from "../models/index"
import bcrypt from "bcryptjs";


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

module.exports = {
  handleUserLogin,
}