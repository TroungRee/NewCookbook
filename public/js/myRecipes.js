


function getUserRecipes(){
  return new Promise(function(resolve,reject) {
      $.post("/getRecipeByUser",null,function(data){
          resolve(data);
      });
   });
}



$(document).ready(function(){
    var Prom1 = getUserRecipes();
    Prom1.then(
        function(result){
            if(result.length != 0){
              $("#emptyScreen").css("display","none");
            }
            for(let i=0;i<result.length;i++){
                $("#recipe"+i).css("display","block");
                $("#title"+i).text(result[i].dish);
                $("#link"+i).attr("href","/show?dish="+result[i].ident);
                $("#image"+i).attr("src", result[i].image);
            }
        }
    );
});
