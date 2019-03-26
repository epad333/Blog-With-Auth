

var Blog = require("../models/Blog");




var middlewareObj = {};


middlewareObj.checkBlogOwnership= function(req,res,next){
    if(req.isAuthenticated()){
    
        Blog.findById(req.params.id, function(err, foundBlog){
            if(err || !foundBlog){
                req.flash("error", "Blog not found.");
                res.redirect("back");
            }
            else{
                if(foundBlog.author.id.equals(req.user._id)){
                     next();
                }else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("/blogs/"+ req.params.id);
                }
            
            }  
        });
    
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that.");
    res.redirect("/auth/login");
};



    


module.exports= middlewareObj;