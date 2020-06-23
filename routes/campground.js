const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


//Route to show form to create new campground
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

// Post route to redirect form to create new campgrounds
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	// receive data from form
	var name = req.body.name;
	var price = req.body.price;
	var url = req.body.url;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var camp = {name: name, price: price, url:url, description:desc, author: author};
	
	// put data in database
	Campground.create(camp,function(err,campground){
		if(err){
			console.log(err);
		}else{
			console.log(campground);
			res.redirect("/campgrounds");
		}
	});
	
});
// Route to show campgrounds to the user
router.get("/campgrounds",(req,res)=>{
		//get all data from database
		Campground.find({},function(err, campgrounds){
			if(err){
			console.log(err);
			}else{
				res.render("campgrounds/index",{campgrounds : campgrounds});
			}
		});
	});


//Show - show single campground to the user /campground:id
router.get("/campgrounds/:id",(req,res)=>{
	//get the id of the specific campgrounds
	Campground.findById(req.params.id).populate("comments").exec((err,campgroundfound)=>{
		if(err || !campgroundfound){
			req.flash("error","campground not found");
			console.log(err);
			res.redirect("back");
		}else{
			//console.log(campgroundfound);
			// render the campground with id
			res.render("campgrounds/show",{campground:campgroundfound});
		}
	});
	
});

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
	
	Campground.findById(req.params.id,(err,foundCampground)=>{
    res.render("campgrounds/edit", {campground : foundCampground});
	});
});

// Update Campground route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,(req,res)=>{
	//find and update the campgrounds
	Campground.findByIdAndUpdate(req.params.id, req.body.campground,(err,updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});

});

// Destroy Campground router
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,(req,res)=>{
	// if(err){
	// 	res.redirect("/campgrounds");
	// }
	Campground.findByIdAndRemove(req.params.id,(err)=>{
		if(err) {
			console.log(err);
			//res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});

});









module.exports = router;