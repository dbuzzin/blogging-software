const express   = require("express"),
      passport  = require("passport");

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
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