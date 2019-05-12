const express   = require("express"),
      Post      = require("../../models/post"),

      router = express.Router();

router.get("/signup", (req, res) => {

    res.render("register");

});

module.exports = router;