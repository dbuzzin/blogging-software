const express   = require("express"),
      passport  = require("passport"),
      auth      = require("../middleware/auth"),
      Post      = require("../models/post"),

      router = express.Router();

router.get("/feed", auth.isLogged, (req, res) => {

    Post.find({}, (err, posts) => {

        if(err) {
            console.log("Error: ", err);
        } else {
            res.render("main", {posts: posts, user: req.user});
        }
        
    });

});

module.exports = router;