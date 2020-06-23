let mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment")


let data = [
	{
		name: "First Ground", 
		url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYxQwuzg5LO-FmG2js-qOqihORpioOcEDmlIMTBLBAxDxcDdus&usqp=CAU",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Second Ground", 
		url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYxQwuzg5LO-FmG2js-qOqihORpioOcEDmlIMTBLBAxDxcDdus&usqp=CAU",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Third Ground", 
		url:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYxQwuzg5LO-FmG2js-qOqihORpioOcEDmlIMTBLBAxDxcDdus&usqp=CAU",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

function seedDb(){
	//remove all campgrounds
	Campground.remove({},(err)=>{
		if(err){
			console.log(err);
		}else{
			//console.log("Campgrounds removed");
		}
		
		// add few campgrounds
	// data.forEach((seed)=>{
	// Campground.create(seed,(err,campground)=>{
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 	//	console.log("campground created");
	// 		// comment
	// 		Comment.create({
	// 			text: " This is awesome place but I wish there was Internet",
	// 			author: "Datt"
	// 		},(err,comment)=>{
	// 			if(err){
	// 				console.log(err);
	// 			}else{
	// 				campground.comments.push(comment);
	// 				campground.save();
	// 				//console.log("created new comment");
	// 			}
	// 		});
	// 	}
	// });
// });
	});
	
	

}

module.exports = seedDb;