//Show - show more info
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/",function(req,res){
   Campground.find({},function(err,allcampgrounds){
       if(err)
            console.log(err)
        else
            res.render("campgrounds/index",{campgrounds:allcampgrounds})
   });
    //res.render("campgrounds", {campgrounds:campgrounds});
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username : req.user.username
    }
    var newCampground = {name : name, image:image , description:description , author : author};
    //Create new campground and save to dB
   
        Campground.create(newCampground,function(err,newlyCreated){
            if(err)
                console.log(err);
            else
                res.redirect("/campgrounds");
        });
    });


router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new")
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("can't find ")
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//Edit
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){
       Campground.findById(req.params.id, function(err, foundCampground){
        if(err)
            console.log(err);
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});



//Put router changes comment
router.put("/:id",function(req,res){

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
            if(err)
                res.redirect("/campgrounds");
            else {
                res.redirect("/campgrounds/" + req.params.id);
            }
    });
});

//destroy
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;