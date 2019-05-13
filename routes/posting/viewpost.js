const express   = require("express"),
      Post      = require("../../models/post"),

      router = express.Router();

router.get("/posts/:year/:month/:day/:title", (req, res) => {

    let findPost = {
        title           : req.params.title.replace(/[-]/gi, " "),
        "created.year"  : req.params.year,
        "created.month" : req.params.month,
        "created.day"   : req.params.day
    }

    Post.findOne(findPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            res.render("viewpost", {post: post, isAuth: req.isAuthenticated(), user: req.user || {}});
        }
    });  
});

module.exports = router;