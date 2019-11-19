const mysql = require('mysql');


// This service simply establishes a connection with the database

const db = mysql.createConnection({
    host: "autumnhills.cunkfxivmglm.us-east-1.rds.amazonaws.com",
    user: "phpMyAdmin",
    password: "phpMyAdmin",
    database: "AutumnHills",
    multipleStatements: true
})

db.connect((err) => {
    if(!err) {
        console.log("MySQL Connected");
    } else {
        console.log("Connection failed");
    }
})

module.exports = db;