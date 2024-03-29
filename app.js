var express        = require("express"),
    app            = express(),
   // request        = require("request"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require('connect-flash'),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
  //  Campground     = require("./models/campground"),
    User           = require("./models/user"),
 //   Comment        = require("./models/comment"),
 //   seedDB         = require("./seeds"),
    methodOverride = require("method-override");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campground"),
    indexRoutes        = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v10";
mongoose.connect(url);

//mongoose.connect("mongodb://localhost/yelp_camp");
//mongoose.connect("mongodb://Sameer:YelpPass@ds131742.mlab.com:31742/yelpcamp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//Passport configuration
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "XlC4utIPM8hxZ-aw52x0dz5DMQD1M5wQ",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started");
});

