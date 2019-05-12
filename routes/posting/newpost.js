const express   = require("express"),
      Post      = require("../../models/post"),

      router = express.Router();

router.get("/posts/new", (req, res) => {
    res.render("newpost");
});

router.post("/posts/new", (req, res) => {

    let getPost = {
        title   : req.body.post.title.toLowerCase(),
        body    : req.sanitize(req.body.post.body),
        tags    : req.body.post.tags.split(",")
    }

    Post.create(getPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            console.log("Added New Post", post);
            res.redirect(`/posts/${post.created.year}/${post.created.month}/${post.created.day}/${post.title.replace(/\s/g, "-")}`);
        }
    });
});

module.exports = router;