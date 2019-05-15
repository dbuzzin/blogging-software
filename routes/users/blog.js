const express   = require("express"),
      passport  = require("passport"),
      mongoose  = require("mongoose"),
      auth      = require("../../middleware/auth"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/blog/:blog", auth.isLogged, (req, res) => {
    
    User.findOne({blogurl: req.params.blog}, (err, user) => {

        if(err) {
            console.log("Error: ", err);
        } 
    
    }).then(thisUser => {

        Post.find({_id: { $in: thisUser.posts}}, (err, posts) => {
            res.render("users/blog", {thisUser: thisUser, posts: posts, user: req.user, isAuth: req.isAuthenticated()});
        });
    });

});

module.exports = router;