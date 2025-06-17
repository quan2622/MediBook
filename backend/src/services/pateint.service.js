import db from "../models/index"
import emailService from "./email.service"

const isValidateEmail = (email) => {
  const regex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)]))$/;
  return regex.test(email);
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

        await emailService.sendEmailBooking(dataBooking.email, {
          pateintName: dataBooking.fullName,
          doctorName: dataBooking.doctorName,
          appointmentTime: dataBooking.appoinmentTime,
          clinicAddress: dataBooking.addressClinic,
          confirmationLink: "https://www.tiktok.com/",
          language: dataBooking.language
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

module.exports = {
  postBookingAppoinment,
}