"use strict";

var _sequelize = require("sequelize");
var _index = _interopRequireDefault(require("../models/index"));
var _email = _interopRequireDefault(require("./email.service"));
var _uuid = require("uuid");
var _clouderrorreporting = require("googleapis/build/src/apis/clouderrorreporting");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var isValidateEmail = function isValidateEmail(email) {
  var regex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)]))$/;
  return regex.test(email);
};
var buildURL = function buildURL(doctorId, token) {
  var result = "".concat(process.env.URL_REACT, "/verify-booking?token=").concat(token, "&doctorId=").concat(doctorId);
  return result;
};
var postBookingAppoinment = function postBookingAppoinment(dataBooking) {
  return new Promise(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve, reject) {
      var token, fullName, language, isVi, separate, firstPart, lastPart, _yield$db$User$findOr, _yield$db$User$findOr2, userData, created, _yield$db$Booking$fin, _yield$db$Booking$fin2, result, bookingCreated, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.p = 0;
            if (!(!dataBooking.email || !dataBooking.doctorId || !dataBooking.date || !dataBooking.timeType || !dataBooking.gender || !dataBooking.address || !dataBooking.phoneNumber)) {
              _context.n = 1;
              break;
            }
            resolve({
              EC: 1,
              EM: "Missing required params"
            });
            _context.n = 6;
            break;
          case 1:
            if (isValidateEmail(dataBooking.email)) {
              _context.n = 2;
              break;
            }
            return _context.a(2, resolve({
              EC: 2,
              EM: "Invalid email!"
            }));
          case 2:
            token = (0, _uuid.v4)(); // create user if user hasn't account
            fullName = dataBooking.fullName, language = dataBooking.language;
            isVi = language === 'vi';
            separate = isVi ? fullName.lastIndexOf(" ") : fullName.indexOf(" ");
            firstPart = fullName.slice(0, separate);
            lastPart = fullName.slice(separate + 1);
            _context.n = 3;
            return _index["default"].User.findOrCreate({
              where: {
                email: dataBooking.email
              },
              defaults: {
                email: dataBooking.email,
                roleId: "R3",
                address: dataBooking.address,
                gender: dataBooking.gender,
                phoneNumber: dataBooking.phoneNumber,
                firstName: isVi ? lastPart : firstPart,
                lastName: isVi ? firstPart : lastPart
              }
            });
          case 3:
            _yield$db$User$findOr = _context.v;
            _yield$db$User$findOr2 = _slicedToArray(_yield$db$User$findOr, 2);
            userData = _yield$db$User$findOr2[0];
            created = _yield$db$User$findOr2[1];
            if (!userData) {
              _context.n = 6;
              break;
            }
            console.log("Check date: ", dataBooking.date);
            _context.n = 4;
            return _index["default"].Booking.findOrCreate({
              where: {
                patientId: userData.id,
                date: dataBooking.date
              },
              defaults: {
                statusId: "S1",
                doctorId: dataBooking.doctorId,
                patientId: userData.id,
                date: dataBooking.date,
                timeType: dataBooking.timeType,
                tokenConfirm: token
              }
            });
          case 4:
            _yield$db$Booking$fin = _context.v;
            _yield$db$Booking$fin2 = _slicedToArray(_yield$db$Booking$fin, 2);
            result = _yield$db$Booking$fin2[0];
            bookingCreated = _yield$db$Booking$fin2[1];
            console.log("Check booking: ", bookingCreated);
            if (!bookingCreated) {
              _context.n = 5;
              break;
            }
            _context.n = 5;
            return _email["default"].sendEmailBooking(dataBooking.email, {
              pateintName: dataBooking.fullName,
              doctorName: dataBooking.doctorName,
              appointmentTime: dataBooking.appoinmentTime,
              clinicAddress: dataBooking.addressClinic,
              confirmationLink: buildURL(dataBooking.doctorId, token),
              language: dataBooking.language
            });
          case 5:
            resolve({
              EC: 0,
              EM: bookingCreated ? "Booking succeed" : "Cannot booking one more!"
            });
          case 6:
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            reject(_t);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var postVerifyBookingAppoinment = function postVerifyBookingAppoinment(dataVerify) {
  return new Promise(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(resolve, reject) {
      var appoinment, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.p = 0;
            if (!(!dataVerify || !dataVerify.doctorId || !dataVerify.token)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, resolve({
              EC: 2,
              EM: "Misisng required params!"
            }));
          case 1:
            _context2.n = 2;
            return _index["default"].Booking.findOne({
              where: {
                doctorId: dataVerify.doctorId,
                tokenConfirm: dataVerify.token,
                statusId: "S1"
              },
              raw: false
            });
          case 2:
            appoinment = _context2.v;
            if (!appoinment) {
              _context2.n = 4;
              break;
            }
            appoinment.statusId = "S2";
            _context2.n = 3;
            return appoinment.save();
          case 3:
            resolve({
              EC: 0,
              EM: "Your booking confirmed!"
            });
            _context2.n = 5;
            break;
          case 4:
            resolve({
              EC: 2,
              EM: "Your booking had been confirmed or error token!"
            });
          case 5:
            _context2.n = 7;
            break;
          case 6:
            _context2.p = 6;
            _t2 = _context2.v;
            console.log(_t2);
          case 7:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 6]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var getDataAppoinment = function getDataAppoinment(token) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(resolve, reject) {
      var res, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.p = 0;
            if (token) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, resolve({
              EC: 1,
              EM: "Missing required params"
            }));
          case 1:
            _context3.n = 2;
            return _index["default"].Booking.findOne({
              where: {
                tokenConfirm: token
              },
              include: [{
                model: _index["default"].User,
                as: 'user_data',
                attributes: ['firstName', 'lastName']
              }, {
                model: _index["default"].Allcode,
                as: 'time_data',
                attributes: ['valueVi', 'valueEn']
              }, {
                model: _index["default"].User,
                as: 'doctor_data',
                attributes: ['firstName', 'lastName'],
                include: {
                  model: _index["default"].Doctor_Info,
                  as: 'doctor_info',
                  attributes: ['addressClinic', 'nameClinic']
                },
                raw: true,
                nest: true
              }],
              raw: true,
              nest: true
            });
          case 2:
            res = _context3.v;
            if (!res) {
              resolve({
                EC: 2,
                EM: "Cannot get data of this booking!"
              });
            } else {
              resolve({
                EC: 0,
                EM: "OK",
                dataBooking: res
              });
            }
          case 3:
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            console.log(_t3);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 4]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
module.exports = {
  postBookingAppoinment: postBookingAppoinment,
  postVerifyBookingAppoinment: postVerifyBookingAppoinment,
  getDataAppoinment: getDataAppoinment
};