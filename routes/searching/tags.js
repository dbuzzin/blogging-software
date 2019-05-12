const express   = require("express"),
      Post      = require("../../models/post"),
      router    = express.Router();

router.get("/posts/search", (req, res) => {
    let getQuery = {
        tags     : req.query.tag
    }

    let posts = Post.find(getQuery, (err, posts) => {
        if(err) {
            console.log("Error: ", err)
        } else {
            res.render("search", {posts: posts});
        }
    })
});

module.exports = router;