// INIT REQUIRED PACKAGES/FILES

const express       = require("express"),
      mongoose      = require("mongoose"),
      bodyParser    = require("body-parser"),
      methodOver    = require("method-override"),
      sanitizer     = require("express-sanitizer");
      seedDB        = require("./seeds");





// INIT APP

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOver("_method"));
app.use(sanitizer());

app.locals = require("./public/js/string-functions");

mongoose.connect("mongodb://localhost/blogging-software", {useNewUrlParser: true, useFindAndModify: false});

// seedDB();





// Models

const Post = require("./models/post"),
      User = require("./models/user");





// ROUTES

app.use(require("./routes/landing"));
app.use(require("./routes/newpost"));
app.use(require("./routes/viewpost"));
app.use(require("./routes/editpost"));
app.use(require("./routes/deletepost"));





// START SERVER

app.listen(3000, (err) => {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Server running on port 3000");
    }
});

