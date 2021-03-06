const express   = require("express"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),

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
            res.render("posting/viewpost", {
                post        : post,
                user        : req.user || {},
                isAuth      : req.isAuthenticated(), 
             });
        }
    });
});

module.exports = router;