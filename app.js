const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
const consoleTable = require("console.table");

//import connection
const connection = require("./config/connection");
const { type } = require("os");

connection.query = util.promisify(connection.query);

// After connecting the database start to run the app
connection.connect(function (err) {
  if (err) throw err;
  // start the app
});

//Prompt questions what they'd like to do
const initStart = async () => {
  try {
    let answer = await inquirer.prompt({
      name: "pick",
      type: "list",
      message: "What would you like to to?",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Departments",
        "Add Roles",
        "Add Employees",
        "Update Employee Role",
        "Quit",
      ],
    });
    if (answer.pick === "View all Departments") {
      departmentView();
    } else if (answer.pick === "View all Roles") {
      roleView();
    } else if (answer.pick === "View all Employees") {
      employeeView();
    } else if (answer.pick === "Add Departments") {
      departmentAdd();
    } else if (answer.pick === "Add Roles") {
      roleAdd();
    } else if (answer.pick === "Add Employees") {
      employeeAdd();
    } else if (answer.pick === "Update Employee Role") {
      employeeUpdate();
    } else if (answer.pick === "Quit") {
      connection.end();
    }
  } catch (err) {
    console.log(err);
    initStart();
  }
};
