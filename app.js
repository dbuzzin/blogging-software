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
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOver("_method"));
app.use(sanitizer());

app.locals = require("./public/js/string-functions");

// mongoose.connect("mongodb://localhost/blogging-software", {useNewUrlParser: true, useFindAndModify: false});
mongoose.connect("mongodb://testdb-358:testdb-358@ds155396.mlab.com:55396/heroku_tb6zrmm8", {useNewUrlParser: true, useFindAndModify: false});

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


app.get("/", (req, res) => {
    res.redirect("/feed")
});



// START SERVER

app.listen(process.env.PORT || 80, (err) => {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Server Started");
    }
});
// app.listen(3000, (err) => {
//     if(err) {
//         console.log("Error: ", err);
//     } else {
//         console.log("Server running on port 3000");
//     }
// });

