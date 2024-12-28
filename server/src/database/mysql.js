// database/mysql.js
const mysql = require('mysql2');

// MySQL Connection
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '*#$(req)405R@i',
  database: 'restaurant',
});

// Connect to MySQL
const connectMySQL = () => {
  mysqlConnection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      process.exit(1); // Exit process on connection error
    } else {
      console.log('Connected to MySQL');
    }
  });
};

// Export the connection function and connection object
module.exports = {
  connectMySQL,
  mysqlConnection,
};
