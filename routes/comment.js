const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");



/*********************
Comment routes
********************/
//
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req,res){
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground});
		}
	})
});



// create new comment and update campground
router.post("/campground/:id/comments",middleware.isLoggedIn,(req,res)=>{
	console.log("reached here");
	//find compground using id
	Campground.findById(req.params.id,(err,campground)=>{
		if(err){
			
			console.log(err);
			req.flash("error","Something went wrong");
			res.redirect("/campgrounds");
		} else{
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					console.log(err);
				} else{
					//add user and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					
					//save the user
					comment.save();
					campground.comments.push(comment);
					campground.save();
					// console.log(comment);
					req.flash("success","you have succesful added the comment!!");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	//create comments
	//link comment to campground
	//redirect to show page	
});


// route Edit comment form
router.get("/campground/:id/comments/:comment_id/edit", middleware.checkCommentOwnership,(req,res)=>{
	Campground.findById(req.params.id,(err,campgroundFound)=>{
		if(err || !campgroundFound){
			req.flash("camground not found");
			res.redirect("back");
		}
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.render("comments/edit", {campground_id : req.params.id, comment: foundComment});
		}
	});
	});
	
	
});

// comment update router
router.put("/campground/:id/comments/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, (err,updatedComment)=>{
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// delete comment router
router.delete("/campground/:id/comments/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;