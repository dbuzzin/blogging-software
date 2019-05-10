const mongoose = require("mongoose"),

      userSchema = new mongoose.Schema({
          email     : String,
          password  : String,
          username  : {type: String, default: this.email},
          firstname : {type: String, default: "Undisclosed"},
          lastname  : {type: String, default: "Undisclosed"},
          sex       : {type: String, default: "Undisclosed"},
          joined    : {type: Date,   default: Date.now},

          posts: [{
              type  : mongoose.Schema.Types.ObjectId,
              ref   : "Post"
          }]
      });

module.exports = mongoose.model("User", userSchema);