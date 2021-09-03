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
     "Delete a Department", "Delete a Role ", "Delete an Employee", "Delete Everything"]
  }
];

var firstPrompt = () => {
  inquirer.prompt(prompt1).then((answer) => {    
    console.log(answer);
    if (answer.choice === "View all Departments") {
      
       //  presents a formatted table showing dept names, dept ID
     //  viewallDept();     
     console.log(  

      db.query("SELECT * FROM department", function (err, results) {
     
        return results;
        })
     );
   
      } 


//---------------------------------------------------

      else if (answer.choice === "View all Roles"){
       
        console.log( " HIIIIIIII ");
              
        // viewallRoles();          //  presents with job title, role id, dept that role belongs to  and salary 

        //  const sql = `SELECT roles.*, department_name AS dept_name 
        //  FROM roles 
        //  LEFT JOIN department ON roles.department_name = department.department_name`;

        // db.query(sql, (err, rows) => {
        // console.log( rows );
       
        db.query("SELECT * FROM roles", function (err, results) {
          console.log(results);

       });
      }
    
  
  
//---------------------------------------------------
      else if (answer.choice === "View all Employees"){
         viewallEmployees();      // presents a formatted table with employee data including ID, first and last name, job title, dept, salaries, and manager that employee report to 
       }
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
      // else if (answer.choice === "Delete a Department"){
      //    deleteDepartment();
      //  }
      // else if (answer.choice === "Delete a Role"){
      //    deleteRole();
      //  }
      // else if (answer.choice === "Delete an Employee"){
      //    deleteEmployee();
      //  }
      // else if (answer.choice === "Delete Everything"){
      //    deleteEverything();
      //  }
     
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
      type: "text",
      name: "department",
      message: "What department you want this role to be added ?",
      validate: nameText => {
        if(nameText){
            return true;
        } else {
            console.log('Please Enter Department you want this role to be added');
            return false;
        }
      },
  }

] 

var addRole = () => {
  inquirer.prompt(addRolePrompt).then((answer) => {    
    console.log(answer);

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

  })
}



// prompt to select employee to update and their new role and this info is updated in the database -----------------------------
const updateEmployeeRolePrompt = [
  {
    type: "text",
    name: "selectEmployee",
    message: "Select the Employee you want to update :",
    validate: employeeText => {
      if(employeeText){
          return true;
      } else {
          console.log('Please select the Employee you want to update');
          return false;
      }
    },
  },
  {
    type: "text",
    name: "newRole",
    message: "Select the New Role you want to assign to this Employee :",
    validate: newRoleText => {
      if(newRoleText){
          return true;
      } else {
          console.log('Please select the new role you want to assign/update');
          return false;
      }
    },
  },

]

var updateEmployeeRole = () => {
  inquirer.prompt(updateEmployeeRolePrompt).then((answer) => {    
    console.log(answer);

  })
}





// // Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }); 

