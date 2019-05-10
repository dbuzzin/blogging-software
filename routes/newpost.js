const express   = require("express"),
      Post      = require("../models/post"),

      router = express.Router();

router.get("/new", (req, res) => {
    res.render("newpost");
});

router.post("/new", (req, res) => {
    Post.create(req.body.post, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            console.log("Added New Post");
            res.redirect("/");
        }
    });
});

module.exports = router;