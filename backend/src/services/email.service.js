require('dotenv').config();
import nodemailer from "nodemailer"
import { google } from "googleapis"


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmailBooking = async (receiver, dataSend) => {
  const accessTokenObject = await oAuth2Client.getAccessToken();

  const accessToken = accessTokenObject.token || accessTokenObject;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 587,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_APP,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const subject = dataSend.language === "vi" ? "✔ Thông tin đặt lịch khám bệnh" : "✔ Appointment information for medical examination";
  const contentEmail = buildBodyEmail(dataSend.language, dataSend);

  const info = await transporter.sendMail({
    from: '"MediBook 🏥" <quanb2203527@student.ctu.edu.vn>',
    to: receiver,
    subject: subject,
    html: contentEmail,
  });
}


let buildBodyEmail = (language, dataSend) => {
  let res = "";
  if (language === 'vi') {
    res = `
     <div>
        <h2 style="color: #2b7de9; text-align: center;">MediBook - Xác nhận lịch khám</h2>

       <div style="width: 100%; text-align: center;">
          <div style="display: inline-block; text-align: left; max-width: 600px; width: 100%;">
            <p>Xin chào <strong>${dataSend.pateintName}</strong>,</p>
            <p>Bạn đã đặt lịch khám bệnh thành công thông qua MediBook với các thông tin như sau:</p>

            <ul>
              <li><strong>Bác sĩ:</strong> ${dataSend.doctorName}</li>
              <li><strong>Thời gian:</strong> ${dataSend.appointmentTime}</li>
              <li><strong>Địa điểm:</strong> ${dataSend.clinicAddress}</li>
            </ul>

            <p>Vui lòng đến đúng giờ và mang theo các giấy tờ cần thiết.</p>
            <p>Nếu bạn có bất kỳ thắc mắc nào, hãy liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.</p>

            <p style="margin-top: 20px;">
              <a href="${dataSend.confirmationLink}" target="_blank" style="color: #2b7de9; text-decoration: none;">
                Nếu thông tin trên đúng sự thật, vui lòng click vào đường link để xác nhận và hoàn tất thủ tục đặt lịch.
              </a>
            </p>
          </div>
        </div>


        <p style="margin-top: 30px; font-size: 13px; color: #666; text-align: center;">
          Cảm ơn bạn đã tin tưởng MediBook.<br />
          © 2025 MediBook. All rights reserved.
        </p>
      </div>
    `
  } else {
    res = `
     <div>
        <h2 style="color: #2b7de9; text-align: center;">MediBook - Confirm the appointment schedule</h2>

       <div style="width: 100%; text-align: center;">
          <div style="display: inline-block; text-align: left; max-width: 600px; width: 100%;">
            <p>Dear <strong>${dataSend.pateintName}</strong>,</p>
            <p>You have successfully scheduled a medical appointment through MediBook with the following information:</p>

            <ul>
              <li><strong>Doctor name:</strong> ${dataSend.doctorName}</li>
              <li><strong>Appoinment time:</strong> ${dataSend.appointmentTime}</li>
              <li><strong>Clinic's address:</strong> ${dataSend.clinicAddress}</li>
            </ul>

            <p>Please arrive on time and bring the necessary documents.</p>
            <p>If you have any questions, please contact us via email or the support phone number.</p>

            <p style="margin-top: 20px;">
              <a href="${dataSend.confirmationLink}" target="_blank" style="color: #2b7de9; text-decoration: none;">
                If the information above is true, please click on the link to confirm and complete the scheduling procedure.
              </a>
            </p>
          </div>
        </div>


        <p style="margin-top: 30px; font-size: 13px; color: #666; text-align: center;">
         Thank you for trusting MediBook.<br />
          © 2025 MediBook. All rights reserved.
        </p>
      </div>
    `
  }
  return res;

}

module.exports = {
  sendEmailBooking,
}