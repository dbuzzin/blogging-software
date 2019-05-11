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
        year    : req.params.year,
        month   : req.params.month,
        day     : req.params.day
    }

    Post.findOneAndUpdate(findPost, getPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
            res.redirect("/posts/:id/edit");
        } else {
            res.redirect(`/`);
        }
    });

});

module.exports = router;