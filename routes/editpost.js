const express   = require("express"),
      Post      = require("../models/post"),

      router = express.Router();

router.get("/posts/:id/edit", (req, res) => {

    Post.findById(req.params.id, (err, post) => {
        if(err) {
            console.log("Error: ", err);
            res.redirect("/");
        } else {
            res.render("editpost", {post: post});
        }
    });

});

router.put("/posts/:year/:month/:day/:title", (req, res) => {

    let getPost = {
        title   : req.body.post.title.toLowerCase(),
        body    : req.sanitize(req.body.post.body)
    }  

    let findPost = {
        title   : req.params.title.replace(/[-]/gi, " "),
        created : {
            year    : req.params.year,
            month   : req.params.month,
            day     : req.params.day
        }   
    }

    Post.findOneAndUpdate(findPost, getPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
            res.redirect(`/posts/${post._id}/edit`);
        } else {
            console.log(post);
            res.redirect(`/posts/${post.created.year}/${post.created.month}/${post.created.day}/${getPost.title.replace(/\s/g, "-")}`);
        }
    });

});

module.exports = router;