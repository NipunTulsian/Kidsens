const mysql = require('mysql')

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    socketPath:"/tmp/mysql.sock",
    password: "#Nipun100",
    database: "kidsens_db",
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
module.exports = db