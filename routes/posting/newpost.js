const express       = require("express"),
      Post          = require("../../models/post"),
      User          = require("../../models/user"),
      auth          = require("../../middleware/auth"),
      EventEmitter  = require("events").EventEmitter,

      messageBus    = new EventEmitter(),
      router        = express.Router();

      messageBus.setMaxListeners(100);

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
                messageBus.emit("message", {
                    type    : "post",
                    content : post,
                    user    : req.user
                });
                res.status(200).end();
            })

            res.redirect(`/posts/${post.created.year}/${post.created.month}/${post.created.day}/${post.title.replace(/\s/g, "-")}`);
        }
    });
});

router.get("/posts/new/notification", (req, res) => {
    let addMessageListener = res => {
        messageBus.once("message", data => {
            res.json(data);
        })
    }
    addMessageListener(res);
})

module.exports = router;