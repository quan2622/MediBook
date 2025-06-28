"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _googleapis = require("googleapis");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URI = process.env.REDIRECT_URI;
var REFRESH_TOKEN = process.env.REFRESH_TOKEN;
var oAuth2Client = new _googleapis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN
});
var sendEmailBooking = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(receiver, dataSend) {
    var accessTokenObject, accessToken, transporter, subject, contentEmail, info;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return oAuth2Client.getAccessToken();
        case 1:
          accessTokenObject = _context.v;
          accessToken = accessTokenObject.token || accessTokenObject;
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            // port: 587,
            port: 465,
            secure: true,
            // true for 465, false for other ports
            auth: {
              type: 'OAuth2',
              user: process.env.EMAIL_APP,
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
            }
          });
          subject = dataSend.language === "vi" ? "✔ Thông tin đặt lịch khám bệnh" : "✔ Appointment information for medical examination";
          contentEmail = buildBodyEmail(dataSend.language, dataSend);
          _context.n = 2;
          return transporter.sendMail({
            from: '"MediBook 🏥" <quanb2203527@student.ctu.edu.vn>',
            to: receiver,
            subject: subject,
            html: contentEmail
          });
        case 2:
          info = _context.v;
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function sendEmailBooking(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var buildBodyEmail = function buildBodyEmail(language, dataSend) {
  var res = "";
  if (language === 'vi') {
    res = "\n     <div>\n        <h2 style=\"color: #2b7de9; text-align: center;\">MediBook - X\xE1c nh\u1EADn l\u1ECBch kh\xE1m</h2>\n\n       <div style=\"width: 100%; text-align: center;\">\n          <div style=\"display: inline-block; text-align: left; max-width: 600px; width: 100%;\">\n            <p>Xin ch\xE0o <strong>".concat(dataSend.pateintName, "</strong>,</p>\n            <p>B\u1EA1n \u0111\xE3 \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh th\xE0nh c\xF4ng th\xF4ng qua MediBook v\u1EDBi c\xE1c th\xF4ng tin nh\u01B0 sau:</p>\n\n            <ul>\n              <li><strong>B\xE1c s\u0129:</strong> ").concat(dataSend.doctorName, "</li>\n              <li><strong>Th\u1EDDi gian:</strong> ").concat(dataSend.appointmentTime, "</li>\n              <li><strong>\u0110\u1ECBa \u0111i\u1EC3m:</strong> ").concat(dataSend.clinicAddress, "</li>\n            </ul>\n\n            <p>Vui l\xF2ng \u0111\u1EBFn \u0111\xFAng gi\u1EDD v\xE0 mang theo c\xE1c gi\u1EA5y t\u1EDD c\u1EA7n thi\u1EBFt.</p>\n            <p>N\u1EBFu b\u1EA1n c\xF3 b\u1EA5t k\u1EF3 th\u1EAFc m\u1EAFc n\xE0o, h\xE3y li\xEAn h\u1EC7 v\u1EDBi ch\xFAng t\xF4i qua email ho\u1EB7c s\u1ED1 \u0111i\u1EC7n tho\u1EA1i h\u1ED7 tr\u1EE3.</p>\n\n            <p style=\"margin-top: 20px;\">\n              <a href=\"").concat(dataSend.confirmationLink, "\" target=\"_blank\" style=\"color: #2b7de9; text-decoration: none;\">\n                N\u1EBFu th\xF4ng tin tr\xEAn \u0111\xFAng s\u1EF1 th\u1EADt, vui l\xF2ng click v\xE0o \u0111\u01B0\u1EDDng link \u0111\u1EC3 x\xE1c nh\u1EADn v\xE0 ho\xE0n t\u1EA5t th\u1EE7 t\u1EE5c \u0111\u1EB7t l\u1ECBch.\n              </a>\n            </p>\n          </div>\n        </div>\n\n\n        <p style=\"margin-top: 30px; font-size: 13px; color: #666; text-align: center;\">\n          C\u1EA3m \u01A1n b\u1EA1n \u0111\xE3 tin t\u01B0\u1EDFng MediBook.<br />\n          \xA9 2025 MediBook. All rights reserved.\n        </p>\n      </div>\n    ");
  } else {
    res = "\n     <div>\n        <h2 style=\"color: #2b7de9; text-align: center;\">MediBook - Confirm the appointment schedule</h2>\n\n       <div style=\"width: 100%; text-align: center;\">\n          <div style=\"display: inline-block; text-align: left; max-width: 600px; width: 100%;\">\n            <p>Dear <strong>".concat(dataSend.pateintName, "</strong>,</p>\n            <p>You have successfully scheduled a medical appointment through MediBook with the following information:</p>\n\n            <ul>\n              <li><strong>Doctor name:</strong> ").concat(dataSend.doctorName, "</li>\n              <li><strong>Appoinment time:</strong> ").concat(dataSend.appointmentTime, "</li>\n              <li><strong>Clinic's address:</strong> ").concat(dataSend.clinicAddress, "</li>\n            </ul>\n\n            <p>Please arrive on time and bring the necessary documents.</p>\n            <p>If you have any questions, please contact us via email or the support phone number.</p>\n\n            <p style=\"margin-top: 20px;\">\n              <a href=\"").concat(dataSend.confirmationLink, "\" target=\"_blank\" style=\"color: #2b7de9; text-decoration: none;\">\n                If the information above is true, please click on the link to confirm and complete the scheduling procedure.\n              </a>\n            </p>\n          </div>\n        </div>\n\n\n        <p style=\"margin-top: 30px; font-size: 13px; color: #666; text-align: center;\">\n         Thank you for trusting MediBook.<br />\n          \xA9 2025 MediBook. All rights reserved.\n        </p>\n      </div>\n    ");
  }
  return res;
};
var buildBodyRemedy = function buildBodyRemedy(language, dataSend) {
  var res = "";
  if (language === 'vi') {
    res = "\n      <div>\n        <h2 style=\"color: #2b7de9; text-align: center;\">MediBook - G\u1EEDi \u0111\u01A1n thu\u1ED1c cho b\u1EC7nh nh\xE2n</h2>\n  \n        <div style=\"width: 100%; text-align: center;\">\n          <div style=\"display: inline-block; text-align: left; max-width: 600px; width: 100%;\">\n            <p>Xin ch\xE0o <strong>".concat(dataSend.patientName, "</strong>, b\u1EA1n v\u1EEBa ho\xE0n t\u1EA5t bu\u1ED5i kh\xE1m v\u1EDBi b\xE1c s\u0129.</p>\n  \n            <p>Ch\xFAng t\xF4i g\u1EEDi k\xE8m theo \u0111\u01A1n thu\u1ED1c v\xE0 h\u01B0\u1EDBng d\u1EABn s\u1EED d\u1EE5ng \u0111\u1EC3 b\u1EA1n ti\u1EC7n theo d\xF5i v\xE0 \u0111i\u1EC1u tr\u1ECB. Vui l\xF2ng ki\u1EC3m tra file \u0111\xEDnh k\xE8m trong email n\xE0y.</p>\n  \n            <p>N\u1EBFu b\u1EA1n c\xF3 b\u1EA5t k\u1EF3 c\xE2u h\u1ECFi n\xE0o li\xEAn quan \u0111\u1EBFn \u0111\u01A1n thu\u1ED1c, h\xE3y li\xEAn h\u1EC7 v\u1EDBi ch\xFAng t\xF4i ho\u1EB7c tr\u1EF1c ti\u1EBFp v\u1EDBi b\xE1c s\u0129 \u0111i\u1EC1u tr\u1ECB.</p>\n  \n            <p style=\"margin-top: 20px;\">Ch\xFAc b\u1EA1n mau ch\xF3ng h\u1ED3i ph\u1EE5c s\u1EE9c kh\u1ECFe!</p>\n          </div>\n        </div>\n  \n        <p style=\"margin-top: 30px; font-size: 13px; color: #666; text-align: center;\">\n          Tr\xE2n tr\u1ECDng,<br />\n          \u0110\u1ED9i ng\u0169 MediBook<br />\n          \xA9 2025 MediBook. All rights reserved.\n        </p>\n      </div>\n    ");
  } else {
    res = "\n      <div>\n        <h2 style=\"color: #2b7de9; text-align: center;\">MediBook - Prescription from your doctor</h2>\n  \n        <div style=\"width: 100%; text-align: center;\">\n          <div style=\"display: inline-block; text-align: left; max-width: 600px; width: 100%;\">\n            <p>Dear <strong>".concat(dataSend.patientName, "</strong>!, You have just completed your appointment.</p>\n  \n            <p>We are sending you the prescription and usage instructions in the attached file for your convenience and treatment follow-up.</p>\n  \n            <p>If you have any questions regarding the prescription, please contact us or your doctor directly.</p>\n  \n            <p style=\"margin-top: 20px;\">Wishing you a speedy recovery!</p>\n          </div>\n        </div>\n  \n        <p style=\"margin-top: 30px; font-size: 13px; color: #666; text-align: center;\">\n          Best regards,<br />\n          MediBook Team<br />\n          \xA9 2025 MediBook. All rights reserved.\n        </p>\n      </div>\n    ");
  }
  return res;
};
var sendAttatchment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(receiver, dataSend) {
    var accessTokenObject, accessToken, transporter, subject, contentEmail, imageRecieved, matches, mimeType, extension, base64Data, info;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return oAuth2Client.getAccessToken();
        case 1:
          accessTokenObject = _context2.v;
          accessToken = accessTokenObject.token || accessTokenObject;
          transporter = _nodemailer["default"].createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              type: 'OAuth2',
              user: process.env.EMAIL_APP,
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken
            }
          });
          subject = dataSend.language === "vi" ? "📁 Thông tin khám bệnh" : "📁 Medical examination information";
          contentEmail = buildBodyRemedy(dataSend.language, dataSend);
          imageRecieved = dataSend.imageBase64;
          matches = imageRecieved.match(/^data:(image\/\w+);base64,(.+)$/);
          mimeType = matches[1];
          extension = mimeType.split('/')[1];
          base64Data = matches[2];
          _context2.n = 2;
          return transporter.sendMail({
            from: '"MediBook 🏥" <quanb2203527@student.ctu.edu.vn>',
            to: receiver,
            subject: subject,
            html: contentEmail,
            attachments: [{
              filename: "remedy-".concat(dataSend.patientId, "-").concat(new Date().getTime(), ".").concat(extension),
              content: base64Data,
              encoding: "base64",
              contentType: mimeType
            }]
          });
        case 2:
          info = _context2.v;
        case 3:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function sendAttatchment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var _default = exports["default"] = {
  sendEmailBooking: sendEmailBooking,
  sendAttatchment: sendAttatchment
};