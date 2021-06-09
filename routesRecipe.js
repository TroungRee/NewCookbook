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

router.post("/updateRecipePage",function(req,res){
      res.json(retRecipe);
});


function findRecipeById(ident){
  return new Promise(function(resolve,reject) {
      console.log(ident);
      console.log(typeof ident);
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

let retRecipe = new Recipe();
router.post("/getRecipeById",function(req,res){
      var Prom2 = findRecipeById(req.body.ident);
      Prom2.then(
    	  	function(result) {
              retRecipe = result;
              if(retRecipe == null)
                  res.json({retVal:null});
              retRecipe.image = '/public/images/' + retRecipe.image;
              res.json(retRecipe);
    	    },
    	    function(err) {
      	      console.log("error");
              res.json({retVal:null});
    	    }
  	  );
});



function findRecipeByUser(user){
  return new Promise(function(resolve,reject) {
      console.log(user);
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

let returnArray = [];
router.post("/getRecipeByUser",function(req,res){
      var Prom3 = findRecipeByUser(req.body.username);
      Prom3.then(
    	  	function(result) {
              console.log(result);
              returnArray = result;

              for(let i=0;i<returnArray.length;i++) {
                  if(returnArray[i] == null)
                      res.json({retVal:null});
                  returnArray[i].image = '/public/images/' + returnArray[i].image;
              }

              res.json(returnArray);
    	    },
    	    function(err) {
      	      console.log("error");
              res.json({retVal:null});
    	    }
  	  );
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
