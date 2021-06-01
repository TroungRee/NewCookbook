

var express = require("express");
var mongoose = require("mongoose");
var Info = require("./models/Info");
const Recipe = require('./Recipe');

let myDatabase = function() {
}



myDatabase.prototype.postRecipe = function(recipe,res) {
    let obj = {ident:recipe.ident,dish:recipe.dish, ingredients: recipe.ingredients,directions:recipe.directions
      ,category:recipe.category,image:recipe.image
    };
    Info.create(recipe,function(error,info) {
        if (error) {
            return res.json({retVal:false});
        }
        return res.json({retVal:true});
    });
}

myDatabase.prototype.getRecipe = function(ident,res) {
  Info.find({ident:ident},function(error,info) {
      if (error) {
          return res.json({retVal:null});
      }
      else if (info == null) {
          return res.json({retVal:null});
      }

      if (info.length == 1)
      {
        return res.json({ retVal: new Recipe(ident,info[0].dish,info[0].ingredients,info[0].directions,info[0].category,info[0].image       ) });
      }
      else
          return res.json({retVal:null});

   });

}


myDatabase.prototype.putRecipe = function(recipe,res) {
  Info.findOneAndUpdate({ident:recipe.ident},{dish:recipe.dish,ingredients:recipe.ingredients,directions:recipe.directions
,category:recipe.category,image:recipe.image},function(error,oldRecipe) {
    if (error) {
      return res.json({retVal:false});
    }
    else if (oldRecipe == null) {
      return res.json({retVal:false});
    }
    return res.json({retVal:true});
  });

}


myDatabase.prototype.deleteRecipe = function(ident,res) {
    Info.remove({ident:ident},function(error,removed) {
        if (error) {
            return res.json({retVal:false});
        }
        if (removed.result.n == 0)
          return res.json({retVal:false});
        return res.json({retVal:true});
    });
}


module.exports = myDatabase;
