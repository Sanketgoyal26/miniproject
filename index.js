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
    res.render("home_2",{user: req.user});
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
app.get('/zurich', isLoggedIn, function(req, res)
{
    res.render('zurich',{user:req.user})
})
app.get('/shimla', isLoggedIn, function(req, res)
{
    res.render('shimla')
})
app.get('/ooty', isLoggedIn, function(req, res)
{
    res.render('ooty')
})
app.get('/munnar', isLoggedIn, function(req, res)
{
    res.render('munnar')
})
app.get('/srinagar', isLoggedIn, function(req, res)
{
    res.render('srinagar')
})
app.get('/dalhousie', isLoggedIn, function(req, res)
{
    res.render('dalhousie')
})
app.get('/andaman', isLoggedIn, function(req, res)
{
    res.render('andaman')
})
app.get('/bali', isLoggedIn, function(req, res)
{
    res.render('bali')
})
app.get('/bankok', isLoggedIn, function(req, res)
{
    res.render('bankok')
})
app.get('/goa', isLoggedIn, function(req, res)
{
    res.render('goa')
})
app.get('/hongkong', isLoggedIn, function(req, res)
{
    res.render('hongkong')
})
app.get('/levi', isLoggedIn, function(req, res)
{
    res.render('levi')
})
app.get('/maldives', isLoggedIn, function(req, res)
{
    res.render('maldives')
})
app.get('/mauritius', isLoggedIn, function(req, res)
{
    res.render('mauritius')
})
app.get('/hallstatt', isLoggedIn, function(req, res)
{
    res.render('hallstatt')
})

app.get('/payment', isLoggedIn, function(req, res)
{
    res.render('payment')
})
app.get('/payment/thanks', isLoggedIn, function(req, res)
{
    res.render('thanks')
})

app.get('/last', function(req, res)
{
    res.render('last')
})
app.get('/profileedit', isLoggedIn, function(req, res)
{
    res.render('profileedit',{user: req.user})
})
app.get('/profile', isLoggedIn, function(req, res)
{
    res.render('profile',{user: req.user})
})
app.get('/login', function(req, res)
{
    res.render('login')
})

app.post("/profileedit",function(req, res){
    var id=req.user._id
    if((req.body.gender != req.user.gender) && (req.body.gender != null)){
    var gender=req.body.gender
    User.updateOne({'_id':id},{$set:{'gender': gender}},function(err, res){
        if(err){ throw err}
        console.log("gender updated")
    })
}
else if(req.body.gender == null){
    console.log("gender not changed")
}
if((req.body.dob != req.user.dob) && (req.body.dob != null)){
    var dob=req.body.dob
    User.updateOne({'_id':id},{$set:{'dob': dob}},function(err, res){
        if(err){ throw err}
        console.log("dob updated")
    })      
}
else if(req.body.dob == null){
    console.log("dob not changed")
}
if((req.body.address != req.user.address) && ((req.body.address != null) || (req.body.address != ''))){
    var address=req.body.address
    User.updateOne({'_id':id},{$set:{'address': address}},function(err, res){
        if(err){ throw err}
        console.log("address updated")
    })
}
else if(req.body.address == null){
    console.log("address not changed")
}
if((req.body.mobile != req.user.mobile) && (req.body.mobile != null)){
    var mobile=req.body.mobile
    User.updateOne({'_id':id},{$set:{'mobile': mobile}},function(err, res){
        if(err){ throw err}
        console.log("mobile updated")
    })
}
else if(req.body.mobile == null){
    console.log("mobile not changed")
}
if((req.body.country != req.user.country) && (req.body.country != null)){
    var country=req.body.country
    User.updateOne({'_id':id},{$set:{'country': country}},function(err, res){
        if(err){ throw err}
    })
}
else if(req.body.country == null){
    console.log("country not changed")
}
if((req.body.bio != req.user.bio) && ((req.body.bio != '') || (req.body.bio != null))){
    var bio=req.body.bio
    User.updateOne({'_id':id},{$set:{'bio': bio}},function(err, res){
        if(err){ throw err}
        console.log("bio updated")
    })
}
else if(req.body.bio == null || req.body.bio == ''){
    console.log("bio not changed")
}
        console.log(req.user)
        console.log(req.body.gender)
        console.log(req.user.gender)
    res.redirect("/profile")
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



