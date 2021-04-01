const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'twitter'
})

db.connect((error) => {
    if (error) throw error;
    console.log("Connection to dabase at 8080");
});

module.exports = db;