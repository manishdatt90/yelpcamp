var express    		= require("express"),
	app        		= express(),
	mongoose   		= require("mongoose"),
	bodyParser 		= require("body-parser"),
	passport   	  	= require("passport"),
	localStrategy 	= require("passport-local"), 
	methodOverride  = require("method-override"),
	flash			= require("connect-flash"),
	Campground 		= require("./models/campground"),
	Comment 		= require("./models/comment"),
	User    		= require("./models/user"),
	seedDb 			= require("./seeds")

const commentRoutes    = require("./routes/campground"),
	  campgroundRoutes = require("./routes/comment"),
	  indexRoutes      = require("./routes/index")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.set('useUnifiedTopology', true);
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
	secret: "manish datt is the one of the best after God",
	resave: false,
	saveUninitialized: false
}));

//middleware
app.use(function(req, res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//routes file

mongoose.connect("mongodb://localhost:27017/yelp_camp_11d",{useNewUrlParser: true});

// seedDb(); // use to seed the DB


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// can use alternate to short route which are same eg : app.use("/campground", campgroundRoutes); have to use {mergeParams: true} in express.Router(); eg : express.Router({mergeParams: true}) for accessing params. 


// //create campground
// Campground.create(
// 	{
// 		name: "First Ground", 
// 		url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYxQwuzg5LO-FmG2js-qOqihORpioOcEDmlIMTBLBAxDxcDdus&usqp=CAU",
// 		description:"This is first bootcamp with no water and no bathrooms"
// 	}, function(err,campground){
// 	if(err){
// 		console.log("Error is");
// 		console.log(err);
// 	} else{
// 	console.log("New campground");
// 	console.log(campground);
// 	}
// });



app.listen(process.env.PORT, function(){
	console.log("Server started at 3000");
});
// //array of campground 
// var campgrounds = [
// 		{Name: "First Ground", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYxQwuzg5LO-FmG2js-qOqihORpioOcEDmlIMTBLBAxDxcDdus&usqp=CAU"},
// 		{Name: "Second Ground", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSeDe2QWwL8v3gHwR4cuoIqrWKMWgGnBXDkBZzRgpzXr-7C5Fx&usqp=CAU"},
// 		{Name: "Third Ground", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8UtHVr0h_CebK7Np9OdIKXBcsLsKFFbwMBeN6k9E_1Eq7su4v&usqp=CAU"},
// 	{Name: "First Ground", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYxQwuzg5LO-FmG2js-qOqihORpioOcEDmlIMTBLBAxDxcDdus&usqp=CAU"},
// 		{Name: "Second Ground", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTSeDe2QWwL8v3gHwR4cuoIqrWKMWgGnBXDkBZzRgpzXr-7C5Fx&usqp=CAU"},
// 		{Name: "Third Ground", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8UtHVr0h_CebK7Np9OdIKXBcsLsKFFbwMBeN6k9E_1Eq7su4v&usqp=CAU"}
// 	];









