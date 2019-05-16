const express       = require("express"),
      Post          = require("../../models/post"),
      User          = require("../../models/user"),
      Notification  = require("../../models/notification"),
      auth          = require("../../middleware/auth"),
      events        = require("../handle-notifications")

      router        = express.Router();


router.get("/posts/new", auth.isLogged, (req, res) => {
    
    res.render("posting/newpost", {user: req.user, isAuth: req.isAuthenticated()});
});

router.post("/posts/new", auth.isLogged, (req, res) => {

    let getPost = {
        title   : req.body.post.title.toLowerCase(),
        body    : req.sanitize(req.body.post.body),
        author  : req.user.username,
        blogurl : req.user.blogurl,
        tags    : typeof req.body.post.tags === "undefined" ? undefined : req.body.post.tags.split(",")
    }

    Post.create(getPost, (err, post) => {
        if(err) {
            console.log("Error: ", err);
        } else {
            User.findOne({username: req.user.username}, (err, user) => {
                user.posts.push(post);
                user.save();
                Notification.create({
                    isType    : "Post",
                    origin  : post,
                    url     : `/posts/${post.created.year}/${post.created.month}/${post.created.day}/${post.title.replace(/\s/g, "-")}`,
                    user    : user._id
                }, (err, notif) => {
                    if(err) {
                        console.log("Error: ", err);
                    } else {

                        User.find({_id: {$in: user.followers}}, (err, followers) => {
                            for(let follower of followers) {
                                follower.notifications.push(notif);
                                follower.save();
                            }
                        });
                        events.messageBus.emit("notification", notif);
                        res.status(200).end();
                    }
                });
                
            })

            res.redirect(`/posts/${post.created.year}/${post.created.month}/${post.created.day}/${post.title.replace(/\s/g, "-")}`);
        }
    });
});

module.exports = router;