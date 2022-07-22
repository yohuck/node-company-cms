// const inquirer = require('inquirer')
const connection = require('./config/config.js')
const mysql = require('mysql2')



const viewAllDepartments = () => {
    connection.query(`SELECT * FROM DEPARTMENTS`, (err, res) => {
      if (err) {
        console.error(err)
      }
      console.table(res)
    //   mainMenu()
    })
}
const viewAllRoles = () => {
    connection.query(`SELECT * FROM ROLES`, (err, res) => {
      if (err) {
        console.error(err)
      }
      console.table(res)
    //   mainMenu()
    })
}

const viewAllEmployees = () => {
    connection.query(`SELECT * FROM employees`, (err, res) => {
      if (err) {
        console.error(err)
      }
      console.table(res)
    //   mainMenu()
    })
}

const addDepartment = (dept_name) => {
    connection.query(`INSERT INTO departments (dept_name)
                        VALUES ("${dept_name}")`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success! Server status: ' + res.serverStatus)
                        })
}

const addRole = (title, salary, department_id) => {
    connection.query(`INSERT INTO roles (title, salary, department_id)
                        VALUES ("${title}", ${salary}, ${department_id})`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!' + res)
                        })
}

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id})`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!' + res)
                        })
}


const editEmployeeRole = (employee_id, role_id) => {
    connection.query(`UPDATE employees SET role_id =${role_id} WHERE id=${employee_id};`, (err, res) => {
        if(err){
            console.error(err)
        } console.log('Success' + res)
    })
}




const deleteDepartment = (dept_id) => {
    connection.query(`DELETE FROM departments WHERE id =${dept_id}`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!')
                        })
}
const deleteRole = (role_id) => {
    connection.query(`DELETE FROM roles WHERE id =${role_id}`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!')
                        })
}
const deleteEmployee = (employee_id) => {
    connection.query(`DELETE FROM employees WHERE id =${employee_id}`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!')
                        })
}


// viewAllDepartments();
// viewAllRoles();
// viewAllEmployees();

// addDepartment('HR');
// addRole('VP', 200000, 5);
// addEmployee('Marge', "Simpson", 9, 2)

// viewAllDepartments();
// addEmployee('Marge', "Simpson", 5, 2)

viewAllEmployees();

editEmployeeRole(1,8);

viewAllEmployees();