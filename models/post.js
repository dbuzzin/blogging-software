const mongoose = require("mongoose"),

      date = new Date(),

      postSchema = new mongoose.Schema({
          title         : String,
          body          : String,
          author        : String,
          blogurl       : String,

          created       : {
              fulldate  : {type: Date, default: Date.now},
              year      : {type: String, default: date.getFullYear()},
              month     : {type: String, default: String(date.getMonth() + 1).replace(/^(\d)$/, "0$1")},
              day       : {type: String, default: String(date.getDate()).replace(/^(\d)$/, "0$1")},
          },

          likes         : [{
              type      : mongoose.Schema.Types.ObjectId,
              ref       : "User"
          }],

          dislikes      : [{
              type      : mongoose.Schema.Types.ObjectId,
              ref       : "User"
          }],

          tags          : {type: Array,  default: []},

      });

module.exports = mongoose.model("Post", postSchema);