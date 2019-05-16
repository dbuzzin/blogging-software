const express   = require("express"),
      passport  = require("passport"),
      auth      = require("../../middleware/auth"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/login", auth.isLogged, (req, res) => {
    res.render("users/login", {isAuth: req.isAuthenticated()});
});

router.post("/login", auth.isLogged, passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login"
}), (req, res) => {
    
});

module.exports = router;