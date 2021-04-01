const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController')
const userController = require('../controllers/userController')
const isAuth = require ('../middlewares/isAuth')

router.get("/", tweetController.findAll);
router.get("/user/:id", isAuth, tweetController.findUserTweets);
router.get("/users/:id/tweet/:tweetsid",isAuth, tweetController.findOne);
router.post("/",isAuth, tweetController.addOne);
router.post("/users/:id/tweet/:tweetsid",isAuth, tweetController.changeOne);
router.post("//users/:id/tweet/:tweetsid/delete",isAuth, tweetController.delete);

router.get("/signup", userController.signup)
router.post("/signup", userController.newAccount);
router.get("/login", userController.login);
router.post("/login", userController.authenticate)

module.exports = router;