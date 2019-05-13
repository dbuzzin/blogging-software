const express   = require("express"),
      passport  = require("passport"),
      auth      = require("../../middleware/auth"),
      User      = require("../../models/user"),

      router = express.Router();

router.get("/logout", auth.isLogged, (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;