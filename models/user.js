const mongoose      = require("mongoose"),
      passMongoose  = require("passport-local-mongoose");

      userSchema = new mongoose.Schema({
          email     : String,
          password  : String,
          username  : String,
          blogname  : String,
          firstname : {type: String, default: "Undisclosed"},
          lastname  : {type: String, default: "Undisclosed"},
          sex       : {type: String, default: "Undisclosed"},
          joined    : {type: Date,   default: Date.now},

          posts: [{
              type  : mongoose.Schema.Types.ObjectId,
              ref   : "Post"
          }]
      });

userSchema.plugin(passMongoose);
userSchema.plugin(passMongoose, { usernameField : 'email' });


module.exports = mongoose.model("User", userSchema);