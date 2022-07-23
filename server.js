// const inquirer = require('inquirer')
const connection = require('./config/config.js');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { resolve } = require('path');








const viewAllDepartments = () => {
    connection.query(`SELECT * FROM DEPARTMENTS`, (err, res) => {
      if (err) {
        console.error(err)
      }
      console.log("\n")
      console.table(res)
      console.log("\n")
      init();
    //   mainMenu()
    })
}







const viewAllRoles = () => {
    connection.query(`SELECT * FROM ROLES`, (err, res) => {
      if (err) {
        console.error(err)
      }
      console.log("\n")
      console.table(res);
      console.log("\n")
      init();
    //   mainMenu()
    })
}

const viewAllEmployees = () => {
    connection.query(`SELECT * FROM employees`, (err, res) => {
      if (err) {
        console.error(err)
      }
      console.log("\n")
      console.table(res);
      console.log("\n")
      init();
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


const init = async () => {
    const result = await inquirer.prompt([
      {
        message: 'What would you like to do?',
        type: 'list',
        name: 'doWhat',
        choices: [
          {
            name: 'View all departments',
            value: 'viewAllDepartments',
          },
          {
            name: 'View all roles',
            value: 'viewAllRoles',
          },
          {
            name: 'View all employees',
            value: 'viewAllEmployees',
          },
          {
            name: 'Add a department',
            value: 'addDepartment',
          },
          {
            name: 'Add a role',
            value: 'addRole',
          },
          {
            name: 'Add an employee',
            value: 'addEmployee',
          },
          {
            name: 'Edit employee role',
            value: 'editEmployee',
          },
          {
            name: 'Quit',
            value: 'quit',
          },
        ],
      },
    ]);
    console.br
    handleChoice(result.doWhat);
  };


  const handleChoice =  (choice) => {
    (choice === 'quit') ? console.log('See you next time!') :  again(choice)
  }


  let switchy = (choice) => {
    switch  (choice) {
        case 'viewAllDepartments':  viewAllDepartments();
        break;
        case 'viewAllEmployees':  viewAllEmployees();
        break;
        case 'viewAllRoles' : viewAllRoles();
        break;
        case 'addDepartment' :  addDepartment('test');
        break;
        case 'addRole' :  addRole('Test', 90000, 1);
        break;
        case 'addEmployee' : addEmployee('Test', "Person", "1", "1")
        break;
        default: console.log('this is default'); 
    }
  }





   function again(choice)  {
    switchy(choice)
        
  }

  




init()
