const express   = require("express"),
      passport  = require("passport"),
      auth      = require("../../middleware/auth"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),
      events    = require("../handle-notifications"),

      router = express.Router();

router.get("/feed", auth.isLogged, (req, res) => {

    console.log(req.user);

    let postArr = [];

    User.find({_id: {$in: req.user.following}})
        .populate("posts").exec((err, users) => {
            if(err) {
                console.log("Error:", err);
            } else {
                users.forEach(user => {
                    postArr.push(...user.posts);
                })
                res.render("users/feed", {posts: postArr, user: req.user, isAuth: req.isAuthenticated()});
            }
        });
        
});

module.exports = router;