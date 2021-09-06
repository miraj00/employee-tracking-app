const express = require('express');
const app = express();
const db = require('./db/connection');

const inquirer = require("inquirer");
const mysql = require("mysql2");

// const Manager = require('./lib/Manager');
// const Employee = require('./lib/Employee');
// const Role = require('./lib/Roles');
// const Department = require('./lib/Department');

//----------Prompt for selections ----------------------------------------------------------------
const prompt1 = [
  {
    type: "list",
    name: "choice",
    message: "What would you want to do ?",
    choices: ["View all Departments", "View all Roles", "View all Employees", "View Managers","Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Update an Employee's Manager",
     "Delete a Department", "Delete a Role", "Delete an Employee", "Delete a Manager", "Exit"]
  }
];

var firstPrompt = () => {
  inquirer.prompt(prompt1).then((answer) => {    
//    console.log(answer);
//--------View all departments---------------------------------------------------------------------------------------    
  if (answer.choice === "View all Departments") {
      
       //  presents a formatted table showing dept names, dept ID
         console.log(" ==============   Here are all Departments ================");
       
         db.query("SELECT * FROM department", function (err, results) {
      //    console.log(err);
          console.table(results);
          firstPrompt();
        });
      } 
//----- View all Roles-------------------------------------------------------------------------------------------
  else if (answer.choice === "View all Roles"){

    const sql = 'SELECT roles.job_title, roles.roleid, roles.salary, department.department_name FROM roles LEFT JOIN department on roles.department_id = department.id'; 

    // 'SELECT 
    //      roles.job_title, 
    //      roles.roleid, 
    //      roles.salary, 
    //      department.department_name 
    // FROM roles 
    // LEFT JOIN department ON roles.department_id = department.id';
  
    //  presents with job title, role id, dept that role belongs to  and salary 

     console.log(" ============ Here is a table presenting all Roles ================= ");

    db.query(sql, function (err, results) {
    //  console.log(err);
     console.table(results);
    firstPrompt();
  });
}  

//-----View all employees---------------------------------------------------------------------------------------

    else if (answer.choice === "View all Employees"){

      const sql = 'SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, employee.manager AS Manager_Name, roles.job_title AS Title, roles.salary AS Salary, department.department_name AS Department FROM employee LEFT JOIN roles ON employee.role_id = roles.roleid LEFT JOIN department ON roles.department_id = department.id';
        
      // SELECT 
      // employee.id AS ID,
      // employee.first_name AS First_Name,
      // employee.last_name AS Last_Name,
      // employee.manager AS Manager_Name,
      // roles.job_title AS Title, 
      // roles.salary AS Salary,
      // department.department_name AS Department
      // FROM employee
      // LEFT JOIN roles ON employee.role_id = roles.roleid
      // LEFT JOIN department ON roles.department_id = department.id


        // presents a formatted table with employee data including ID, first and last name, job title, dept, salaries, and manager that employee report to 

         console.log(" ========  Here is a table showing all Employees =========== ");
       
         db.query(sql, function (err, results) {
      //    db.query("SELECT * FROM employee", function (err, results) {
      //    console.log(err);
          console.table(results);

          firstPrompt();
        });
       }
//--------View all Managers---------------------------------------------------------------------------------------    
    else if (answer.choice === "View Managers") {
         
        console.log(" ===============  Here is a list of Managers =============== ");
  
        db.query("SELECT id, manager AS Assigned_Manager FROM employee", function (err, results) {
        //   console.log(err);
         console.table(results);
         firstPrompt();
        });
       } 

//-----------------------------------------------------------------------------------------------   
      else if (answer.choice === "Add a Department"){    
         addDepartment();
       }
      else if (answer.choice === "Add a Role"){          
         addRole();
       }
      else if (answer.choice === "Add an Employee"){     
         addEmployee();
       }
      else if (answer.choice === "Update an Employee Role"){    
         updateEmployeeRole();
       }  
       else if (answer.choice === "Update an Employee's Manager"){    
       updateEmployeeManager();
       }
       else if (answer.choice === "Delete a Department"){      
         deleteDepartment();
      }
      else if (answer.choice === "Delete a Role"){           
         deleteRole();
       }
      else if (answer.choice === "Delete an Employee"){      
         deleteEmployee();
       }
       else if (answer.choice === "Delete a Manager"){      
        deleteManager();
     }
      else if ( answer.choice === "Exit"){                
        db.end();
      }
    })    
}

firstPrompt();
 
// ---- Add department ----------------------------------------
const addDepartmentPrompt = [
  {
    type: "text",
    name: "name",
    message: "What is the name of the department you want to add?",
    validate: nameText => {
      if(nameText){
          return true;
      } else {
          console.log('Please Enter Department Name you want to add');
          return false;
      }
    }
   }
  ] 

var addDepartment = () => {
  inquirer.prompt(addDepartmentPrompt).then((answer) => {    
  //   console.log(answer);
  //   console.log("ADDING : -- " + answer.name + " -- Department");
  console.log(" ========   Department Added ======== ");
  const sql = 'INSERT INTO department (department_name) VALUES(?)';
  const params = [ answer.name ];


    db.query(sql, params, (err, result) => {
  //  console.log(err);
  //   console.table(result);
    firstPrompt();
    });
  })
}

