
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







module.exports = Department;