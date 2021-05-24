
const Recipe = require('./Recipe');

let myDatabase = function() {
	this.recipes = [];
}

let recipeIndex = 0;
let index = 0;
myDatabase.prototype.displayRecipes = function() {
	for (let i=0;i<this.recipes.length;i++) {
		console.log(this.recipes[i]);
	}
}

myDatabase.prototype.postRecipe = function(recipe) {
  for (let i=0;i<this.recipes.length;i++) {
    if (this.recipes[i] && this.recipes[i].dish == recipe.dish) {
      return false;
    }
  }

	if(recipe.index >= 4){
			this.recipes[recipeIndex++] = new Recipe(recipe.dish,recipe.ingredients,recipe.directions,recipe.category,recipe.image,recipe.index);
			return true;
	}

//	this.recipes[recipeIndex++] = recipe;
	this.recipes[recipeIndex++] = new Recipe(recipe.dish,recipe.ingredients,recipe.directions,recipe.category,recipe.image,index);
	index++;
	return true;
}

myDatabase.prototype.getRecipeByName = function(dish) {
  for (let i=0;i<this.recipes.length;i++) {
    if (this.recipes[i] && dish == this.recipes[i].dish) {
      return(new Recipe(this.recipes[i].dish,this.recipes[i].ingredients,this.recipes[i].directions,this.recipes[i].category,this.recipes[i].image,this.recipes[i].index));
		}
  }
	return null;
}

myDatabase.prototype.getRecipeByIndex = function(index) {
  for (let i=0;i<this.recipes.length;i++) {
    if (this.recipes[i] && index == this.recipes[i].index) {
      return(new Recipe(this.recipes[i].dish,this.recipes[i].ingredients,this.recipes[i].directions,this.recipes[i].category,this.recipes[i].image,this.recipes[i].index));
		}
  }
	return null;
}

module.exports = myDatabase;
