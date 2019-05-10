const mongoose = require("mongoose"),

      postSchema = new mongoose.Schema({
          title     : String,
          body      : String,
          created   : {type: Date, default: Date.now}
      });

module.exports = mongoose.model("Post", postSchema);