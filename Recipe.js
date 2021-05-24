
let Recipe = function(dish,ingredients,directions,category,image,index) {
  	this.dish = dish;
  	this.ingredients = ingredients;
  	this.directions = directions;
  	this.category = category;
    this.image = image;
    this.index = index;
}

module.exports = Recipe;
