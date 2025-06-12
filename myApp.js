let express = require("express");
let app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.route('/name').get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
}).post((req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  res.json({ name: `${firstName} ${lastName}` });
})

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/:word/echo", (req, res) => {
  const w = req.params.word;
  res.json({ echo: w });
});

app.get('/name', (req, res, next) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  req.name = `${firstName} ${lastName}`;
  next();
}, (req, res) => {
  res.json({ name: req.name });
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  let message = "Hello json";

  if (messageStyle === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

module.exports = app;
