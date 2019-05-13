const express   = require("express"),
      Post      = require("../../models/post"),
      auth      = require("../../middleware/auth"),

      router = express.Router();

router.put("/posts/:id/like", auth.isLogged, (req, res) => {
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

router.put("/posts/:id/dislike", auth.isLogged, (req, res) => {
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

router.get("/posts/:id/getData", auth.isLogged, (req, res) => {
    Post.findById(req.params.id).then(data => {
        res.json(data);
    });
});

module.exports = router;