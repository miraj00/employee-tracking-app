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
        ] )
  
  
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


module.exports = Manager;