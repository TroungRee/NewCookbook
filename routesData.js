let path = require("path");
let express = require("express");
var passport = require("passport");
var formidable = require('formidable');
var mv = require('mv');
//added below for mongo
//var mongoose = require("mongoose");
var Info = require("./models/Info");
var User = require("./models/user");

//added above for mongo

//Look at below web page for info on express.Router()
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
let router = express.Router();

//added below for mongo
const myDatabase = require('./myDatabase');
//added above for mongo
let db = new myDatabase();
const Recipe = require('./Recipe');


router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

//request is info sending to server from client.
//response is info sending to client from server.




router.get('/read', function(req, res){
	if (req.isAuthenticated()) {
		return(db.getRecipe(req.user.ident,res));
	}
	else
		res.json(null);
});

var ident = 0;
router.post('/create', function(req, res){

	if (req.isAuthenticated()) {
  		if (req.body.name == "") {
  			res.json(null);
  			return;
  		}

  		if (req.user.username == "admin") {
  			res.json(null);
  			return;
  		}

  		console.log(req.body.dish);

      //added below for mongo
    	let obj = new Recipe(ident,req.user.username,req.body.dish,req.body.ingredients,
    		    req.body.directions,req.body.category,req.body.image);

      ident ++;
  		return(db.postRecipe(obj,res));

  	}
  	else
  		res.json(null);
});


router.put('/update', function(req, res){

	if (req.isAuthenticated()) {
		if (req.body.name == "") {
  			res.json(null);
  			return;
		}
     //added below for mongo
	   let obj = new Recipe(req.user.ident,req.user.username,req.body.dish,req.body.ingredients,
       req.body.directions,req.body.category,req.body.image);
		 return(db.putRecipe(obj,res));
	}
	else
		res.json(null);
});


router.post("/updateRecipePage",function(req,res){
      res.json(recipeInfo);
});


let retRecipe = new Recipe();
router.post("/updateMyRecipes",function(req,res){
      retRecipe = db.getRecipe(req.body.ident);
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
