require('dotenv').config()

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var passport = require('passport');

var indexRouter = require('./routes/index');
var blogRouter = require ("./routes/blogs");
var usersRouter = require('./routes/users');

var authRouter = require('./routes/auth');

var methodOverride= require("method-override");
var expressSanitizer= require("express-sanitizer");
var flash = require("connect-flash");



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
  
app.use(require("express-session")({
  secret: 'oooh so secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());

//allows the app to use ejs. Embedded JavaScript templates
app.set("view engine", "ejs");

//how to serve static files in Express. Allows us to use our custome css stylesheet
app.use(express.static(__dirname+"/public"));
app.use(methodOverride('_method'));
app.use(flash());


//we have currentUser in every template
app.use(function(req,res, next){
    res.locals.currentUser = req.user;  //passes req.user to every template as currentUser
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next(); //move on to the next code. 
});



app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use("/blogs", blogRouter);
app.use('/auth', authRouter);

app.get('*', function(req, res){
  res.render("404")
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The BlogWithAuth server is up");
});