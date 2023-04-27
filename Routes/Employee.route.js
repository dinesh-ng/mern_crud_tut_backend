// Importing important packages
const express = require("express");

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee module which is required and imported
let employeeModel = require("../Model/Employee");

// To Get List Of Employees
employeeRoute.route("/").get((req, res) => {
  console.log("GET '/'");
  employeeModel
    .find({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// To Add New Employee
employeeRoute.route("/addEmployee").post((req, res) => {
  const employee = new employeeModel(req.body);
  employee
    .save()
    .then(() => {
      console.log("New Employee added.");
      res.status(200).json({ employee: "Employee Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Something Went Wrong");
    });
});

// To Get Employee Details By Employee ID
employeeRoute.route("/editEmployee/:id").get((req, res) => {
  const id = req.params.id;
  employeeModel
    .findById(id)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => console.log(err));
});

// To Update The Employee Details
employeeRoute.route("/updateEmployee/:id").post((req, res, next) => {
  employeeModel.findById(req.params.id).then((employee) => {
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
          console.log(err);
          res.status(400).send("Unable To Update Employee: " + err);
        });
    }
  });
});

// To Delete The Employee
employeeRoute.route("/deleteEmployee/:id").get((req, res) => {
  employeeModel
    .findByIdAndRemove({ _id: req.params.id })
    .then((emp) => {
      if (emp) res.send("Employee Deleted Successfully");
      else res.send("Not Found");
    })
    .catch((err) => res.send(err));
});

module.exports = employeeRoute;
