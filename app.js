const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
const consoleTable = require("console.table");

//import connection
// let connection = require("./config/connection");
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "vanRoot#21",
  database: "employee_DB",
});

connection.query = util.promisify(connection.query);

// After connecting the database start to run the app
connection.connect(function (err) {
  if (err) throw err;
  // start the app
  initStart();
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

// Departments View
const departmentView = async () => {
  try {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let departmentResult = [];
      res.forEach((department) => departmentResult.push(department));
      console.table(departmentResult);
      initStart();
    });
  } catch (err) {
    console.log(err);
    initStart();
  }
};

// Roles View
const roleView = async () => {
  try {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let roleResult = [];
      res.forEach((role) => roleResult.push(role));
      console.table(roleResult);
      initStart();
    });
  } catch (err) {
    console.log(err);
    initStart();
  }
};

// View all of the employees
const employeeView = async () => {
  try {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let employeeResult = [];
      res.forEach((employee) => employeeResult.push(employee));
      console.table(employeeResult);
      initStart();
    });
  } catch (err) {
    console.log(err);
    initStart();
  }
};

// Add new Department
const departmentAdd = async () => {
  try {
    console.log("Department Add");
    let answer = await inquirer.prompt([
      {
        name: "deptName",
        type: "input",
        message: "Enter a new department name: ",
      },
    ]);
    let result = await connection.query("INSERT INTO department SET ?", {
      department_name: answer.deptName,
    });
    console.log(`${answer.deptName} added successfully to departments.\n`);
    initStart();
  } catch (err) {
    console.log(err);
    initStart();
  }
};

// Add a new role
const roleAdd = async () => {
  try {
    console.log("Role Add");
    let departments = await connection.query("SELECT * FROM department");
    let answer = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the new role name: ",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter anual salary: ",
      },
      {
        name: "departmentId",
        type: "list",
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id,
          };
        }),
        message: "Enter department ID of this role associated: ",
      },
    ]);

    let chosenDepartment;
    for (i = 0; i < departments.length; i++) {
      if (departments[i].department_id === answer.choice) {
        chosenDepartment = departments[i];
      }
    }
    let result = await connection.query("INSERT INTO role SET ?", {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentId,
    });

    console.log(`${answer.title} role added successfully.\n`);
    initStart();
  } catch (err) {
    console.log(err);
    initStart();
  }
};

// Add new employee
const employeeAdd = async () => {
  try {
    console.log("Employee Add");
    let roles = await connection.query("SELECT * FROM role");
    let managers = await connection.query("SELECT * FROM employee");
    let answer = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter Employee First Name: ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter Employee Last Name: ",
      },
      {
        name: "employeeRoleId",
        type: "list",
        choices: roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
        message: "Employee's role id: ",
      },
      {
        name: "employeeManagerId",
        type: "list",
        choices: managers.map((manager) => {
          return {
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          };
        }),
        message: "Employee's Manager's Id!",
      },
    ]);
    let result = await connection.query("INSERT INTO employee SET ?", {
      first_name: answer.firstName,
      last_name: answer.lastName,
      role_id: answer.employeeRoleId,
      manager_id: answer.employeeManagerId,
    });
    console.log(
      `${answer.firstName} ${answer.lastName} added to database sucessfully.\n`
    );
    initStart();
  } catch (err) {
    console.log(err);
    initStart();
  }
};

// Update Employee Info
const employeeUpdate = async () => {
  try {
    console.log("Employee Update");

    let employees = await connection.query("SELECT * FROM employee");

    let employeeSelection = await inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: employees.map((employeeName) => {
          return {
            name: employeeName.first_name + " " + employeeName.last_name,
            value: employeeName.id,
          };
        }),
        message: "Choose an employee to update!",
      },
    ]);

    let roles = await connection.query("SELECT * FROM role");

    let roleSelection = await inquirer.prompt([
      {
        name: "role",
        type: "list",
        choices: roles.map((roleName) => {
          return {
            name: roleName.title,
            value: roleName.id,
          };
        }),
        message: "Select the role to update the employee with!",
      },
    ]);

    let result = await connection.query("UPDATE employee SET ? WHERE ?", [
      { role_id: roleSelection.role },
      { id: employeeSelection.employee },
    ]);

    console.log(`The role was successfully updated.\n`);
    initStart();
  } catch (err) {
    console.log(err);
    initStart();
  }
};
