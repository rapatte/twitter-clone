const { response } = require("express")
const Tweet = require("../models/tweet")

exports.findAll = (request, response) => {
    Tweet.getAll((error, tweets) => {
        if (error) {
            response.send(error.message);
        }

        response.render("home.ejs", { tweets })
    })
}

exports.findUserTweets = (request, response) => {
    let {id} = request.params;
    
    Tweet.getUserTweets(id, (error, tweetsList) => {
        if (error) {
            response.send(error.message)
        }
        // console.log(tweets);
        response.render("userTweets.ejs", { tweetsList })
        // console.log(tweetsList);
    })
}

exports.findOne = (request, response) => {
    
    let { id } = request.params;
    let { tweetsid } = request.params;
    Tweet.findOne(id, tweetsid, (error, tweetDetails) => {
        if (error) {
            response.send(error.message)
        }
        response.render("tweetDetails.ejs", { tweetDetails, id, tweetsid, user: request.user })
        
    })
}

exports.addOne = (request, response) => {
    Tweet.create(request.body, 2, (error, result) => {
        if(error) {
            response.send(error.message);
        }
        response.redirect('/')
    })
}

exports.changeOne = (request, response) => {
    let { id } = request.params;
    let { tweetsid } = request.params;
    Tweet.putText(tweetsid, request.body["message"], (error, result) => {
        if (error) {
            response.send(error.message);
        }
        
        response.redirect(`/user/${id}`)
        // console.log(request.body["message"]);
    })
}

exports.delete = (request, response) => {
    let {id} = request.params;
    let {tweetsid} = request.params;
    Tweet.removeone(tweetsid, request.body, (error, result) => {
        if (error) {
            response.send(error.message);
        }
        response.redirect(`/user/${id}`);
    })
}