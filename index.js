const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config();


const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: process.env.password,
        database: "company_db"
    },
    console.log("Connected to company_db!")
);

db.connect((error) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log("Connected")
})

inquirer.prompt([
    {
        type: 'list',
        name: "Options",
        message: "Where would you like to go?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update and employee role"]
    }
]);

