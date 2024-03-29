var Comment = require("../models/comment");
var Campground = require("../models/campground");
var middlewareObj = {};

middlewareObj.checkCommentsOwnership = function(req,res,next){
    //check if user is logged in 
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){ // find comment
            if(err){
                req.flash("error","Comment not found");
                res.redirect("back");
            }
            else{ // if comment found
                //check if user owns comment 
                if(foundComment.author.id.equals(req.user._id)){
                    next();
        
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } 
    else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
};


middlewareObj.checkCampgroundOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else{
                //check if user owns campground 
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
        
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } 
    else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;