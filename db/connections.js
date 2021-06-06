const mysql = require('mysql2');
const chalk = require('chalk');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'root',
      database: 'hero_call'
    },
    console.log(chalk.bgRed.black(`Enter your username and password.`))
  );

  db.connect(function (err) {
    if (err) throw err;
});
  

  module.exports = db;