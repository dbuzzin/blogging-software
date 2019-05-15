const express   = require("express"),
      passport  = require("passport"),
      auth      = require("../../middleware/auth"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/login", (req, res) => {
    res.render("users/login", {isAuth: req.isAuthenticated()});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login"
}), (req, res) => {
    
});

module.exports = router;