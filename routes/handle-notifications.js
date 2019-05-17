const express       = require("express"),
      EventEmitter  = require("events").EventEmitter,
      auth          = require("../middleware/auth"),
      Notification  = require("../models/notification"),

      router        = express.Router(),
      messageBus    = new EventEmitter();

messageBus.setMaxListeners(100);

router.get("/requests/handle-notifications", auth.isLogged, (req, res) => {
    const addMessageListener = res => {
        messageBus.once("notification", data => {
            res.json(data);
        });
    }
    addMessageListener(res);
});

router.get("/requests/get-notification-data", auth.isLogged, (req, res) => {
    Notification.find({user: {$in: req.user.following}})
        .populate("origin").exec((err, notif) => {
            if(err) {
                console.log("Error: ", err);
            } else {
                let userNotifs = [];
                for(let getNotif of notif){
                    if(req.user.following.indexOf(getNotif.user) !== -1) {
                        userNotifs.push(getNotif);
                    }
                }
                // console.log(userNotifs)
                res.json(userNotifs);
            }
        })
});

router.put("/requests/handle-notifications", auth.isLogged, (req, res) => {
    for(let notification of req.body) {
        Notification.findByIdAndUpdate(notification._id, {new: false}).then((err, notif) => {
            if(err) {
                console.log("Error: ", err)
            }
        })
    }
})

exports.router      = router;
exports.messageBus  = messageBus;
