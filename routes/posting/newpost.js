const express   = require("express"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),
      auth      = require("../../middleware/auth"),

      router = express.Router();

router.get("/posts/new", auth.isLogged, (req, res) => {
    res.render("newpost", {user: req.user, isAuth: req.isAuthenticated()});
});

router.post("/posts/new", auth.isLogged, (req, res) => {

    let getPost = {
        title   : req.body.post.title.toLowerCase(),
        body    : req.sanitize(req.body.post.body),
        author  : req.user.username,
        tags    : typeof req.body.post.tags === "undefined" ? undefined : req.body.post.tags.split(",")
    }

    Post.create(getPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            User.findOne({username: req.user.username}, (err, user) => {
                user.posts.push(post);
                user.save();
            })
            res.redirect(`/posts/${post.created.year}/${post.created.month}/${post.created.day}/${post.title.replace(/\s/g, "-")}`);
        }
    });
});

module.exports = router;