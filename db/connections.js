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
    console.log(chalk.bgRed.black(`Enter your username and password.`)),
    console.log(chalk.blue.bgRed(`UserName: *************`)),
    console.log(chalk.blue.bgRed(`Password: ********************`)),
    console.log(chalk.black.bgYellow(`Welcome Agoni Bigchin to the Hero Association HERO DATABASE!`))

  );

  db.connect(function (err) {
    if (err) throw err;
});
  

  module.exports = db;