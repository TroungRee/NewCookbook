var path = require("path");
var express = require("express");
var passport = require("passport");

var Info = require("./models/Info");
var User = require("./models/user");

var router = express.Router();
const Recipe = require('./Recipe');


router.get("/",function(req,res){
    console.log("get root");
    let thePath = path.resolve(__dirname,"public/views/home.html");
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

router.get("/signup", function(req, res) {
    console.log("get signup");
    initIdent();

  	let thePath = path.resolve(__dirname,"public/views/signup.html");
  	res.sendFile(thePath);
});

router.get("/login", function(req, res) {
    console.log("get login");

  	let thePath = path.resolve(__dirname,"public/views/login.html");
  	res.sendFile(thePath);
});

router.get("/session", function(req, res) {
    console.log("get session");
    if (req.isAuthenticated()) {
        if (req.user.username == "admin") {
            let thePath = path.resolve(__dirname,"public/views/adminsession.html");
            res.sendFile(thePath);
        }
        else {
    	     let thePath = path.resolve(__dirname,"public/views/session.html");
    	     res.sendFile(thePath);
        }
    }
    else {
        let thePath = path.resolve(__dirname,"public/views/login.html");
        res.sendFile(thePath);
    }
});

router.get("/adminInfo",function(req,res){
    if (req.isAuthenticated()) {
        if (req.user.username == "admin"){
            initAdmin(req,res);
        }
        else
            res.json(null);
    }
    else {
        res.json(null);
    }
});

function initAdmin(req,res) {
    console.log("initAdmin");
    console.log(req.user.ident);
    console.log(req.user.username);

    Info.find({},function(error,info) {
        if (error) {
          return res.json(null);
        }
        else {
            let list = [];
            for (let i=0;i<info.length;i++) {
                list.push({ident:info[i].ident,name:info[i].name});
            }
            res.json ({ ident:req.user.ident,username: req.user.username,userList:list});
        }
    });
}

router.get("/userInfo",function(req,res){
    console.log("top userInfo");
    if (req.isAuthenticated()) {
        console.log("userInfo is auth");
        db.getStudent(req.user.ident,res);
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

const Recipe = require('./Recipe');
const myDatabase = require('./myDatabase');
let db = new myDatabase();
let serverDb = new myDatabase();
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

//server
router.post('/serverCreate', function(req, res){
	if (req.body.dish == "") {
		res.json({retVal:false});
		return;
	}
	let obj = new Recipe(req.body.dish,req.body.ingredients,req.body.directions,req.body.category,req.body.image,req.body.index);
	res.json({retVal:serverDb.postRecipe(obj)});
});

//client
router.post('/clientCreate', function(req, res){
	if (req.body.dish == "") {
		res.json({retVal:false});
		return;
	}
	let obj = new Recipe(req.body.dish,req.body.ingredients,req.body.directions,req.body.category,req.body.image,req.body.index);
	res.json({retVal:db.postRecipe(obj)});
});


router.post("/updateServerRecipe",function(req,res){
      recipeInfo = serverDb.getRecipeByName(req.body.dish);
      recipeInfo.image = '/public/images/' + recipeInfo.image;
});


router.post("/updateClientRecipe",function(req,res){
      recipeInfo = db.getRecipeByName(req.body.dish);
      recipeInfo.image = '/public/images/' + recipeInfo.image;
});

router.post("/updateRecipePage",function(req,res){
      res.json(recipeInfo);
});


let retRecipe = new Recipe();
router.post("/updateMyRecipes",function(req,res){
      retRecipe = db.getRecipeByIndex(req.body.index);
      if(retRecipe == null) return;
      retRecipe.image = '/public/images/' + retRecipe.image;
      res.json(retRecipe);
});



router.post('/fileupload', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
	      var oldpath = files.filetoupload.path;
	      var newpath = __dirname + '/public/images/' + files.filetoupload.name;
	      mv(oldpath, newpath, function (err) {
		        if (err) throw err;
        });
    });
});


module.exports = router;
