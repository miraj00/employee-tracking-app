// ----  Add a Role  --->>>> prompt to enter name, salary, and dept for the role and that role is added to the database --------------------------------
var addRole = () => {
    
    db.promise().query('SELECT department.department_name, department.id FROM department')
      .then(([rows]) => {
     //   console.log(rows);
    //-------------
        var departments = rows.map(({department_name, id}) => ({
          name: department_name,
          value: id
          
      }));
     // console.log(departments);
    //-------------
    
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
        ] )
  
  
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


module.exports = Roles;