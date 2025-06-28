"use strict";

var _index = _interopRequireDefault(require("../models/index"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var salt = _bcryptjs["default"].genSaltSync(10);
var handleUserLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(email, pass) {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          return _context2.a(2, new Promise(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve, reject) {
              var userData, emailExist, user, check, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    _context.p = 0;
                    userData = {};
                    _context.n = 1;
                    return checkUserEmail(email);
                  case 1:
                    emailExist = _context.v;
                    if (!emailExist) {
                      _context.n = 3;
                      break;
                    }
                    _context.n = 2;
                    return _index["default"].User.findOne({
                      where: {
                        email: email
                      },
                      attributes: ['id', 'email', 'password', 'roleId', 'firstName', 'lastName'],
                      raw: true
                    });
                  case 2:
                    user = _context.v;
                    if (user) {
                      check = _bcryptjs["default"].compareSync(pass, user.password);
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
                      userData.EM = "User not found";
                    }
                    _context.n = 4;
                    break;
                  case 3:
                    userData.EC = 1;
                    userData.EM = "Email isn't exist. Plz try other email!";
                  case 4:
                    resolve(userData);
                    _context.n = 6;
                    break;
                  case 5:
                    _context.p = 5;
                    _t = _context.v;
                    reject(_t);
                  case 6:
                    return _context.a(2);
                }
              }, _callee, null, [[0, 5]]);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }()));
      }
    }, _callee2);
  }));
  return function handleUserLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var checkUserEmail = function checkUserEmail(userEmail) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(resolve, reject) {
      var user, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return _index["default"].User.findOne({
              where: {
                email: userEmail
              }
            });
          case 1:
            user = _context3.v;
            if (user) resolve(true);else resolve(false);
            _context3.n = 3;
            break;
          case 2:
            _context3.p = 2;
            _t2 = _context3.v;
            reject(_t2);
          case 3:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 2]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getAllUser = function getAllUser(userId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(resolve, reject) {
      var user, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.p = 0;
            user = '';
            if (!(userId === "all")) {
              _context4.n = 2;
              break;
            }
            _context4.n = 1;
            return _index["default"].User.findAll({
              attributes: {
                exclude: ['password']
              }
            });
          case 1:
            user = _context4.v;
          case 2:
            if (!(userId && userId !== "all")) {
              _context4.n = 4;
              break;
            }
            _context4.n = 3;
            return _index["default"].User.findOne({
              where: {
                id: userId
              },
              attributes: {
                exclude: ['password']
              }
            });
          case 3:
            user = _context4.v;
          case 4:
            resolve(user);
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t3 = _context4.v;
            reject(_t3);
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 5]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var createNewUser = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(data) {
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          return _context6.a(2, new Promise(/*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(resolve, reject) {
              var checkEmail, hash, _t4;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.n) {
                  case 0:
                    _context5.p = 0;
                    _context5.n = 1;
                    return checkUserEmail(data.email);
                  case 1:
                    checkEmail = _context5.v;
                    if (checkEmail) {
                      _context5.n = 4;
                      break;
                    }
                    _context5.n = 2;
                    return hashPassword(data.password);
                  case 2:
                    hash = _context5.v;
                    _context5.n = 3;
                    return _index["default"].User.create({
                      firstName: data.firstName,
                      lastName: data.lastName,
                      email: data.email,
                      password: hash,
                      address: data.address,
                      phoneNumber: data.phoneNumber,
                      gender: data.gender,
                      roleId: data.role,
                      positionId: data.position,
                      image: data.avatar
                    });
                  case 3:
                    resolve({
                      EC: 0,
                      EM: "OK"
                    });
                    _context5.n = 5;
                    break;
                  case 4:
                    resolve({
                      EC: 1,
                      EM: "Your email had been used. Try another email"
                    });
                  case 5:
                    _context5.n = 7;
                    break;
                  case 6:
                    _context5.p = 6;
                    _t4 = _context5.v;
                    reject(_t4);
                  case 7:
                    return _context5.a(2);
                }
              }, _callee5, null, [[0, 6]]);
            }));
            return function (_x0, _x1) {
              return _ref6.apply(this, arguments);
            };
          }()));
      }
    }, _callee6);
  }));
  return function createNewUser(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var hashPassword = function hashPassword(password) {
  return new Promise(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(resolve, reject) {
      var _hashPassword, _t5;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.p = 0;
            _context7.n = 1;
            return _bcryptjs["default"].hashSync(password, salt);
          case 1:
            _hashPassword = _context7.v;
            resolve(_hashPassword);
            _context7.n = 3;
            break;
          case 2:
            _context7.p = 2;
            _t5 = _context7.v;
            reject(_t5);
          case 3:
            return _context7.a(2);
        }
      }, _callee7, null, [[0, 2]]);
    }));
    return function (_x10, _x11) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var updateUserData = function updateUserData(data) {
  return new Promise(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(resolve, reject) {
      var user, _t6;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.p = 0;
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
              resolve({
                EC: 2,
                EM: "Missing required parameters"
              });
            }
            _context8.n = 1;
            return _index["default"].User.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 1:
            user = _context8.v;
            if (!user) {
              _context8.n = 3;
              break;
            }
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            user.roleId = data.roleId;
            user.positionId = data.positionId;
            user.gender = data.gender;
            if (data.avatar) user.image = data.avatar;
            _context8.n = 2;
            return user.save();
          case 2:
            resolve({
              EC: 0,
              EM: "Update user success"
            });
            _context8.n = 4;
            break;
          case 3:
            resolve({
              EC: 1,
              EM: "User not found"
            });
          case 4:
            _context8.n = 6;
            break;
          case 5:
            _context8.p = 5;
            _t6 = _context8.v;
            reject(_t6);
          case 6:
            return _context8.a(2);
        }
      }, _callee8, null, [[0, 5]]);
    }));
    return function (_x12, _x13) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var deleteUserById = function deleteUserById(userId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(resolve, reject) {
      var user, _t7;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            _context9.p = 0;
            _context9.n = 1;
            return _index["default"].User.findOne({
              where: {
                id: userId
              }
            });
          case 1:
            user = _context9.v;
            if (!user) {
              _context9.n = 3;
              break;
            }
            _context9.n = 2;
            return _index["default"].User.destroy({
              where: {
                id: userId
              }
            });
          case 2:
            resolve({
              EC: 0,
              EM: "Delete success"
            });
            _context9.n = 4;
            break;
          case 3:
            resolve({
              EC: 2,
              EM: "User does not exist"
            });
          case 4:
            _context9.n = 6;
            break;
          case 5:
            _context9.p = 5;
            _t7 = _context9.v;
            reject(_t7);
          case 6:
            return _context9.a(2);
        }
      }, _callee9, null, [[0, 5]]);
    }));
    return function (_x14, _x15) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var getAllCodeService = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(type) {
    var res, _t8;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          _context0.p = 0;
          if (type) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2, {
            EC: 1,
            EM: "Missing parameter"
          });
        case 1:
          _context0.n = 2;
          return _index["default"].Allcode.findAll({
            where: {
              type: type
            }
          });
        case 2:
          res = _context0.v;
          return _context0.a(2, {
            EC: 0,
            EM: "success",
            data: res
          });
        case 3:
          _context0.n = 5;
          break;
        case 4:
          _context0.p = 4;
          _t8 = _context0.v;
          throw _t8;
        case 5:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 4]]);
  }));
  return function getAllCodeService(_x16) {
    return _ref0.apply(this, arguments);
  };
}();
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUser: getAllUser,
  createNewUser: createNewUser,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
  getAllCodeService: getAllCodeService
};