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
                                title   : "Test Post 1".toLowerCase(),
                                body    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar elementum. Aliquam etiam erat velit scelerisque in dictum non. Tristique senectus et netus et malesuada fames ac turpis. Bibendum est ultricies integer quis auctor elit sed vulputate. Turpis egestas integer eget aliquet. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Id ornare arcu odio ut sem nulla. Est sit amet facilisis magna etiam tempor orci eu. Faucibus turpis in eu mi bibendum neque egestas congue quisque. Suscipit tellus mauris a diam maecenas sed enim ut. Bibendum neque egestas congue quisque egestas diam. Mi ipsum faucibus vitae aliquet. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu."
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