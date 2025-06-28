"use strict";

var _sequelize = require("sequelize");
var _index = _interopRequireDefault(require("../models/index"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var salt = _bcryptjs["default"].genSaltSync(10);
var createNewUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          return _context2.a(2, new Promise(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(resolve, reject) {
              var hash, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    _context.p = 0;
                    _context.n = 1;
                    return hashPassword(data.password);
                  case 1:
                    hash = _context.v;
                    _context.n = 2;
                    return _index["default"].User.create({
                      firstName: data.firstName,
                      lastName: data.lastName,
                      email: data.email,
                      password: hash,
                      address: data.address,
                      phoneNumber: data.phoneNumber,
                      gender: data.gender === "1" ? true : false,
                      roleId: data.roleId
                    });
                  case 2:
                    resolve("Create user success");
                    _context.n = 4;
                    break;
                  case 3:
                    _context.p = 3;
                    _t = _context.v;
                    reject(_t);
                  case 4:
                    return _context.a(2);
                }
              }, _callee, null, [[0, 3]]);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }()));
      }
    }, _callee2);
  }));
  return function createNewUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var hashPassword = function hashPassword(password) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(resolve, reject) {
      var _hashPassword, _t2;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return _bcryptjs["default"].hashSync(password, salt);
          case 1:
            _hashPassword = _context3.v;
            resolve(_hashPassword);
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
    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getAllUsers = function getAllUsers() {
  return new Promise(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(resolve, reject) {
      var users, _t3;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.p = 0;
            _context4.n = 1;
            return _index["default"].User.findAll({
              raw: true
            });
          case 1:
            users = _context4.v;
            resolve(users);
            _context4.n = 3;
            break;
          case 2:
            _context4.p = 2;
            _t3 = _context4.v;
            reject(_t3);
          case 3:
            return _context4.a(2);
        }
      }, _callee4, null, [[0, 2]]);
    }));
    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getUserInfoById = function getUserInfoById(userId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(resolve, reject) {
      var user, _t4;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.p = 0;
            _context5.n = 1;
            return _index["default"].User.findOne({
              where: {
                id: userId
              },
              raw: true
            });
          case 1:
            user = _context5.v;
            if (user) {
              resolve(user);
            } else resolve({});
            _context5.n = 3;
            break;
          case 2:
            _context5.p = 2;
            _t4 = _context5.v;
            reject(_t4);
          case 3:
            return _context5.a(2);
        }
      }, _callee5, null, [[0, 2]]);
    }));
    return function (_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var updateUserData = function updateUserData(data) {
  return new Promise(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(resolve, reject) {
      var user, Alluser, _t5;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.p = 0;
            _context6.n = 1;
            return _index["default"].User.findOne({
              where: {
                id: data.id
              }
            });
          case 1:
            user = _context6.v;
            if (!user) {
              _context6.n = 4;
              break;
            }
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            _context6.n = 2;
            return user.save();
          case 2:
            _context6.n = 3;
            return _index["default"].User.findAll({
              raw: true
            });
          case 3:
            Alluser = _context6.v;
            resolve(Alluser);
            _context6.n = 5;
            break;
          case 4:
            resolve("User not found");
          case 5:
            _context6.n = 7;
            break;
          case 6:
            _context6.p = 6;
            _t5 = _context6.v;
            reject(_t5);
          case 7:
            return _context6.a(2);
        }
      }, _callee6, null, [[0, 6]]);
    }));
    return function (_x0, _x1) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var deleteUserById = function deleteUserById(userId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(resolve, reject) {
      var user, _t6;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.p = 0;
            _context7.n = 1;
            return _index["default"].User.findOne({
              where: {
                id: userId
              }
            });
          case 1:
            user = _context7.v;
            _context7.n = 2;
            return user.destroy();
          case 2:
            resolve("Delete user success");
            _context7.n = 4;
            break;
          case 3:
            _context7.p = 3;
            _t6 = _context7.v;
            reject(_t6);
          case 4:
            return _context7.a(2);
        }
      }, _callee7, null, [[0, 3]]);
    }));
    return function (_x10, _x11) {
      return _ref7.apply(this, arguments);
    };
  }());
};
module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById
};