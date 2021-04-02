const User = require ("../models/user")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")

const SECRET = "pouetpouet";
const MAXAGE = Math.floor(Date.now() / 1000) + (60 * 60);

exports.signup = async (request, response) => {
    const alerts_warning = await request.consumeFlash('warning')
    response.render("signup.ejs", { alerts_warning });
}

exports.login = async (request, response) => {
    const alerts_warning = await request.consumeFlash('warning')
    response.render("login.ejs", { alerts_warning });
    // console.log(alerts_warning);
}

exports.newAccount = (request, response) => {
    const { first_name, last_name, birth_date, username, mail, password, phone, city } = request.body;

    User.getByUsername (username, async (error, result) => {
        if (error) {
            response.send(error.message)
        } else if (result.length !== 0) {
            await request.flash('warning', "Ce nom d'utilisateur existe déjà.")
            response.redirect('/signup')
            console.log(result.username);
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

exports.authenticate = async (request, response) => {
    const { username, password } = request.body;

    User.getByUsername(username, async (error, result) => {
        if (error) {
            response.send(error.message)
        } else if (result.length === 0) {
            await request.flash('warning', "Cet utilisateur n'existe pas.")
            response.redirect("/login")
        } else {
            const hash = result[0].password;
            bcrypt.compare(password, hash, async (error, correct) => {
                if (error) {
                    response.send(error.message)
                } else if (!correct) {
                    await request.flash('warning', "Mot de passe incorrect.")
                    response.redirect('/login')
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

exports.logout = (request, response) => {
    response.clearCookie("authcookie");
    response.redirect("/")
}