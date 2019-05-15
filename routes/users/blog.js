const express   = require("express"),
      passport  = require("passport"),
      mongoose  = require("mongoose"),
      auth      = require("../../middleware/auth"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/blog/:blog", auth.isLogged, (req, res) => {

    User.findOne({blogurl: req.params.blog})
        .populate("posts").exec((err, user) => {
            if(err) {
                console.log("Error:", err);
            } else {
                res.render("users/blog", {thisUser: user, posts: user.posts, user: req.user, isAuth: req.isAuthenticated()});
            }
        });

});

module.exports = router;