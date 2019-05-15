const mongoose          = require("mongoose"),
      Post              = require("./models/post"),
      User              = require("./models/user"),
      Notification      = require("./models/notification");


function seedDB() {

    User.deleteMany({}, err => {
        if(err) {
            console.log("Error: ", err);
        } else {
            console.log("Reset Users");    
            Post.deleteMany({}, err => {
                if(err) {
                    console.log("Error: ", err);
                } else {
                    console.log("Reset Posts");
                    Notification.deleteMany({}, err => {
                        if(err) {
                            console.log("Error: ", err);
                        } else {
                            console.log("Reset Notifications");
                            User.register(new User({
                                username    : "admin",
                                blogurl     : "admin",
                                email       : "admin@email.com",
                            }), "password", (err, user) => {
                                if(err) {
                                    console.log("Error: ", err);
                                } else {
                                    console.log("User Created");
                                }
                            });
                            User.register(new User({
                                username    : "user",
                                blogurl     : "user",
                                email       : "user@email.com",
                            }), "password", (err, user) => {
                                if(err) {
                                    console.log("Error: ", err);
                                } else {
                                    console.log("User Created");
                                }
                            });
                        }
                    })
                }
            });
        }
    }); 
}

module.exports = seedDB;