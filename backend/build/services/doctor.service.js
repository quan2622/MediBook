"use strict";

var _lodash = _interopRequireDefault(require("lodash"));
var _email = _interopRequireDefault(require("./email.service"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("sequelize"),
  where = _require.where,
  Op = _require.Op;
var db = require("../models");
require('dotenv').config();
var MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
var getTopDoctorHome = function getTopDoctorHome(limit) {
  return new Promise(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve, reject) {
      var response, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.p = 0;
            response = {};
            _context.n = 1;
            return db.User.findAll({
              where: {
                roleId: "R2"
              },
              limit: limit,
              order: [['createdAt', 'DESC']],
              attributes: {
                exclude: ['password']
              },
              include: [{
                model: db.Allcode,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: db.Allcode,
                as: 'genderData',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: true,
              nest: true
            });
          case 1:
            data = _context.v;
            if (data) {
              response.EC = 0;
              response.EM = "Get data success";
              response.data = data;
            } else {
              response.EC = 3;
              response.EM = "Get data failed";
            }
            resolve(response);
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            reject(_t);
          case 3:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAllDoctor = function getAllDoctor() {
  return new Promise(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(resolve, reject) {
      var doctors, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return db.User.findAll({
              where: {
                roleId: "R2"
              },
              attributes: {
                exclude: ['password', 'image']
              }
            });
          case 1:
            doctors = _context2.v;
            resolve({
              EC: 0,
              EM: "Get all doctor success",
              data: doctors
            });
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            reject(_t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var checkRquiredFields = function checkRquiredFields(data) {
  var arr = ["doctorId", "contentHTML", "contentMarkdown", "action", "selectedPrice", "selectedPayment", "selectedProvince", "selectedSpecialty", "selectedClinic", "nameClinic", "addressClinic"];
  var missingFields = arr.filter(function (item) {
    return !hasData(data[item]);
  });
  return {
    isValid: missingFields.length === 0,
    missingFields: missingFields
  };
};
var hasData = function hasData(value) {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value === 'number') return !isNaN(value);
  if (Array.isArray(value)) return value.length > 0;
  if (_typeof(value) === 'object') return Object.keys(value).length > 0;
  return true;
};
var createNewDetailDoctor = function createNewDetailDoctor(payload) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(resolve, reject) {
      var _checkRquiredFields, isValid, missingFields, res, _yield$db$Doctor_Info, _yield$db$Doctor_Info2, doctorInfo, created, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.p = 0;
            _checkRquiredFields = checkRquiredFields(payload), isValid = _checkRquiredFields.isValid, missingFields = _checkRquiredFields.missingFields;
            if (isValid) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, resolve({
              EC: 2,
              EM: "Missing required params",
              EF: missingFields
            }));
          case 1:
            if (!(payload.action === "CREATE")) {
              _context3.n = 3;
              break;
            }
            _context3.n = 2;
            return db.Markdown.create({
              contentHTML: payload.contentHTML,
              contentMarkdown: payload.contentMarkdown,
              description: payload.description,
              doctorId: payload.doctorId,
              specialtyId: +payload.selectedSpecialty,
              clinicId: +payload.selectedClinic
            });
          case 2:
            _context3.n = 5;
            break;
          case 3:
            if (!(payload.action === "EDIT")) {
              _context3.n = 5;
              break;
            }
            _context3.n = 4;
            return db.Markdown.update({
              contentHTML: payload.contentHTML,
              contentMarkdown: payload.contentMarkdown,
              description: payload.description,
              specialtyId: +payload.selectedSpecialty,
              clinicId: +payload.selectedClinic
            }, {
              where: {
                doctorId: payload.doctorId
              }
            });
          case 4:
            res = _context3.v;
            if (res[0] === 0) resolve({
              EC: 3,
              EM: "Markdown doctor not found"
            });
          case 5:
            _context3.n = 6;
            return db.Doctor_Info.upsert({
              doctorId: payload.doctorId,
              specialtyId: +payload.selectedSpecialty,
              // INTERGER
              clinicId: +payload.selectedClinic,
              // INTERGER
              priceId: payload.selectedPrice,
              provinceId: payload.selectedProvince,
              paymentId: payload.selectedPayment,
              addressClinic: payload.addressClinic,
              nameClinic: payload.nameClinic,
              note: payload.note
            });
          case 6:
            _yield$db$Doctor_Info = _context3.v;
            _yield$db$Doctor_Info2 = _slicedToArray(_yield$db$Doctor_Info, 2);
            doctorInfo = _yield$db$Doctor_Info2[0];
            created = _yield$db$Doctor_Info2[1];
            if (created) {
              resolve({
                EC: 0,
                EM: "Created Doctor Info Successed"
              });
            } else {
              resolve({
                EC: 0,
                EM: "Update Doctor Info Successed"
              });
            }
            resolve({
              EC: 0,
              EM: " Save Markdown Success"
            });
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
            reject(_t3);
          case 8:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 7]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getDetailDoctorById = function getDetailDoctorById(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(resolve, reject) {
      var res, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return db.User.findOne({
              where: {
                id: doctorId
              },
              attributes: {
                exclude: ['password']
              },
              include: [{
                model: db.Markdown,
                as: 'markdown_data',
                attributes: ["description", "contentMarkdown", "contentHTML"]
              }, {
                model: db.Allcode,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: db.Doctor_Info,
                as: 'doctor_info',
                attributes: {
                  exclude: ['id', 'doctorId']
                },
                include: [{
                  model: db.Allcode,
                  as: 'price_data',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: db.Allcode,
                  as: 'payment_data',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: db.Allcode,
                  as: 'province_data',
                  attributes: ['valueEn', 'valueVi']
                }]
              }],
              raw: false,
              nest: true
            });
          case 1:
            res = _context4.v;
            // console.log("Full result:", JSON.stringify(res, null, 2));
            if (!res) resolve({
              EC: 3,
              EM: "Cannot find doctor"
            });
            if (res.image) {
              res.image = Buffer.from(res.image, 'base64').toString('binary');
            }
            resolve({
              EC: 0,
              EM: "Get detail success",
              detail: res
            });
            _context4.n = 3;
            break;
          case 2:
            _context4.p = 2;
            _t4 = _context4.v;
            reject(_t4);
          case 3:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 2]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getMarkDownDoctor = function getMarkDownDoctor(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(resolve, reject) {
      var res, doctorInfo, newData, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.p = 0;
            _context5.n = 1;
            return db.Markdown.findOne({
              where: {
                doctorId: doctorId
              },
              attributes: ['contentHTML', 'contentMarkdown', 'description']
            });
          case 1:
            res = _context5.v;
            _context5.n = 2;
            return db.Doctor_Info.findOne({
              where: {
                doctorId: doctorId
              },
              attributes: {
                exclude: ['id', 'doctorId']
              }
            });
          case 2:
            doctorInfo = _context5.v;
            newData = _lodash["default"].cloneDeep(res);
            if (!newData) resolve({
              EC: 3,
              EM: "Cannot find doctor",
              detail: {}
            });
            newData.doctorInfo = doctorInfo;
            resolve({
              EC: 0,
              EM: "Get markdown doctor success",
              detail: newData
            });
            _context5.n = 4;
            break;
          case 3:
            _context5.p = 3;
            _t5 = _context5.v;
            reject(_t5);
          case 4:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 3]]);
    }));
    return function (_x9, _x0) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var bulkCreateSchedule = function bulkCreateSchedule(payload) {
  return new Promise(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(resolve, reject) {
      var scheduleData, _scheduleData$, doctorId, date, existSchedule, diffSchedule, diffScheduleSub, _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.p = 0;
            if (!(!payload && !payload.data)) {
              _context6.n = 1;
              break;
            }
            resolve({
              EC: 1,
              EM: "Missing required params"
            });
            _context6.n = 7;
            break;
          case 1:
            scheduleData = payload.data;
            scheduleData = scheduleData.map(function (item) {
              return _objectSpread(_objectSpread({}, item), {}, {
                maxNumber: MAX_NUMBER_SCHEDULE
              });
            });

            // get existing schedule
            _scheduleData$ = scheduleData[0], doctorId = _scheduleData$.doctorId, date = _scheduleData$.date;
            _context6.n = 2;
            return db.Schedule.findAll({
              where: {
                doctorId: doctorId,
                date: date
              },
              attributes: ['maxNumber', 'date', 'timeType', 'doctorId']
            });
          case 2:
            existSchedule = _context6.v;
            // compare schedule
            diffSchedule = _lodash["default"].differenceWith(scheduleData, existSchedule, function (a, b) {
              return a.timeType === b.timeType && +a.date === +b.date;
            });
            diffScheduleSub = _lodash["default"].differenceWith(existSchedule, scheduleData, function (a, b) {
              return a.timeType === b.timeType && +a.date === +b.date;
            });
            if (!(diffSchedule && diffSchedule.length > 0)) {
              _context6.n = 4;
              break;
            }
            _context6.n = 3;
            return db.Schedule.bulkCreate(diffSchedule);
          case 3:
            resolve({
              EC: 0,
              EM: "Save schedule success"
            });
          case 4:
            if (!(diffScheduleSub && diffScheduleSub.length > 0)) {
              _context6.n = 6;
              break;
            }
            _context6.n = 5;
            return db.Schedule.destroy({
              where: _defineProperty({}, Op.or, diffScheduleSub)
            });
          case 5:
            resolve({
              EC: 0,
              EM: "Save schedule success"
            });
          case 6:
            resolve({
              EC: 0,
              EM: "Cannot save more schedule!"
            });
          case 7:
            _context6.n = 9;
            break;
          case 8:
            _context6.p = 8;
            _t6 = _context6.v;
            reject(_t6);
          case 9:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 8]]);
    }));
    return function (_x1, _x10) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getScheduleDoctor = function getScheduleDoctor(doctorId, day) {
  return new Promise(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(resolve, reject) {
      var data, _t7;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.p = 0;
            if (!(!day && !doctorId)) {
              _context7.n = 1;
              break;
            }
            resolve({
              EC: 1,
              EM: "Missing required params"
            });
            _context7.n = 3;
            break;
          case 1:
            _context7.n = 2;
            return db.Schedule.findAll({
              where: {
                doctorId: doctorId,
                date: day
              },
              include: [{
                model: db.Allcode,
                as: 'scheduleData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: db.User,
                as: 'profile_doctor',
                attributes: ['firstName', 'lastName'],
                include: {
                  model: db.Doctor_Info,
                  as: "doctor_info",
                  attributes: ["nameClinic", "addressClinic"]
                }
              }],
              raw: true,
              nest: true
            });
          case 2:
            data = _context7.v;
            if (!data) data = [];
            resolve({
              EC: 0,
              data: data
            });
          case 3:
            _context7.n = 5;
            break;
          case 4:
            _context7.p = 4;
            _t7 = _context7.v;
            reject(_t7);
          case 5:
            return _context7.a(2);
        }
      }, _callee7, null, [[0, 4]]);
    }));
    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getExtraInfoDoctorById = function getExtraInfoDoctorById(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(resolve, reject) {
      var res, _t8;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.p = 0;
            if (doctorId) {
              _context8.n = 1;
              break;
            }
            resolve({
              EC: 1,
              EM: "Missing required params"
            });
            _context8.n = 3;
            break;
          case 1:
            _context8.n = 2;
            return db.Doctor_Info.findOne({
              where: {
                doctorId: doctorId
              },
              attributes: {
                exclude: ['id', 'doctorId', 'createdAt', 'updatedAt']
              },
              include: [{
                model: db.Allcode,
                as: 'price_data',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: db.Allcode,
                as: 'payment_data',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: db.Allcode,
                as: 'province_data',
                attributes: ['valueEn', 'valueVi']
              }],
              raw: false,
              nest: true
            });
          case 2:
            res = _context8.v;
            if (!res) {
              resolve({
                EC: 2,
                EM: "Cannot find doctor info",
                infoDoctor: {}
              });
            }
            resolve({
              EC: 0,
              EM: "OK",
              infoDoctor: res
            });
          case 3:
            _context8.n = 5;
            break;
          case 4:
            _context8.p = 4;
            _t8 = _context8.v;
            reject(_t8);
          case 5:
            return _context8.a(2);
        }
      }, _callee8, null, [[0, 4]]);
    }));
    return function (_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getProfileDoctorById = function getProfileDoctorById(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(resolve, reject) {
      var res, _t9;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            _context9.p = 0;
            if (doctorId) {
              _context9.n = 1;
              break;
            }
            resolve({
              EC: 1,
              EM: "Missing required params"
            });
            _context9.n = 3;
            break;
          case 1:
            _context9.n = 2;
            return db.User.findOne({
              where: {
                id: doctorId
              },
              attributes: {
                exclude: ['password']
              },
              include: [{
                model: db.Markdown,
                as: 'markdown_data',
                attributes: ['description']
              }, {
                model: db.Allcode,
                as: 'positionData',
                attributes: ['valueEn', 'valueVi']
              }, {
                model: db.Doctor_Info,
                as: 'doctor_info',
                attributes: {
                  exclude: ['id', 'doctorId']
                },
                include: [{
                  model: db.Allcode,
                  as: 'price_data',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: db.Allcode,
                  as: 'payment_data',
                  attributes: ['valueEn', 'valueVi']
                }, {
                  model: db.Allcode,
                  as: 'province_data',
                  attributes: ['valueEn', 'valueVi']
                }]
              }],
              raw: false,
              nest: true
            });
          case 2:
            res = _context9.v;
            // console.log("Full result:", JSON.stringify(res, null, 2));
            if (!res) resolve({
              EC: 3,
              EM: "Cannot find doctor"
            });
            if (res.image) {
              res.image = Buffer.from(res.image, 'base64').toString('binary');
            }
            resolve({
              EC: 0,
              EM: "Get detail success",
              profile: res
            });
          case 3:
            _context9.n = 5;
            break;
          case 4:
            _context9.p = 4;
            _t9 = _context9.v;
            reject(_t9);
          case 5:
            return _context9.a(2);
        }
      }, _callee9, null, [[0, 4]]);
    }));
    return function (_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var getListPatientForDoctor = function getListPatientForDoctor(doctorId, date) {
  return new Promise(/*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(resolve, reject) {
      var res, _t0;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            _context0.p = 0;
            if (!(!doctorId || !date)) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2, resolve({
              EC: 1,
              EM: "Missing required params"
            }));
          case 1:
            _context0.n = 2;
            return db.Booking.findAll({
              where: {
                doctorId: doctorId,
                date: date,
                statusId: 'S2'
              },
              attributes: {
                exclude: ['tokenConfirm']
              },
              include: [{
                model: db.Allcode,
                as: 'time_data',
                attributes: ['valueVi', 'valueEn']
              }, {
                model: db.User,
                as: "user_data",
                attributes: ['firstName', 'lastName', 'email', 'gender', 'phoneNumber', 'address'],
                include: {
                  model: db.Allcode,
                  as: 'genderData',
                  attributes: ['valueEn', 'valueVi']
                }
              }],
              raw: true,
              nest: true
            });
          case 2:
            res = _context0.v;
            if (res) resolve({
              EC: 0,
              EM: "OK",
              data: res
            });else resolve({
              EC: 0,
              EM: "Booking not found!"
            });
          case 3:
            _context0.n = 5;
            break;
          case 4:
            _context0.p = 4;
            _t0 = _context0.v;
            reject(_t0);
          case 5:
            return _context0.a(2);
        }
      }, _callee0, null, [[0, 4]]);
    }));
    return function (_x17, _x18) {
      return _ref0.apply(this, arguments);
    };
  }());
};
var sendRemedy = function sendRemedy(payload) {
  return new Promise(/*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(resolve, reject) {
      var update_appoinment, patient, _t1;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            _context1.p = 0;
            if (!(!payload.doctorId || !payload.email || !payload.patientId || !payload.timeType)) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2, resolve({
              EC: 1,
              EM: "Missing required params"
            }));
          case 1:
            _context1.n = 2;
            return db.Booking.update({
              statusId: "S3"
            }, {
              where: {
                doctorId: payload.doctorId,
                patientId: payload.patientId,
                timeType: payload.timeType,
                statusId: "S2"
              }
            });
          case 2:
            update_appoinment = _context1.v;
            if (!(update_appoinment[0] !== 0)) {
              _context1.n = 5;
              break;
            }
            _context1.n = 3;
            return db.User.findOne({
              where: {
                id: payload.patientId
              }
            });
          case 3:
            patient = _context1.v;
            _context1.n = 4;
            return _email["default"].sendAttatchment(patient.email, payload);
          case 4:
            resolve({
              EC: 0,
              EM: "Send remery success"
            });
            _context1.n = 6;
            break;
          case 5:
            resolve({
              EC: 2,
              EM: "Not found data booking"
            });
          case 6:
            _context1.n = 8;
            break;
          case 7:
            _context1.p = 7;
            _t1 = _context1.v;
            reject(_t1);
          case 8:
            return _context1.a(2);
        }
      }, _callee1, null, [[0, 7]]);
    }));
    return function (_x19, _x20) {
      return _ref1.apply(this, arguments);
    };
  }());
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctor: getAllDoctor,
  createNewDetailDoctor: createNewDetailDoctor,
  getDetailDoctorById: getDetailDoctorById,
  getMarkDownDoctor: getMarkDownDoctor,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleDoctor: getScheduleDoctor,
  getExtraInfoDoctorById: getExtraInfoDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy
};