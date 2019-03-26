var express = require('express');
var router = express.Router();
var Blog= require("../models/Blog");

var middleware = require("../middleware");

router.get("/", function (req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("blogs/index", {blogs: blogs}); 
        }
    })
});

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("blogs/new");
});

router.post("/", middleware.isLoggedIn, function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    var author = {
        id: req.user._id,
        name: req.user.name,
        displayPic: req.user.displayPic[0]
    };
    req.body.blog.author = author;
   var formData = req.body.blog;
   Blog.create(formData, function(err, newBlog){
       console.log(newBlog);
      if(err){
          res.render("blogs/new");
      } else {
          res.redirect("/blogs");
      }
   });
});

router.get("/:id", function(req, res){
   Blog.findById(req.params.id, function(err, blog){
      if(err){
          res.redirect("/");
      } else {
          res.render("blogs/show", {blog: blog});
      }
   });
});

router.get("/:id/edit", middleware.isLoggedIn,  middleware.checkBlogOwnership, function(req, res){
   Blog.findById(req.params.id, function(err, blog){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
           res.render("blogs/edit", {blog: blog});
       }
   });
});

router.put("/:id", middleware.checkBlogOwnership, function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
       if(err){
           console.log(err);
       } else {
         var showUrl = "/blogs/" + blog._id;
         res.redirect(showUrl);
       }
   });
});


router.delete("/:id", middleware.checkBlogOwnership, function(req, res){
   Blog.findById(req.params.id, function(err, blog){
       if(err){
           console.log(err);
           res.redirect("/");
       } else {
           blog.remove();
           res.redirect("/");
       }
   }); 
});










  module.exports = router;