var express = require("express");
var router = express.Router();
var formidable = require('formidable');
var mv = require('mv');




//var addRecipe = require("/public/js/addRecipe.js");
//console.log(addRecipe);
router.get("/",function(req,res){
    //addRecipe.testing();

    res.sendFile(__dirname + "/public/html/home.html");
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



const Recipe = require('./Recipe');
const myDatabase = require('./myDatabase');
let db = new myDatabase();
let serverDb = new myDatabase();
var recipeInfo = {};




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
