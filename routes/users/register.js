const express   = require("express"),
      passport  = require("passport"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/signup", (req, res) => {

    res.render("users/register", {isAuth: req.isAuthenticated()});

});

router.post("/signup", (req, res) => {
    User.register(new User({
        email       : req.body.email,
        username    : req.body.username,
        blogurl     : req.body.blogurl
    }), req.body.password, (err, user) => {
        if(err) {
            console.log("Error: ", err);
            return res.redirect("/");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/feed");
            });
            
        }
    });
});

module.exports = router;