const express   = require("express"),
      Post      = require("../models/post"),

      router = express.Router();

router.get("/", (req, res) => {

    Post.find({}, (err, posts) => {

        if(err) {
            console.log("Error: ", err);
        } else {
            res.render("main", {posts: posts});
        }
        
    });

});

module.exports = router;