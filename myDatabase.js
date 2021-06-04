

var express = require("express");
var mongoose = require("mongoose");
var Recipe = require("./models/Recipe");

let myDatabase = function() {
}


myDatabase.prototype.postRecipe = function(recipe,res) {
    let obj = {ident:recipe.ident, username:recipe.username, dish:recipe.dish, ingredients: recipe.ingredients,directions:recipe.directions
      ,category:recipe.category,image:recipe.image};
    console.log(recipe);
    Recipe.create(recipe,function(error,info) {
        if (error) {
            return res.json({retVal:false});
        }
        return res.json({retVal:true});
    });
}

myDatabase.prototype.getRecipe = function(ident,res) {
  console.log(ident);
  Recipe.findOne({ident:ident},function(error,info) {

      console.log(info);

      if (error) {
          return res.json({retVal:null});
      }
      else if (info == null) {
          return res.json({retVal:null});
      }

      if (info.length == 1) {
        return res.json({ retVal: new Recipe(ident,info[0].username,info[0].dish,info[0].ingredients,info[0].directions,info[0].category,info[0].image)});
      }
      else
          return res.json({retVal:null});

   });

}


module.exports = myDatabase;
