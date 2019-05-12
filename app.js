// INIT REQUIRED PACKAGES/FILES

const express       = require("express"),
      mongoose      = require("mongoose"),
      bodyParser    = require("body-parser"),
      methodOver    = require("method-override"),
      sanitizer     = require("express-sanitizer");
      seedDB        = require("./seeds");

require("dotenv").config();



// INIT APP

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOver("_method"));
app.use(sanitizer());

app.locals = require("./public/js/string-functions");

if(process.env.NODE_ENV === "dev") {
    mongoose.connect("mongodb://localhost/blogging-software", {useNewUrlParser: true, useFindAndModify: false});
} else if(process.env.NODE_ENV === "dep") {
    mongoose.connect(`${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds155396.mlab.com:55396/${process.env.DB_NAME}`, {useNewUrlParser: true, useFindAndModify: false});
}

// seedDB();





// Models

const Post = require("./models/post"),
      User = require("./models/user");





// ROUTES

app.use(require("./routes/landing"));

// Posting
app.use(require("./routes/posting/newpost"));
app.use(require("./routes/posting/viewpost"));
app.use(require("./routes/posting/editpost"));
app.use(require("./routes/posting/deletepost"));
app.use(require("./routes/posting/likepost"));

// Searching
app.use(require("./routes/searching/search"));

// Users
app.use(require("./routes/users/register"));


app.get("/", (req, res) => {
    res.redirect("/feed")
});



// START SERVER

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Server Started");
    }
});

