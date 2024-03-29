//Show - show more info
var express = require("express");
var router = express.Router({mergeParams : true});
var Campground = require("../models/campground");
var Comment =  require("../models/comment");
var middleware = require("../middleware");

//comment New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.render("/campgrounds");
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })
});

//comment create
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                     res.redirect("back");
                }
                else{
                    //add username and id to comment
                    console.log("New comment username will be " + req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    })
});

router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campground_id : req.params.id , comment : foundComment});
        }
    });
});

router.put("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment){
        if(err)
            res.redirect("back");
        else
            res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
   
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
            res.redirect("back");
        else
            res.redirect("/campgrounds/" + req.params.id);
    });
});




module.exports = router;