require('dotenv').config()
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: '/var/run/mysqld/mysqld.sock'
})

connection.connect();

module.exports = connection;