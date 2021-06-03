var path = require("path");
var express = require("express");
var passport = require("passport");


var User = require("./models/user");

var router = express.Router();
const Recipe = require('./Recipe');

const myDatabase = require('./myDatabase');
//added above for mongo
let db = new myDatabase();


router.get("/",function(req,res){
    console.log("get root");
    let thePath = path.resolve(__dirname,"public/html/login.html");
    res.sendFile(thePath);
});

router.get("/home",function(req,res){
    res.sendFile(__dirname + "/public/html/home.html");
});

router.get("/add",function(req,res){
    res.sendFile(__dirname + "/public/html/addRecipe.html");
});

router.get("/myRecipes",function(req,res){
		res.sendFile(__dirname + "/public/html/myRecipes.html");
});

router.get("/show",function(req,res){
		res.sendFile(__dirname + "/public/html/displayRecipe.html");
});

router.get("/successroot", function(req, res) {
  console.log("get successroot");
	res.json({redirect:"/"});
});

router.get("/failroot", function(req, res) {
  console.log("get failroot");
	res.json({redirect:"/login"});
});

router.get("/successsignup", function(req, res) {
  console.log("get successsignup");
  res.json({redirect:"/home"});
});

router.get("/failsignup", function(req, res) {
  console.log("get failsignup");
	res.json({redirect:"/login"});
});

router.get("/successlogin", function(req, res) {
  console.log("get successlogin");
  res.json({redirect:"/home"});
});

router.get("/faillogin", function(req, res) {
  console.log("get faillogin");
	res.json({redirect:"/login"});
});



router.get("/signup", function(req, res) {
    console.log("get signup");
    initIdent();

  	let thePath = path.resolve(__dirname,"public/html/signup.html");
  	res.sendFile(thePath);
});

router.get("/login", function(req, res) {
    console.log("get login");

  	let thePath = path.resolve(__dirname,"public/html/login.html");
  	res.sendFile(thePath);
});

router.get("/session", function(req, res) {
    console.log("get session");
    if (req.isAuthenticated()) {
  	     let thePath = path.resolve(__dirname,"public/html/session.html");
  	     res.sendFile(thePath);
    }
    else {
        let thePath = path.resolve(__dirname,"public/html/login.html");
        res.sendFile(thePath);
    }
});


var ident = 0;
function initIdent(){
  if (ident == 0) {
    User.find({},function(err,user) {
      if (!err) {
        let objs = [];
        for (let i=0;i<user.length;i++) {
          if (ident < user[i].ident)
            ident = user[i].ident;
        }
      }
    });
  }
}


router.get("/userInfo",function(req,res){
    console.log("top userInfo");
    if (req.isAuthenticated()) {
        console.log("userInfo is auth");
        db.getRecipe(req.user.ident,res);
    }
    else {
        res.json(null);
    }
});

router.get("/logout", function(req, res) {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect("/successroot");
    }
    else {
        res.redirect("/failroot");
    }
});

var recipeInfo = {};


router.post("/signup", function(req, res, next) {
    console.log("post signup");

    var username = req.body.username;
    var password = req.body.password;
    ident++;

    User.findOne({ username: username }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
          req.flash("error", "User already exists");
          return res.redirect("/failsignup");
        }

        var newUser = new User({
          username: username,
          password: password,
          ident: ident
        });
        newUser.save(next);    //this line has to be called.
    });
    }, passport.authenticate("login", {
        successRedirect: "/successsignup",
        failureRedirect: "/failsignup",
        failureFlash: true
}));

router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));



module.exports = router;
