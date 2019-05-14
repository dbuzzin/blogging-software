const express   = require("express"),
      Post      = require("../../models/post"),
      auth      = require("../../middleware/auth"),

      router = express.Router();

router.get("/posts/:id/edit", auth.isLogged, (req, res) => {

    Post.findById(req.params.id, (err, post) => {
        if(err) {
            console.log("Error: ", err);
            res.redirect("/feed");
        } else {
            res.render("posting/editpost", {post: post, user: req.user, isAuth: req.isAuthenticated()});
        }
    });

});

router.put("/posts/:year/:month/:day/:title", auth.isLogged, (req, res) => {

    let getPost = {
        title   : req.body.post.title.toLowerCase(),
        body    : req.sanitize(req.body.post.body),
        tags : typeof req.body.post.tags === "undefined" ? undefined : req.body.post.tags.split(",")
    }  

    let findPost = {
        title           : req.params.title.replace(/[-]/gi, " "),
        "created.year"  : req.params.year,
        "created.month" : req.params.month,
        "created.day"   : req.params.day
    }

    Post.findOneAndUpdate(findPost, getPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
            res.redirect(`/posts/${post._id}/edit`);
        } else {
            res.redirect(`/posts/${post.created.year}/${post.created.month}/${post.created.day}/${getPost.title.replace(/\s/g, "-")}`);
        }
    });

});

module.exports = router;