$(document).ready(function(){

  function setAllRecipes(){
    return new Promise(function(resolve,reject) {
        $.post("/getAllRecipes",null,function(data){
            resolve(data);
        });
     });
  }



  $(document).ready(function(){
      var Prom1 = setAllRecipes();
      Prom1.then(
          function(result){
              console.log(result);
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

});
