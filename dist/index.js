"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("../database/config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 3000; //conect to DB

(0, _config.default)();
app.use(_bodyParser.default.json());
app.get('/', (req, res) => {
  res.send('Hello Worlasd!');
});
app.listen(port, () => {
  console.log(`app is listening to port 5000`);
});