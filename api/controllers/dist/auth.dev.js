"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.register = void 0;

var _db = require("../db.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  //check exisiting user
  var q = "SELECT * FROM  users WHERE email = ? OR username = ?";

  _db.db.query(q, [req.body.email, req.body.username], function (err, data) {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exists"); //hash the password and create a new user

    var salt = _bcrypt["default"].genSaltSync(10);

    var hash = _bcrypt["default"].hashSync(req.body.password, salt);

    var q = "INSERT INTO users (`username`, `email`,`password`) VALUES(?)";
    var values = [req.body.username, req.body.email, hash];

    _db.db.query(q, [values], function (err, data) {
      if (err) return res.json(err);
      return res.status(200).json("user has been created");
    }); // Store hash in your password DB.

  });
};

exports.register = register;

var login = function login(req, res) {};

exports.login = login;

var logout = function logout(req, res) {};

exports.logout = logout;