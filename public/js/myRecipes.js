

var userRecipes = [];
function setUserRecipes(){
  return new Promise(function(resolve,reject) {
      $.post("/getRecipeByUser",{username:"bob"},function(data){
          userRecipes = data;
          resolve();
      });
   });
}



$(document).ready(function(){
    var Prom1 = setUserRecipes();
    Prom1.then(
        function(result){
            for(let i=0;i<userRecipes.length;i++){
                $("#recipe"+i).css("display","block");
                $("#title"+i).text(userRecipes[i].dish);
                $("#link"+i).attr("href","/show?dish="+userRecipes[i].ident);
                $("#image"+i).attr("src", userRecipes[i].image);
            }
        }
    );
});
