const db = require('../db')

exports.getAll = (callback) => {
    db.query("SELECT * FROM tweets INNER JOIN users ON users.id = tweets.id_user ORDER BY tweets.id DESC LIMIT 20;", (error, result) => {
        if (error) {
            console.log("error: ", error)
            callback(error, null)
            return;
        }
        
        callback(null, result)
    })
}
exports.getUserTweets = (id, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON tweets.id_user = users.id WHERE users.id = ${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error)
            callback(error, null)
            return;
        }
        callback(null, result)
    })
}
exports.findOne = (id, tweetsid, callback) => {
    db.query(`SELECT * FROM users INNER JOIN tweets ON users.id = tweets.id_user WHERE tweets.id_user = ${id} AND tweets.id = ${tweetsid};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null)
            return;
        }
        callback(null, result)
    })
}
exports.create = (tweet, id_user, callback) => {
    db.query(`INSERT INTO tweets (text, id_user, creation_date) VALUES ("${tweet.message}", "${id_user}", CURDATE());`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null)
            return;
        }
        callback(null, result)
    })
}

exports.putText = (tweetsid, new_value, callback) => {
    db.query(`UPDATE tweets SET text = "${new_value}" WHERE tweets.id = ${tweetsid};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null)
            return;
        }
        callback(null, result)
    })
}

exports.removeone = (id, callback) => {
    const query = `DELETE FROM tweets WHERE id = ${id};`
    // console.log(query);
    db.query(`DELETE FROM tweets WHERE id = ${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            return;
        }
        callback(null, result);
        // console.log(result);
    })
}