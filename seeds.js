var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Nulla vitae dignissim dolor, et mollis velit. Morbi ac sapien rutrum, fringilla justo gravida, lobortis arcu. Nam lorem nisi, vulputate dapibus malesuada at, iaculis ac velit. Morbi volutpat venenatis facilisis. Cras mollis venenatis sem. Nunc gravida dui et placerat commodo. Donec venenatis vel lectus sed luctus. Duis finibus velit quam, et porta orci congue sed. Nulla euismod mauris et maximus euismod. Proin dui tellus, maximus eu sapien vel, eleifend ultricies nunc. Fusce elit est, pulvinar vitae elementum ut, tempus ac eros. Praesent malesuada, metus id faucibus efficitur, nisi arcu sodales felis, semper maximus turpis eros et ligula. Curabitur sed nulla eget ex consequat efficitur."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Nulla vitae dignissim dolor, et mollis velit. Morbi ac sapien rutrum, fringilla justo gravida, lobortis arcu. Nam lorem nisi, vulputate dapibus malesuada at, iaculis ac velit. Morbi volutpat venenatis facilisis. Cras mollis venenatis sem. Nunc gravida dui et placerat commodo. Donec venenatis vel lectus sed luctus. Duis finibus velit quam, et porta orci congue sed. Nulla euismod mauris et maximus euismod. Proin dui tellus, maximus eu sapien vel, eleifend ultricies nunc. Fusce elit est, pulvinar vitae elementum ut, tempus ac eros. Praesent malesuada, metus id faucibus efficitur, nisi arcu sodales felis, semper maximus turpis eros et ligula. Curabitur sed nulla eget ex consequat efficitur."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Nulla vitae dignissim dolor, et mollis velit. Morbi ac sapien rutrum, fringilla justo gravida, lobortis arcu. Nam lorem nisi, vulputate dapibus malesuada at, iaculis ac velit. Morbi volutpat venenatis facilisis. Cras mollis venenatis sem. Nunc gravida dui et placerat commodo. Donec venenatis vel lectus sed luctus. Duis finibus velit quam, et porta orci congue sed. Nulla euismod mauris et maximus euismod. Proin dui tellus, maximus eu sapien vel, eleifend ultricies nunc. Fusce elit est, pulvinar vitae elementum ut, tempus ac eros. Praesent malesuada, metus id faucibus efficitur, nisi arcu sodales felis, semper maximus turpis eros et ligula. Curabitur sed nulla eget ex consequat efficitur."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
