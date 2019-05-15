const   mongoose      = require("mongoose"),
        passMongoose  = require("passport-local-mongoose");

        userSchema = new mongoose.Schema({
            email           : String,
            password        : String,
            username        : String,
            blogurl         : String,
            firstname       : {type: String, default: "Undisclosed"},
            lastname        : {type: String, default: "Undisclosed"},
            sex             : {type: String, default: "Undisclosed"},
            joined          : {type: Date,   default: Date.now},

            posts           : [{
                type        : mongoose.Schema.Types.ObjectId,
                ref         : "Post"
            }],

            likes           : [{
                type        : mongoose.Schema.Types.ObjectId,
                ref         : "Post"
            }],

            dislikes        : [{
                type        : mongoose.Schema.Types.ObjectId,
                ref         : "Post"
            }],

            followers       : [{
                type        : mongoose.Schema.Types.ObjectId, // Users who are following this user's blog
                ref         : "User"
            }],
            
            following       : [{
                type        : mongoose.Schema.Types.ObjectId, // Blogs this user in following
                ref         : "User"
            }],

            notifications   : [{
                type        : mongoose.Schema.Types.ObjectId,
                ref         : "Notification"
            }]
      });

userSchema.plugin(passMongoose);
userSchema.plugin(passMongoose, { usernameField : 'email' });


module.exports = mongoose.model("User", userSchema);