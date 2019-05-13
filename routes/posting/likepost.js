const express   = require("express"),
      Post      = require("../../models/post"),
      User      = require("../../models/user"),
      auth      = require("../../middleware/auth"),

      router = express.Router();

router.put("/posts/:id/like", auth.isLogged, (req, res) => {

    Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.user } }, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            User.findByIdAndUpdate(req.user._id, { $push: { likes: post } }, (err, post) => {
                res.send(post);
            });
        }

    });
});

router.put("/posts/:id/dislike", auth.isLogged, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $push: { dislikes: req.user } }, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            User.findByIdAndUpdate(req.user._id, { $push: { dislikes: post } }, (err, post) => {
                res.send(post);
            });
        }
    });
});

router.get("/posts/:id/getData", (req, res) => {
    Post.findById(req.params.id).then(data => {
        res.json(data);
    });
});

module.exports = router;