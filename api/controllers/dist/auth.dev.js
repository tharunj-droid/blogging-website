"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.register = void 0;

var _db = require("../db.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var register = function register(req, res) {
  //CHECK EXISTING USER
  var q = "SELECT * FROM users WHERE email = ? OR username = ?";

  _db.db.query(q, [req.body.email, req.body.username], function (err, data) {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!"); //Hash the password and create a user

    var salt = _bcrypt["default"].genSaltSync(10);

    var hash = _bcrypt["default"].hashSync(req.body.password, salt);

    var q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    var values = [req.body.username, req.body.email, hash];

    _db.db.query(q, [values], function (err, data) {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

exports.register = register;

var login = function login(req, res) {
  //CHECK USER
  var q = "SELECT * FROM users WHERE username = ?";

  _db.db.query(q, [req.body.username], function (err, data) {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!"); //Check password

    var isPasswordCorrect = _bcrypt["default"].compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    var token = _jsonwebtoken["default"].sign({
      id: data[0].id
    }, "jwtkey");

    var _data$ = data[0],
        password = _data$.password,
        other = _objectWithoutProperties(_data$, ["password"]);

    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json(other);
  });
};

exports.login = login;

var logout = function logout(req, res) {};

exports.logout = logout;