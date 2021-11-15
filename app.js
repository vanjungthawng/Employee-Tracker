const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
const consoleTable = require("console.table");

//import connection
const connection = require("./config/connection");
