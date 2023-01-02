"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = _mysql["default"].createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog"
});

exports.db = db;