const mongoose  = require("mongoose"),
      Post      = require("./models/post"),
      User      = require("./models/user");





function seedDB() {

    User.deleteMany({}, err => {
        if(err) {
            console.log("Error: ", err);
        } else {
            console.log("Reset Users");    
            
            Post.deleteMany({}, err => {
                if(err) {
                    console.log("Rest Posts");
                } else {
                    User.create({
                        email       : "email@address.co.uk",
                        password    : "password"
                    }, (err, user) => {
                        if(err) {
                            console.loseedg("Error: ", err);
                        } else {
                            console.log("User Created");
                            
                            Post.create({
                                title   : "Test Post 1",
                                body    : "Test body for Test Post 1"
                            }, (err, post) => {
                                if(err) {
                                    console.log("Error: ", err);
                                } else {
                                    user.posts.push(post);
                                    user.save();
                                    console.log("Added New Post");
                                }
                            });
                        }
                    });  
                }
            });
        }
    }); 
}

module.exports = seedDB;