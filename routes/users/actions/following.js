const express       = require("express"),
      User          = require("../../../models/user"),
      auth          = require("../../../middleware/auth"),

      router        = express.Router();

router.put("/:blog", auth.isLogged,  (req, res) => {
    User.findOne({blogurl: req.params.blog}, (err, user) => {
        if(err){
            console.log("Error: ", err)
        }
    }).then(user => {
        User.findOne(req.user, (err, self) => {
            if(err){
                console.log("Error: ", err)
            } else {
                if(user.followers.indexOf(req.user._id) !== -1) {
                    console.log("You've already followed this blog!");
                } else {
                    user.followers.push(req.user);
                    self.following.push(user);
                    user.save();
                    self.save();
                    console.log("Following Blog!");
                }
            }
        });
    })
});

module.exports = router;