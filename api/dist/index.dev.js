"use strict";

var _express = _interopRequireDefault(require("express"));

var _posts = _interopRequireDefault(require("./routes/posts.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use("/api/posts", _posts["default"]);
app.use("/api/users", _users["default"]);
app.use("/api/auth", _auth["default"]);
app.listen(8800, function () {
  console.log("Server listening on port 8800");
});