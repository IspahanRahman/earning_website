const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ngtask",
    // multipleStatements: true
   });

module.exports = conn;