let mongoose = require("mongoose");


// scema defination
var campgroundScema = new mongoose.Schema({
	name: String,
	price: String,
	url: String,
	description: String,
	author: {
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
		},
		username: String
	},
	comments : [
		{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
});

//model
module.exports = mongoose.model("Campground",campgroundScema);