const User = require ("../models/user")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")

const SECRET = "pouetpouet";
const MAXAGE = Math.floor(Date.now() / 1000) + (60 * 60);

exports.signup = (request, response) => {
    response.render("signup.ejs");
}

exports.login = (request, response) => {
    response.render("login.ejs");
}

exports.newAccount = (request, response) => {
    const { first_name, last_name, birth_date, username, mail, password, phone, city } = request.body;

    User.getByUsername (username, (error, result) => {
        if (error) {
            response.send(error.message)
        } else if (result.length !== 0) {
            response.send("Ce nom d'utilisateur existe déjà")
        } else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
                response.send(error.message)
            }
            // console.log(hash);
            const newUser = {
                first_name,
                last_name,
                birth_date,
                username,
                mail,
                password: hash,
                phone,
                city
            }
            
            User.createUser(newUser, (error, result) => {
                if (error) {
                    response.send(error.message)
                }
                response.redirect("/login");
            })
        })
        }        
    })
}

exports.authenticate = (request, response) => {
    const { username, password } = request.body;

    User.getByUsername(username, (error, result) => {
        if (error) {
            response.send(error.message)
        } else if (result.length === 0) {
            response.send("Cet utilisateur n'existe pas")
        } else {
            const hash = result[0].password;
            bcrypt.compare(password, hash, (error, correct) => {
                if (error) {
                    response.send(error.message)
                } else if (!correct) {
                    response.send('Mot de passe incorrect')
                } else {
                    const user = {
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        username: result[0].username,
                        exp: MAXAGE
                    }
                    jwt.sign(user, SECRET, (error, token) =>{
                        if (error) {
                            response.send(error.message)
                        } else {
                            request.user = user;
                            response.cookie('authcookie', token, { maxAge: 60*60*1000 });
                            response.redirect("/");
                        }
                    });
                }
            });
        }
    });
}