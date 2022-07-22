const mysql = require('mysql2');
require('dotenv').config()

// creating mysql2 connection inputs
connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Name,
}
)

connection.connect((err) => {
  if (err) throw err;
  console.log(`Databse connection successful`)
})

module.exports = connection;