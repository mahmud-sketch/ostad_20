const express = require("express");
const router = require("./src/route/api");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//Database
const mongoose = require("mongoose");
app.use(express.static("client/build"));

// Security Middleware Implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());

//Body-Parser
app.use(bodyParser.json());

//Rate  Limit Middleware
const Limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(Limiter);

//Mongo DB connection
// let URI = "";
// let OPTION = { user: "", pass: "", autoIndex: true };
// mongoose.connect(URI, OPTION, (err) => {
//   console.log("connetion success");
//   console.log(err);
// });

//Managing Frontend Routing
app.use(express.static("client/build"));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//Managing Backend Routing
app.use("/api/v1/", router);

module.exports = app;
