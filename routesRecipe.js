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
					resolve(identRecipe);
				}
			});
		}
		else {
			identRecipe++;
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
	if (req.isAuthenticated()) {
  		if (req.body.dish == "" || req.body.ingredients == "" || req.body.directions == "" || req.body.category == "" || req.body.image == "") {
  			res.json({retVal:null});
  			return;
  		}

  	  var Prom1 = initIdentRecipe();
  	  Prom1.then(
    	  	function(result) {
        		  if (identRecipe == 0) {
            			res.json({retVal:null});
            			return;
        		  }
        		  let obj = new Recipe(identRecipe,req.user.username,req.body.dish,req.body.ingredients,
                                    req.body.directions,req.body.category,req.body.image);
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

router.post("/getRecipeById",function(req,res){
      var Prom2 = findRecipeById(req.body.ident);
      Prom2.then(
    	  	function(result) {
              if(result == null)
                  res.json({retVal:null});
              res.json(result);
    	    },
    	    function(err) {
      	      console.log("error");
              res.json({retVal:null});
    	    }
  	  );
});



function findRecipeByUser(user){
  return new Promise(function(resolve,reject) {
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


router.post("/getRecipeByUser",function(req,res){
      var Prom3 = findRecipeByUser(req.user.username);
      Prom3.then(
    	  	function(result) {
              for(let i=0;i<result.length;i++) {
                  if(result[i] == null)
                      res.json({retVal:null});
              }
              res.json(result);
    	    },
    	    function(err) {
      	      console.log("error");
              res.json({retVal:null});
    	    }
  	  );
});



function findAllRecipes(){
  return new Promise(function(resolve,reject) {
      RecipeModel.find({},function(err,info){
          if (err) {
              reject(err);
          }
          else {
              resolve(info);
          }
      });
   });
}

router.post("/getAllRecipes",function(req,res){
      var Prom4 = findAllRecipes();
      Prom4.then(
    	  	function(result) {
              if(result == null)
                  res.json({retVal:null});
              res.json(result);
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
    res.redirect("/myRecipes");
    //res.sendFile(__dirname + "/public/html/myRecipes.html");
});

module.exports = router;
