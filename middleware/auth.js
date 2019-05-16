const express   = require("express"),
      passport  = require("passport");

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) {
        if(req.route.path !== "/login") {
            return next();
        } else {
            res.redirect("/feed");
        }
    }
    res.redirect("/login");
}

const authUser = (req, res, next) => {
    return passport.authenticate("local", {
        successRedirect: "/feed",
        failureRedirect: "/login"
    });
};

module.exports = {
    isLogged, 
    authUser
};