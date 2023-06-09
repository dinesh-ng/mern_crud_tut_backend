// Imported required packages
const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  mongoose = require("mongoose");

// MongoDB Databse url
var mongoDatabase = "mongodb://127.0.0.1:27017/employeeDetails";

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
  () => {
    console.log("Database Connected!");
  },
  (err) => {
    console.log("There is problem while connecting database " + err);
  }
);

// All the express routes
const employeeRoutes = require("../Routes/Employee.route");

// Conver incoming data to JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 4000;

// Routes Configuration
app.use("/employees", employeeRoutes);

// Staring our express server
const server = app.listen(port, function () {
  console.log("Server Listening On Port : " + port);
});
