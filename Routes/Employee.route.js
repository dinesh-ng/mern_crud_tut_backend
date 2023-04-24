// Importing important packages
const express = require("express");

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee module which is required and imported
let employeeModel = require("../Model/Employee");

// To Get List Of Employees
employeeRoute.route("/").get(function (req, res) {
  employeeModel
    .find({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// To Add New Employee
employeeRoute.route("/addEmployee").post(function (req, res) {
  let employee = new employeeModel(req.body);
  employee
    .save()
    .then((game) => {
      res.status(200).json({ employee: "Employee Added Successfully" });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

// To Get Employee Details By Employee ID
employeeRoute.route("/editEmployee/:id").get(function (req, res) {
  let id = req.params.id;
  employeeModel
    .findById(id)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => console.log(err));
});

// To Update The Employee Details
employeeRoute.route("/updateEmployee/:id").post(function (req, res, next) {
  employeeModel.findById(req.params.id).then(function (employee) {
    if (!employee) return res.send("Unable To Find Employee With This Id");
    else {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      employee
        .save()
        .then((emp) => {
          res.json("Employee Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable To Update Employee");
        });
    }
  });
});

// To Delete The Employee
employeeRoute.route("/deleteEmployee/:id").get(function (req, res) {
  employeeModel
    .findByIdAndRemove({ _id: req.params.id })
    .then(function (emp) {
      if (emp) res.send("Employee Deleted Successfully");
      else res.send("Not Found");
    })
    .catch((err) => res.send(err));
});

module.exports = employeeRoute;
