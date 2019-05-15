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
                res.json(notif);
            }
        })
});

exports.router      = router;
exports.messageBus  = messageBus;
