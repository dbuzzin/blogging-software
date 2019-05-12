const express   = require("express"),
      Post      = require("../../models/post"),

      router = express.Router();

router.put("/posts/:id/like", (req, res) => {
    console.log(req.params.id);
    Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, (err, like) => {
        console.log(like);
        if(err) {
            console.log("Error: ", err);
        } else {
            res.send(like);
        }
    });
});

router.put("/posts/:id/dislike", (req, res) => {
    console.log(req.params.id);
    Post.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, (err, dislike) => {
        console.log(dislike);
        if(err) {
            console.log("Error: ", err);
        } else {
            res.send(dislike);
        }
    });
});

router.get("/posts/:id/getData", (req, res) => {
    Post.findById(req.params.id).then(data => {
        res.json(data);
    });
});

module.exports = router;