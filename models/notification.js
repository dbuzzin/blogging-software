const mongoose  = require("mongoose"),
      Post      = require("./post"),
      User      = require("./user"),

      notificationSchema = new mongoose.Schema({
          origin        : {
              type      : mongoose.Schema.Types.ObjectId,   // post, comment, blog etc the notification is sent from
              required  : true,
              refPath   : "isType"
          },
          isType        : {
              type      : String,
              required  : true,
              enum      : ["Post", "User"]
          },
          url           : String, // Url of the origin
          user          : String  // Who sent the notification
      });

module.exports = mongoose.model("Notification", notificationSchema);