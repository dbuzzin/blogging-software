const express   = require("express"),
      mongoose  = require("mongoose");
      Post      = require("../../models/post"),

      router = express.Router();

router.delete("/posts/:id", (req, res) => {

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