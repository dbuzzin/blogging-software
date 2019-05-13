const express   = require("express"),
      Post      = require("../../models/post"),
      auth      = require("../../middleware/auth"),

      router = express.Router();

router.delete("/posts/:id", auth.isLogged, (req, res) => {

    Post.findByIdAndRemove(req.params.id, err => {
        if(err) {
            console.log("Error: ", err);
            res.redirect("/feed");  
        } else {
            console.log("Post Removed");
            res.redirect("/feed");
        }
    });

});

module.exports = router;