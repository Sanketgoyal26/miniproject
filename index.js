var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
const express = require('express');

var app=express()

mongoose.connect("mongodb://localhost/tours_and_travel", function(err, db){
    if(!(err)){console.log("Connected to the database")}
}
);

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"Rusty is the best og in the world",
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs')
app.get('/', function(req, res)
{
    res.render('home')
})

app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/home_2', isLoggedIn, function(req, res) {
    res.render("home_2",{name: req.user.name});
});



app.get('/signup', function(req, res)
{
    res.render('signup')
})

app.get('/tourpackages', isLoggedIn, function(req, res)
{
    res.render('tourpackages')
})

app.get('/singapore', isLoggedIn, function(req, res)
{
    res.render('singapore')
})

app.get('/mtpilatus', isLoggedIn, function(req, res)
{
    res.render('mtpilatus')
})

app.get('/innsbruck', isLoggedIn, function(req, res)
{
    res.render('innsbruck')
})
app.get('/newyork', isLoggedIn, function(req, res)
{
    res.render('newyork')
})

app.get('/sydney', isLoggedIn, function(req, res)
{
    res.render('sydney')
})
app.get('/login', function(req, res)
{
    res.render('login')
})

app.post("/signup", function (req, res) {
    User.register(new User({ name : req.body.name,username:req.body.username, email: req.body.email}),req.body.password,  function (err, user) {
        if (err) {
            console.log(err);
            return res.render('signup');
        } //user stragety
        passport.authenticate("local")(req, res, function () {
            res.redirect("/home_2"); //once the user sign up
        });
    });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/home_2",
    failureRedirect: "/login"
}), function (req, res) {
    res.send("User is " + req.user.id);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/home_2");
}
app.listen(4000, function(req,res)
{
    console.log("Server started at port 4000....")
})



