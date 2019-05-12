const express   = require("express"),
      Post      = require("../../models/post"),
      router    = express.Router();

// router.get("/posts/search", (req, res) => {
//     res.render("search1");
// });

router.get("/posts/search", (req, res) => {

    let query       = {},
        results     = [];
    
    Post.find({}, (err, foundPosts) => {
        if(typeof req.query.tag !== "undefined") {
            query.tags = req.query.tag;
            foundPosts.filter(post => {
                post.tags.forEach(tag => {
                    if(tag === query.tags) {
                        results.push(post);
                    }
                });
            });
        } else if(typeof req.query.query !== "undefined") {
            query.queries = req.query.query;
            let regex = RegExp(`(${query.queries})`, "gi");
            console.log(regex);
            foundPosts.filter(post => {
                if(regex.test(post.title) || regex.test(post.body)) {
                    results.push(post);
                }
                post.tags.forEach(tag => {
                    if(regex.test(tag)) {
                        results.push(post);
                    }
                });
            });
        } else {
            results = foundPosts;
        }
        // console.log(results);
        res.render("search", {posts: results});
    });
});



module.exports = router;