

var mongoose = require("mongoose");
mongoose.set("debug",true);

//Schema is a decription (the definition) of the mongoDB document.
var recipeSchema = mongoose.Schema({
	ident: {
		required: true,
		unique: true,
		type:String
	},
	username: String,
	dish: String,
	ingredients: String,
	directions: String,
	category: String,
	image: String
});

var Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
