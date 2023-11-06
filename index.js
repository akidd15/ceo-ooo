const mysql = require('mysql2');
const inquirer = require('inquirer');
require("dotenv").config();


const db = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: 'Beerus15!',
        database: "company_db"
    },
    console.log("Connected to company_db!")
);

// db.connect((error) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log("Connected")
// })


async function menu() {


    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Where would you like to go?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ])

    const options = answers.options;
    console.log(options);

    if (options === "View all departments") {
        viewAllDepartments();
    }

    if (options === "View all roles") {
        viewAllRoles();
    }


    if (options === "View all employees") {
        viewAllEmployees();
    }


    if (options === "Add a department") {
      
         inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "Input a new Department"


            }
        ])
        .then(async (Department) => {
            if (Department.newDepartment) {
       const sql = `INSERT INTO department (department_name) values (?)`;
       try {
        const [answers] = await db.promise().query(sql, [Department.newDepartment]);
        console.log("New Department added!");
        displayDepartmentTable();
       } catch (err) {
        console.error(err);
       }
       } else {
        console.log("Department name cannot be empty")
       }
       });
    }


    if (options === "Add a role") {
        addARole();
    }


    if (options === "Add an employee") {
        addAnEmployee();
    }


    if (options === "Update an employee role") {
        updateAnEmployeeRole();
    }

}
//view all departments
const displayDepartmentTable = async () => {
    let sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const viewAllRoles = async () => {
    let sql = `SELECT department_role.id AS id, department_role.job_title AS role FROM department_role`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const viewAllEmployees = async () => {
    let sql = `SELECT employee.first_name AS first_name, employee.last_name AS last_name FROM employee`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

// const addADepartment = async () => {
//     let sql = `INSERT INTO department.department_name AS department.name`
//     const data = await db.promise().query(sql)
//     console.table(data[0])
//     menu();
// }

const addARole = async () => {
    let sql = `SELECT role_id FROM department_role`
     const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const addAnEmployee = async () => {
    let sql = `SELECT id,first_name, last_name,FROM employee`
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const updateAnEmployeeRole = async () => {
    let sql = `SELECT employee_role FROM employee`
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}



menu();

