import db from "../models/index"
import emailService from "./email.service"

const postBookingAppoinment = (dataBooking) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataBooking.email || !dataBooking.doctorId || !dataBooking.date || !dataBooking.timeType) {
        resolve({ EC: 1, EM: "Missing required params" });
      } else {
        await emailService.sendEmailBooking(dataBooking.email, {
          pateintName: "Nguyen Hong Quan",
          doctorName: "Bui Tien J",
          appointmentTime: "3:00 PM - 4:30 PM, Thứ 4 ngày 17/06/2025",
          clinicAddress: "Ninh Kiều, Cần Thơ",
          confirmationLink: "https://www.tiktok.com/"
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