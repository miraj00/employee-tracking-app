//--------------- Add Employee -----------------------------------------------
// prompt to enter employee's first, last name, role and manager and that employee is added to the database --------------------
var addEmployee  = () => {
    
    db.promise().query('SELECT roles.roleid, roles.job_title FROM roles')
      .then(([rows]) => {
      //  console.log(rows);
    //----------
        var allRoles = rows.map(({job_title, roleid}) => ({
          name: job_title,
          value: roleid
          
      }));
     // console.log(allRoles);
    //-------------
    
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





module.exports = Employee;