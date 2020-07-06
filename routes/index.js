const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// landing page route
router.get("/",(req,res)=>{
	//res.render("landing");
	res.redirect("/campgrounds");
});

//routes

//register route 
router.get("/register",(req,res)=>{
	res.render("register");	
});

//route to handle register request
router.post("/register",(req,res)=>{
	const newUser = new User({username :req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err) {
			req.flash("error", err.message);
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
									   req.flash("success","Welcome to yelpCamp" + user.username);
									   res.redirect("/campgrounds");
									   });		
	});
});


//route to show login form
router.get("/login",(req,res)=>{
	res.render("login");
});

// handle login request
router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	}),(req,res)=>{
	
});

//logout
router.get("/logout",(req,res)=>{
	req.logout(); 
	req.flash("success","You are LoggedOut");
	res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;