// ----  Add a Role  --->>>> prompt to enter name, salary, and dept for the role and that role is added to the database --------------------------------
var addRole = () => {
    
  db.promise().query('SELECT department.department_name, department.id FROM department')
    
      .then(([rows]) => {
  //  console.log(rows);

  var departments = rows.map(({department_name, id}) => ({
      name: department_name,
      value: id
      }));
  // console.log(departments);


    inquirer.prompt(
    [
      {
        type: "list",
        name: "deptchoice",
        message: "Select department Name you want to add role to :",
        choices: departments
      },  
      {
        type: "text",
        name: "name",
        message: "What is the New Role you want to add?",
        validate: nameText => {
          if(nameText){
              return true;
          } else {
              console.log('Please Enter Department Name you want to add');
              return false;
          }
        },
      },
        {
          type: "input",
          name: "salary",
          message: "Please Enter Salary for this New Role :",
          validate: (salaryInput) => {
            // to make sure its a Number and no letters
            if (isNaN(salaryInput)) {
              console.log("Please Enter Salary (Numbers only)");
              return false;
            } 
            else {
              return true;
            }
          },
        }  
    ] )
      .then(answer => {
      
     //  console.log("ADDING : Role = " + answer.name + ", Salary = $ " + answer.salary + ", Department ID = " + answer.deptchoice );
    console.log(" ========   Role Added ======== ");
    const sql = 'INSERT INTO roles (job_title, salary, department_id) VALUES(?, ?, ?)';
    const params = [ answer.name, answer.salary, answer.deptchoice ];
    // console.log (params);

  db.query(sql, params, (err, result) => {
    //  console.log(err);
    //  console.table(result);
    firstPrompt();
    });
   })
 })
}
//--------------- Add Employee -----------------------------------------------
// prompt to enter employee's first, last name, role and manager and that employee is added to the database --------------------
var addEmployee  = () => {
    
  db.promise().query('SELECT roles.roleid, roles.job_title FROM roles')
    .then(([rows]) => {
    //  console.log(rows);
  
      var allRoles = rows.map(({job_title, roleid}) => ({
        name: job_title,
        value: roleid
        
    }));
   // console.log(allRoles);
  
      inquirer.prompt(
      [
        {
          type: "text",
          name: "firstname",
          message: "Enter First Name of the Employee :",
          validate: firstnameText => {
            if(firstnameText){
                return true;
            } else {
                console.log('Please Enter First Name of the Employee');
                return false;
            }
          },
        },
        {
          type: "text",
          name: "lastname",
          message: "Enter Last Name of the Employee :",
          validate: lastnameText => {
            if(lastnameText){
                return true;
            } else {
                console.log('Please Enter Last Name of the Employee');
                return false;
            }
          },
        },
        {
          type: "list",
          name: "rolechoice",
          message: "SELECT the Role / Title of the Employee :",
          choices: allRoles
        }
      ] )
  .then(answer => {
        
    //  console.log("ADDING : First Name = " + answer.firstname + ", Last Name =  " + answer.lastname + ", Role = " + answer.rolechoice );
     console.log(" ========   Employee Added ======== ");
    const sql = 'INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)';
    const params = [ answer.firstname, answer.lastname, answer.rolechoice ];
    // console.log (params);
  
    db.query(sql, params, (err, result) => {
    //  console.log(err);
    //  console.table(result);
     firstPrompt();
    
     });
    })
  })
  }
//------------------------------------------------------------------------------------
// -----------  Delete Dept Function ---------------------------------------------
const deleteDeptPrompt = [
   {
     type: "input",
     name: "idtoDelete",
     message: "Please Enter ID number of Department you want to delete :",
     validate: (idInput) => {
      // to make sure its a Number and no letters
      if (isNaN(idInput)) {
      console.log("Please Enter ID number (Numbers only)");
      return false;
      } 
    else {
      return true;
    }
  },
},

]  

var deleteDepartment = () => {
inquirer.prompt(deleteDeptPrompt).then((answer) => {    
 // console.log(answer);
 // console.log(answer.idtoDelete);


const sql = `DELETE FROM department WHERE id = ?`;
const params = [ answer.idtoDelete ];
// console.log("params =" + params);

db.query(sql, params, (err, result) => {
//  console.log(err);
// console.table(result);
console.log(" =====  Department Deleted =========");
firstPrompt();
});
})
} 
//-----------------  Delete a Manager --------------------------------------------------------
const deleteManagerPrompt = [
  {
  type: "input",
  name: "idtoDelete",
  message: "Please Enter ID number of Manager you want to delete :",
  validate: (idInput) => {
    // to make sure its a Number and no letters
    if (isNaN(idInput)) {
      console.log("Please Enter ID number (Numbers only)");
      return false;
    } 
    else {
      return true;
    }
  },
},

]  

