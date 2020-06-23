const	Campground 		= require("../models/campground"),
		Comment 		= require("../models/comment");

const middleware = {};
// middleware to check comment ownership
middleware.checkCommentOwnership = function(req,res,next){
		if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
		if(err){
			req.flash("error","comment doesn't exist");
			res.redirect("back");
		}else{
			if(foundComment.author.id.equals(req.user._id)){
				next();
			} else{
				req.flash("error","you don't have permission to do so!");
				res.redirect("back");
			}
		}
	});
		}else{
			//console.log("login please");
			req.flash("error","you need to be logged in to do so");
			res.redirect("back");
		}
}

// middleware
middleware.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that!");
	res.redirect("/login");
}

//middleware to check the ownership of the campgroundss
middleware.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
			Campground.findById(req.params.id,(err,foundCampground)=>{
				if(err || !foundCampground) { // handeling null return form mongo. 
							req.flash("error","Campground not found!");
							res.redirect("back");
				} else {
							//check authorization if logged in user is same as author
					if(foundCampground.author.id.equals(req.user._id)){
						next();
					} else {
						req.flash("You don't have permission to do so");
						res.redirect("back");
					}
				}
						
					});
					
	}else {
		req.flash("error","You need to be logged in to do so");
		res.redirect("back");
	}	

}

module.exports = middleware;