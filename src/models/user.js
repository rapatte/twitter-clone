const db = require('../db')

exports.getByUsername = (username, callback) => {
    db.query(`SELECT * FROM users WHERE username = "${username}";`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null)
            return;
        }
        callback(null, result);
    })
}

exports.createUser = (user, callback) => {
    db.query (`INSERT INTO users (first_name, last_name, birth_date, username, mail, password, phone, city) VALUES ("${user.first_name}", "${user.last_name}", "${user.birth_date}", "${user.username}", "${user.mail}", "${user.password}", "${user.phone}", "${user.city}");`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }
        callback(null, result)
    })
}