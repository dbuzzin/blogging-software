const express   = require("express"),
      Post      = require("../../models/post"),
      router    = express.Router();

router.get("/posts/search", (req, res) => {

    let results = [];
    
    Post.find({}, (err, foundPosts) => {

        if(typeof req.query.tag !== "undefined") {
            foundPosts.filter(post => {
                post.tags.forEach(tag => {
                    if(tag === req.query.tag) {
                        results.push(post);
                    }
                });
            });
        } else if(typeof req.query.query !== "undefined") {
            let query = RegExp(`(${req.query.query})`, "gi");
            foundPosts.filter(post => {
                if(query.test(post.title) || query.test(post.body)) {
                    if(results.indexOf(post) === -1) results.push(post);
                }
                post.tags.forEach(tag => {
                    if(query.test(tag)) {
                        if(results.indexOf(post) === -1) results.push(post);
                    }
                });
            });
        } else {
            results = foundPosts;
        }

        res.render("search", {posts: results, isAuth: req.isAuthenticated(), user: req.user});

    });

});



module.exports = router;