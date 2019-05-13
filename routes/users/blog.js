const express   = require("express"),
      passport  = require("passport"),
      mongoose  = require("mongoose"),
      auth      = require("../../middleware/auth"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/:blog", auth.isLogged, (req, res) => {

    

    User.findOne({blogname: req.params.blog}, (err, user) => {

        if(err) {
            console.log("Error: ", err);
        } 
    
    }).then(user => {

        Post.find({_id: { $in: user.posts}}, (err, posts) => {
            res.render("blog", {posts: posts, user: req.user, isAuth: req.isAuthenticated()});
        });
    });

});

module.exports = router;