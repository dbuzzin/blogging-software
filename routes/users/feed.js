const express   = require("express"),
      passport  = require("passport"),
      auth      = require("../../middleware/auth"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/feed", auth.isLogged, (req, res) => {

    // Post.find({}, (err, posts) => {

    //     if(err) {
    //         console.log("Error: ", err);
    //     } else {
    //         res.render("users/feed", {posts: posts, user: req.user, isAuth: req.isAuthenticated()});
    //     }
        
    // });

    let postArr = [];

    User.find({_id: {$in: req.user.following}}, (err, users) => {
        
    }).then(users => {
        users.forEach(user => {
            postArr.push(...user.posts);
        })
        Post.find({_id: {$in: postArr}}, (err, posts) => {
            if(err) {
                console.log("Error: ", err)
            } else {
                res.render("users/feed", {posts: posts, user: req.user, isAuth: req.isAuthenticated()});
            }
        })
    });

    

});

module.exports = router;