let path = require("path");
let express = require("express");
var passport = require("passport");
var formidable = require('formidable');
var mv = require('mv');
//added below for mongo
//var mongoose = require("mongoose");
var RecipeModel = require("./models/Recipe");
var User = require("./models/user");

var Promise = require('promise');


//added above for mongo

//Look at below web page for info on express.Router()
//https://scotch.io/tutorials/learn-to-use-the-new-router-in-expressjs-4
let router = express.Router();




router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

//request is info sending to server from client.
//response is info sending to client from server.


//added below for mongo
const myDatabase = require('./myDatabase');
//added above for mongo
let db = new myDatabase();
const Recipe = require('./Recipe');

var identRecipe = 0;
function initIdentRecipe(){
	return new Promise(function(resolve,reject) {
		if (identRecipe == 0) {
			RecipeModel.find({},function(err,user) {
				console.log("RecipeModel.find()");
				if (err) {
					reject(err);
				}
				else {
					for (let i=0;i<user.length;i++) {
						if (identRecipe < user[i].ident) {
							identRecipe = user[i].ident;
						}
					}
					identRecipe++;
					console.log("identRecipe = " + identRecipe);
					resolve(identRecipe);
				}
			});
		}
		else {
			identRecipe++;
			console.log("identRecipe = " + identRecipe);
			resolve(identRecipe);
		}
	});
}


router.get('/read', function(req, res){
	if (req.isAuthenticated()) {
		return(db.getRecipe(req.user.ident,res));
	}
	else
		res.json(null);
});


router.post('/createRecipe', function(req, res){
  console.log("in post createRecipe");
	if (req.isAuthenticated()) {
  		console.log(req.user.username);
  		console.log(req.body.dish);
  		console.log(req.body.ingredients);
      console.log(req.body.directions);
  		console.log(req.body.category);
  		console.log(req.body.image);

  		if (req.body.dish == "") {
  			res.json({retVal:null});
  			return;
  		}

	    console.log(req.user.username);
  	  var Prom1 = initIdentRecipe();
  	  Prom1.then(
    	  	function(result) {
        			console.log("identRecipe = " + identRecipe);
        		  if (identRecipe == 0) {
            			res.json({retVal:null});
            			return;
        		  }
        		  let obj = new Recipe(identRecipe,req.user.username,req.body.dish,req.body.ingredients,
                                    req.body.directions,req.body.category,req.body.image);
        		  console.log(obj);
        		  console.log("will do db.postRecipe");
        		  return(db.postRecipe(obj,res));
    	    },
    	    function(err) {
      	      console.log("error");
      	      res.json({retVal:null});
    	    }
  	  );
	}
	else
		res.json({retVal:null});
});


function findRecipeById(ident){
  return new Promise(function(resolve,reject) {
<<<<<<< HEAD
=======
      console.log(ident);
      console.log(typeof ident);
>>>>>>> 8c35ab028c0ac381880e9c53e757df4b51ece18f
      RecipeModel.findOne({ident:ident},function(err,info){
          if (err) {
              reject(err);
          }
          else {
              resolve(info);
          }
      });
   });
}

<<<<<<< HEAD
let retRecipe = new Recipe();
router.post("/getRecipeById",function(req,res){
      var Prom2 = findRecipeById(req.body.ident);
      Prom2.then(
    	  	function(result) {
              retRecipe = result.toJSON();
              if(retRecipe == null)
=======
router.post("/getRecipeByIdAndUpdate",function(req,res){
      var Prom2 = findRecipeById(req.body.ident);
      Prom2.then(
    	  	function(result) {
              if(result == null)
>>>>>>> 8c35ab028c0ac381880e9c53e757df4b51ece18f
                  res.json({retVal:null});
              result.image = '/public/images/' + retRecipe.image;
              $.post
    	    },
    	    function(err) {
      	      console.log("error");
              res.json({retVal:null});
    	    }
  	  );
});


<<<<<<< HEAD
function findRecipeByUser(user){
  return new Promise(function(resolve,reject) {
=======

function findRecipeByUser(user){
  return new Promise(function(resolve,reject) {
      console.log(user);
>>>>>>> 8c35ab028c0ac381880e9c53e757df4b51ece18f
      RecipeModel.find({username:user},function(err,info){
          if (err) {
              reject(err);
          }
          else {
              resolve(info);
          }
      });
   });
}

<<<<<<< HEAD
let retRecipeObj = [];
router.post("/getRecipeByUser",function(req,res){
      var Prom3 = findRecipeByUser(req.body.user);
      Prom3.then(
    	  	function(result) {
              for(var i=0;i<result.length;i++){
                  retRecipeObj[i] = result[i].toJSON();
                  if(retRecipeObj[i] == null)
                      res.json({retVal:null});
                  retRecipeObj[i].image = '/public/images/' + result[i].toJSON().image;
              }
              res.json(retRecipeObj);
=======

router.post("/getRecipeByUser",function(req,res){
      var Prom3 = findRecipeByUser(req.body.username);
      Prom3.then(
    	  	function(result) {
              for(let i=0;i<result.length;i++) {
                  if(result[i] == null)
                      res.json({retVal:null});
                  result[i].image = '/public/images/' + result[i].image;
              }
              res.json(result);
>>>>>>> 8c35ab028c0ac381880e9c53e757df4b51ece18f
    	    },
    	    function(err) {
      	      console.log("error");
              res.json({retVal:null});
    	    }
  	  );
});

<<<<<<< HEAD

=======
>>>>>>> 8c35ab028c0ac381880e9c53e757df4b51ece18f
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