var deleteManager = () => {
inquirer.prompt(deleteManagerPrompt).then((answer) => {    
 // console.log(answer);
 // console.log(answer.idtoDelete)


const sql = `DELETE FROM employee WHERE id = ?`;
const params = [ answer.idtoDelete ];
// console.log("params =" + params);

db.query(sql, params, (err, result) => {
 // console.log(err);
// console.table(result);
console.log(" ========  Manager Deleted  ===========");
firstPrompt();
});
})
} 

//-------------------Delete a Role function -----------------------------------------------
const deleteRolePrompt = [
  {
  type: "input",
  name: "roletoDelete",
  message: "Please Enter ID number of the Role you want to delete :",
  validate: (idInput) => {
    // to make sure its a Number and no letters
    if (isNaN(idInput)) {
      console.log("Please Enter ID number of Role (Numbers only)");
      return false;
    } 
    else {
      return true;
    }
  },
},

]  

var deleteRole = () => {
   inquirer.prompt(deleteRolePrompt).then((answer) => {    
   // console.log(answer);
   // console.log(answer.roletoDelete);

  const sql = `DELETE FROM roles WHERE roleid = ?`;
  const params = [ answer.roletoDelete ];
  // console.log("params =" + params);

  db.query(sql, params, (err, result) => {
    // console.log(err);
    // console.table(result);
    console.log(" =========   Role Deleted =========== ");
    firstPrompt();
    });
  })
} 
// --------------- Delete Employee Function ---------------------------------
const deleteEmployeePrompt = [
  {
     type: "input",
     name: "employeetoDelete",
     message: "Please Enter Employee's ID number you want to delete :",
     validate: (idInput) => {
        // to make sure its a Number and no letters
    if (isNaN(idInput)) {
       console.log("Please Enter ID number of Employee (Numbers only)");
       return false;
       } 
    else {
      return true;
    }
  },
},

]  

var deleteEmployee = () => {
    inquirer.prompt(deleteEmployeePrompt).then((answer) => {    
    // console.log(answer);
    // console.log(answer.employeetoDelete);


    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [ answer.employeetoDelete ];
    // console.log("params =" + params);

  db.query(sql, params, (err, result) => {
    //  console.log(err);
    // console.table(result);
    console.log(" ======= Employee Deleted ========== ");
    firstPrompt();
     }); 
   })
} 

//--------Update Employee Role  ------------------------------------------------------------------------------
var updateEmployeeRole  = () => {
  
  db.promise().query('select * from employee')
    .then(([rows]) => {
     // console.log(rows);

     var employee = rows.map(({ first_name, id }) => ({
         name: first_name,
         value: id    
       }));

  db.promise().query('select * from roles')
     
     .then(([rows]) => {
     // console.log(rows);
    
     var newRole = rows.map(({ roleid, job_title }) => ({
        name: job_title,
        value: roleid
      }));   
    
      
  inquirer.prompt(
      [
        {
          type: "list",
          name: "employeechoice",
          message: "SELECT the Employee you want to update Role for :",
          choices: employee
        },
        {
          type: "list",
          name: "rolechoice",
          message: "SELECT the New Role / Title of the Employee :",
          choices: newRole
         }
      ])


    .then(answer => {
        
       //  console.log("ADDING : to Employee = " + answer.employeechoice + ", New Role =  " + answer.rolechoice );
      console.log (" ======= Updated Employee Role ========== ");
    
      const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const params = [ answer.rolechoice, answer.employeechoice ];
      // console.log (params);
  
  db.query(sql, params, (err, result) => {
      //  console.log(err);
      //  console.table(result);
     firstPrompt();
    
        });
      })
    })
  })
}

//---------UPDATE  EMPLOYEE'S MANAGER--------------------------------------------------------------------------------------------------
var updateEmployeeManager  = () => {


  db.promise().query('select * from employee')
    .then(([rows]) => {
    // console.log(rows);

    var employee = rows.map(({ first_name, id }) => ({
         name: first_name,
         value: id    
       }));

  
  
  db.promise().query('select * from employee')
     
     .then(([rows]) => {
     //  console.log(rows);
    
    var newManager = rows.map(({ first_name, id }) => ({
       name: first_name,
       value: first_name
      }));   
    
      
  inquirer.prompt(
      [
        {
          type: "list",
          name: "employeechoice",
          message: "SELECT the Employee you want to update Manager for :",
          choices: employee
        },
        {
          type: "list",
          name: "managerchoice",
          message: "SELECT the New Manager of the Employee from this list :",
          choices: newManager
        }
      ])


     .then(answer => {
        
        // console.log("ADDING : to Employee = " + answer.employeechoice + ", New manager =  " + answer.managerchoice );
        console.log(" ======== Updated Employee's Manager ============= ")
      
        const sql = 'UPDATE employee SET manager = ? WHERE id = ?';
        const params = [ answer.managerchoice, answer.employeechoice ];
       // console.log (params);
  
    db.query(sql, params, (err, result) => {
       //  console.log(err);
       //  console.table(result);
     firstPrompt();
    
       });
     }) 
   })
 })
}