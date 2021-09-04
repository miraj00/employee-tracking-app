const express = require('express');

const db = require('./db/connection');

// Add near the top of the file
// const apiRoutes = require('./routes/apiRoutes');

// const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Add after Express middleware
// By adding the /api prefix here, we can remove it from the
// individual route expressions after we move them to their new home.
// app.use('/api', apiRoutes);


const inquirer = require("inquirer");
const mysql = require("mysql2");

//--------------------------------------------------------------------------
//const employees1 = [];
// const employees = [];

const prompt1 = [
  {
    type: "list",
    name: "choice",
    message: "What would you want to do ?",
    choices: ["View all Departments", "View all Roles", "View all Employees","Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role",
     "Delete a Department", "Delete a Role", "Delete an Employee", "Delete Everything"]
  }
];

var firstPrompt = () => {
  inquirer.prompt(prompt1).then((answer) => {    
    console.log(answer);
//-----------------------------------------------------------------------------------------------    
    if (answer.choice === "View all Departments") {
      
       //  presents a formatted table showing dept names, dept ID
         console.log(" here are all depts");
       
         db.query("SELECT * FROM department", function (err, results) {
      //    console.log(err);
          console.table(results);
          firstPrompt();
        });
      } 
//-----------------------------------------------------------------------------------------------
      else if (answer.choice === "View all Employees"){
 
        // presents a formatted table with employee data including ID, first and last name, job title, dept, salaries, and manager that employee report to 

         console.log(" Here is a table showing all Employees");
       
         db.query("SELECT * FROM employee", function (err, results) {
      //    console.log(err);
          console.table(results);

          firstPrompt();
        });
   }

//------------------------------------------------------------------------------------------------
       else if (answer.choice === "View all Roles"){

        //  presents with job title, role id, dept that role belongs to  and salary 
  
           console.log(" Here is a table presenting all Roles");
  
         db.query("SELECT * FROM roles", function (err, results) {
         //     console.log(err);
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
      else if (answer.choice === "Delete a Department"){
         deleteDepartment();
      }
      else if (answer.choice === "Delete a Role"){
         deleteRole();
       }
      else if (answer.choice === "Delete an Employee"){
         deleteEmployee();
       }
     
    })    
}

firstPrompt();
 
// prompt to enter the name of the department and that dept is added to database ----------------------------------------
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
    console.log(answer);
    console.log("ADDING : -- " + answer.name + " -- Department");
 
  const sql = 'INSERT INTO department (department_name) VALUES(?)';
  const params = [ answer.name ];

  db.query(sql, params, (err, result) => {
  //  console.log(err);
    console.table(result);
    firstPrompt();
    });
  })
}


// prompt to enter name, salary, and dept for the role and that role is added to the database --------------------------------
const addRolePrompt = [
  {
    type: "text",
    name: "name",
    message: "What is the Role you want to add?",
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
      message: "Please Enter salary for this Role :",
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
    },  
    {
      type: "input",
      name: "departmentID",
      message: "Enter department ID you want this role to be added in :",
      validate: (idInput) => {
        // to make sure its a Number and no letters
        if (isNaN(idInput)) {
          console.log("Please Enter Department ID number (Numbers only)");
          return false;
        } 
        else {
          return true;
        }
      },
    }

] 

var addRole = () => {
  inquirer.prompt(addRolePrompt).then((answer) => {    
    console.log(answer);

    console.log("ADDING : Role = " + answer.name + ", Salary = $ " + answer.salary + ", Department ID = " + answer.departmentID );
 
  const sql = 'INSERT INTO roles (job_title, salary, department_id) VALUES(?, ?, ?)';
  const params = [ answer.name, answer.salary, answer.departmentID ];

  db.query(sql, params, (err, result) => {
  //  console.log(err);
    console.table(result);
    firstPrompt();
    });
  })
}


// prompt to enter employee's first, last name, role and manager and that employee is added to the database --------------------
const addEmployeePrompt = [
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
    type: "text",
    name: "role",
    message: "Enter Role of the Employee :",
    validate: roleText => {
      if(roleText){
          return true;
      } else {
          console.log('Please Enter Role of the Employee');
          return false;
      }
    },
  },
  {
    type: "text",
    name: "managertoreport",
    message: "Enter manager name that Employee report to :",
    validate: managerText => {
      if(managerText){
          return true;
      } else {
          console.log('Please Enter Manager name that Employee report to');
          return false;
      }
    },
  },
]

var addEmployee = () => {
  inquirer.prompt(addEmployeePrompt).then((answer) => {    
    console.log(answer);

  console.log("ADDING : First Name = " + answer.firstname + ", Last Name = " + answer.lastname + ", Role = " + answer.role + ", Manager to Report = " + answer.managertoreport );
 
  const sql = 'INSERT INTO employee (first_name, last_name, job_title) VALUES(?, ?, ?)';
  const params = [ answer.firstname, answer.lastname, answer.role ];

  db.query(sql, params, (err, result) => {
  //  console.log(err);
    console.table(result);
    firstPrompt();
    });
  })
}

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
  console.log(answer);
  console.log(answer.idtoDelete)


const sql = `DELETE FROM department WHERE id = ?`;
const params = [ answer.idtoDelete ];
console.log("params =" + params);

db.query(sql, params, (err, result) => {
//  console.log(err);
console.table(result);
console.log("Department Deleted");
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
  console.log(answer);
  console.log(answer.roletoDelete)


const sql = `DELETE FROM roles WHERE id = ?`;
const params = [ answer.roletoDelete ];
console.log("params =" + params);

db.query(sql, params, (err, result) => {
//  console.log(err);
console.table(result);
console.log("Role Deleted");
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
  console.log(answer);
  console.log(answer.employeetoDelete)


const sql = `DELETE FROM employee WHERE id = ?`;
const params = [ answer.employeetoDelete ];
console.log("params =" + params);

db.query(sql, params, (err, result) => {
//  console.log(err);
console.table(result);
console.log("Employee Deleted");
firstPrompt();
});
})
} 


//--------Employee Updated --------------------------------------------------------------
const updateEmployeePrompt = [
  {
  type: "input",
  name: "employeetoUpdate",
  message: "Please Enter ID number of Employee you want to Update :",
  validate: (idInput) => {
    // to make sure its a Number and no letters
    if (isNaN(idInput)) {
      console.log("Please Enter ID number of Employee you want to Update (Numbers only)");
      return false;
    } 
    else {
      return true;
    }
  },
},
{

  type: "input",
  name: "roleidtoUpdate",
  message: "Enter the new Role ID you want to assign to this Employee :",
  validate: (idInput) => {
    // to make sure its a Number and no letters
    if (isNaN(idInput)) {
      console.log("Enter New Role ID number of Employee to Update (Numbers only)");
      return false;
    } 
    else {
      return true;
    }
  },
}

]  


// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;


var updateEmployeeRole = () => {
inquirer.prompt(updateEmployeePrompt).then((answer) => {    
  console.log(answer);
  console.log(answer.employeetoUpdate, answer.roleidtoUpdate)


  const sql = `UPDATE employee 
               SET role_id = ? 
               WHERE id = ?`;
  const params = [ answer.roleidtoUpdate, answer.employeetoUpdate ];
  console.log("params =" + params);

  db.query(sql, params, (err, result) => {
   //  console.log(err);
   console.table(result);
   console.log("Employee Role Updated");
firstPrompt();
});
})
} 

