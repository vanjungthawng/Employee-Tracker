const mysql = require("mysql");

//load environment variables
require("dotenv").config();

// connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  //use values stored in .env file
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

//export connection
module.exports = connection;
