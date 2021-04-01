const jwt = require('jsonwebtoken')
const SECRET = "pouetpouet"

const isAuth = (request, response, next) => {
    const token = request.cookies.authcookie;

    console.log(token);
    jwt.verify(token, SECRET, (error, user) => {
        if(error) {
            response.send("Veuillez vous connecter");
        } else {
            const { first_name, last_name, username, exp } = user;
            if (Date.now() / 1000 > exp) {
                response.clearCookie("authcookie");
                response.send("Session éxpiré. Reconnectez-vous.")
            } else {
                request.user = { first_name, last_name, username }
                next()
            }
        }
    })
}

module.exports = isAuth;