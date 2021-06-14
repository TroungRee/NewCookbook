
let Recipe = function(ident,username,dish,ingredients,directions,category,image) {
    this.ident = ident;
    this.username = username;
  	this.dish = dish;
  	this.ingredients = ingredients;
  	this.directions = directions;
  	this.category = category;
    this.image = '/public/images/' + image;
}

module.exports = Recipe;
