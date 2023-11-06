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
        inquirer.prompt([
            {
                type: "input",
                name: "job_title",
                message: "Input a new Role",
                validate: function (name) {
                    if (name.trim() === "") {
                        return "Job title cannot be empty"
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "salary",
                message: "Input the salary for the new role",
            },
            {

                type: "input",
                name: "department_id",
                message: "Input the department ID for the new role",

            }
        ])
            .then(async (roleData) => {
                if (roleData.job_title && roleData.salary && roleData.department_id) {
                    const sql = 'INSERT INTO department_role (job_title, salary, department_id) VALUES (?, ?, ?)';
                    try {
                        const [answers] = await db.promise().query(sql, [roleData.job_title, roleData.salary, roleData.department_id]);
                        console.log("New Department Role added!");
                        displayRoleTable();
                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    console.log("Job Title name cannot be empty")
                }
            });
    }





    if (options === "Add an employee") {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Input the new employee's first name",
                validate: function (name) {
                    if (name.trim() === "") {
                        return "Job title cannot be empty"
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "Input the new employee's last name",
            },
            {

                type: "input",
                name: "role_id",
                message: "Input the employee's role id",

            }
        ])
            .then(async (employeeData) => {
                if (employeeData.first_name && employeeData.last_name && employeeData.role_id) {
                    const sql = 'INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)';
                    try {
                        const [answers] = await db.promise().query(sql, [employeeData.first_name, employeeData.last_name, employeeData.role_id]);
                        console.log("New Employee added!");
                        displayEmployeeTable();

                    } catch (err) {
                        console.error(err);
                    }
                } else {
                    console.log("Cannot add new employee")
                }
            });

        if (options === "Update an employee role") {

            const updateEmployeeRole = async () => {
                inquirer.prompt([
                    {
                        type: "input",
                        name: "employee_id",
                        message: "Enter the ID of the employee whose role you want to update",
                    },
                    {
                        type: "input",
                        name: "new_role_id",
                        message: "Enter the new role ID for the employee",
                    },

                ]).then(async (updateData) => {
                    const { employee_id, new_role_id } = updateData;
                    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                    try {
                        const [result] = await db.promise().query(sql, [new_role_id, employee_id]);
                        if (result.affectedRows > 0) {
                            console.log("Employee's role updated successfully!");
                        } else {
                            console.log("Employee not found or update failed.");
                        }
                    } catch (err) {
                        console.error(err);

                    }


                    //  Call your menu or displayEmployeeTable function to go back to the main menu
                    menu();
                });
            }
        };
    };

}





//view all departments
const displayDepartmentTable = async () => {
    let sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const viewAllDepartments = async () => {
    let sql = `SELECT department.id AS id, department.department_name AS department FROM department`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const displayRoleTable = async () => {
    let sql = `SELECT department_role.id AS id, department_role.job_title AS job_title FROM department_role`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const viewAllRoles = async () => {
    let sql = `SELECT department_role.id AS id, department_role.job_title AS job_title FROM department_role`;
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

const addAnEmployee = async () => {
    let sql = `SELECT id,first_name, last_name FROM employee`
    const data = await db.promise().query(sql)
    console.table(data[0])
    addAnEmployee();
    menu();
}

const displayEmployeeTable = async () => {
    let sql = `SELECT id, first_name, last_name FROM employee`;
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}

const displayUpdatedEmployee = async () => {
    let sql = `SELECT employee_role FROM employee`
    const data = await db.promise().query(sql)
    console.table(data[0])
    displayUpdatedEmployee();
    menu();
}

const updateEmployeeRole = async () => {
    let sql = `SELECT employee_role FROM employee`
    const data = await db.promise().query(sql)
    console.table(data[0])
    menu();
}



menu();

