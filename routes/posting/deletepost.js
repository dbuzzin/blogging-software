const express   = require("express"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),
      auth      = require("../../middleware/auth"),

      router = express.Router();

router.delete("/posts/:id", auth.isLogged, (req, res) => {

    Post.findByIdAndRemove(req.params.id, (err, post) => {
        if(err) {
            console.log("Error: ", err);
            res.redirect("/feed");  
        } else {
            User.findOneAndUpdate({username: req.user.username}, {$pull: {posts: post._id}}, (err, user) => {
                if(user.posts.length === 1) {
                    user.posts.pop();
                    user.save();
                }
            });
            res.redirect("/feed");
        }
    });

});

module.exports = router;