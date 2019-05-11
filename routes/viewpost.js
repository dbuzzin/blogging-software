const express   = require("express"),
      mongoose  = require("mongoose"),
      Post      = require("../models/post"),

      router = express.Router();

router.get("/posts/:year/:month/:day/:title", (req, res) => {

    let findPost = {
        title   : req.params.title.replace(/[-]/gi, " "),
        year    : req.params.year,
        month   : req.params.month,
        day     : req.params.day
    }

    console.log(req.params.title);
    console.log(findPost.title);

    Post.findOne(findPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            res.render("viewpost", {post: post});
        }
    });
    
});

module.exports = router;