const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Redbud116@',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );


  //export the file by adding this lines
  module.exports = db;