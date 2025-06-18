import db from "../models/index"
import emailService from "./email.service"
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config()

const isValidateEmail = (email) => {
  const regex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)]))$/;
  return regex.test(email);
}

const buildURL = (doctorId, token) => {
  const result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
}

const postBookingAppoinment = (dataBooking) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataBooking.email || !dataBooking.doctorId || !dataBooking.date || !dataBooking.timeType) {
        resolve({ EC: 1, EM: "Missing required params" });
      } else {
        if (!isValidateEmail(dataBooking.email)) {
          return resolve({ EC: 2, EM: "Invalid email!" });
        }

        const token = uuidv4();

        await emailService.sendEmailBooking(dataBooking.email, {
          pateintName: dataBooking.fullName,
          doctorName: dataBooking.doctorName,
          appointmentTime: dataBooking.appoinmentTime,
          clinicAddress: dataBooking.addressClinic,
          confirmationLink: buildURL(dataBooking.doctorId, token),
          language: dataBooking.language,
        });

        // create user if user hasn't account
        const [userData, created] = await db.User.findOrCreate({
          where: { email: dataBooking.email },
          defaults: {
            email: dataBooking.email,
            roleId: "R3",
          }
        })
        if (userData) {
          const [result, bookingCreated] = await db.Booking.findOrCreate({
            where: {
              patientId: userData.id,
              timeType: dataBooking.timeType
            },
            defaults: {
              statusId: "S1",
              doctorId: dataBooking.doctorId,
              patientId: userData.id,
              date: dataBooking.date,
              timeType: dataBooking.timeType,
              tokenConfirm: token,
            }
          })

          resolve({
            EC: 0,
            EM: bookingCreated ? "Booking succeed" : "Cannot booking one more!"
          })
        }


      }
    } catch (error) {
      reject(error);
    }
  })
}

const postVerifyBookingAppoinment = (dataVerify) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataVerify || !dataVerify.doctorId || !dataVerify.token) {
        return resolve({ EC: 2, EM: "Misisng required params!" });
      } else {
        console.log("Check data verify: ", dataVerify);
        const appoinment = await db.Booking.findOne({
          where: {
            doctorId: dataVerify.doctorId,
            tokenConfirm: dataVerify.token,
            statusId: "S1"
          },
          raw: false,
        });
        console.log('Check appoinment: ', appoinment);
        if (appoinment) {
          appoinment.statusId = "S2";
          await appoinment.save();
          resolve({ EC: 0, EM: "Your booking confirmed!" });
        } else {
          resolve({ EC: 2, EM: "Your booking had been confirmed or error token!" });
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}


module.exports = {
  postBookingAppoinment,
  postVerifyBookingAppoinment,
}