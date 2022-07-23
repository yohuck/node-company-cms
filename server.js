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

const  addDepartment = () => {

    inquirer
    .prompt([
      {
        type: 'input',
        message: 'What would you like to name the department?',
        name: 'dept_name',
      },
    ])
    .then((response) => addDeptQuery(response.dept_name)
    );
}
    
const  addRole = () => {

    inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'title',
      },
      {
        type: 'number',
        message: 'What is the salary?',
        name: 'salary',
      },
      {
        type: 'number',
        message: 'What is the department id?',
        name: 'department_id',
      },
    ])
    .then((response) => addRoleQuery(response.title, response.salary, response.department_id)
    );
}

const  addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'first_name',
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'last_name',
        }])
    .then( res => {
        let soFar = [res.first_name, res.last_name];
        connection.query("SELECT title, id FROM roles", (error, response) => {
            if (error) console.error(error)
            inquirer.prompt([{
                name: 'role',
                type: 'list',
                choices: () => {
                    let roleArr = response.map(({title, id}) => ({name: title, value: id}))
                    return roleArr
                    }
            }])
            .then( response => {
                soFar.push(response.role)
                connection.query("SELECT first_name, last_name, id FROM employees", (error, response) => {
                    if (error) console.error(error)
                    inquirer.prompt([{
                        name: 'manager',
                        type: 'list',
                        choices: () => {
                            let managerArr = response.map(({first_name, last_name, id}) => ({
                                name:(`${first_name} ${last_name}`),
                                value: id,

                            }))
                            return managerArr
                            }
                              
                        }
                    ]).then(response => {soFar.push(response.manager)
                        console.log(soFar)
                        addEmployeeQuery(soFar[0], soFar[1], soFar[2], soFar[3])
                   }
                    )
                })
            })
        })
    })
}


let = getChoicesManagers = () => {

    connection.query(`SELECT * FROM employees`, (err, res) => {
        if (err) {
          console.error(err)
        }
        console.log("\n")
        let arr;
        console.log('got here')
        res.forEach(element => {
            console.log({name: element.first_name + " " + element.last_name,
            value: element.id
        })
            
        })

        console.log(arr)
        return arr
      //   mainMenu()
      })

}

const addRoleQuery = (title, salary, department_id) => {
    connection.query(`INSERT INTO roles (title, salary, department_id)
                        VALUES ("${title}", ${salary}, ${department_id})`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!' + res)
                            
                        })

    console.log('\n')
    console.log('Successfully added role')
    console.log('\n')
    init()
}

const addEmployeeQuery = (first_name, last_name, role_id, manager_id) => {
    connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES ("${first_name}", "${last_name}", ${role_id}, ${manager_id})`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success!' + res)
                        })

                        console.log('\n')
                        console.log('Successfully added employee')
                        console.log('\n')
                        init()
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


  const addDeptQuery =  (department_name) => {

    connection.query(`INSERT INTO departments (dept_name)
                        VALUES ("${department_name}")`, (err, res) => {
                            if(err){
                                console.error(err)
                            }
                            console.log('Success! Server status: ' + res.serverStatus)
                        });
    console.log('\n')
    console.log('Successfully added department')
    console.log('\n')
    init()

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
