<<<<<<< HEAD
$(document).ready(function(){
    var Prom2 = printRecipe();
    Prom2.then(
        function(result) {
          console.log("IN RESULT");
          console.log(Object.keys(userRecipes).length);
          for(let i=0;i<Object.keys(userRecipes).length;i++){
              $("#title"+i).text(userRecipes[i].dish);
              $("#link"+i).attr("onclick","showRecipe('"+userRecipes[i].dish+"')");
              $("#link"+i).attr("href","/show");

              if(i==1){
                image1.src = userRecipes[i].image;
                console.log("here1");
              }
              else if(i==2){
                image2.src = userRecipes[i].image;
                console.log("here2");
              }
              else if(i==3){
                image3.src = userRecipes[i].image;
                console.log("here3");
              }
              else if(i==4){
                image4.src = userRecipes[i].image;
                console.log("here4");
              }
          }
        },
        function(err) {
            console.log("error");
            res.json({retVal:null});
        }
    );
});


var userRecipes = {};
function printRecipe(){
  return new Promise(function(resolve,reject) {
    $.post("/getRecipeByUser",{user:"fred"},function(data){
        for(let i=0;i<data.length;i++){
            userRecipes[i] = data[i];
        }
        console.log(userRecipes);
        resolve(userRecipes);
    });
  });
}
=======


function showRecipe(dishIdent){
    $.post("/getRecipeByIdAndUpdate",{ident:dishIdent},null);
}

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
                    $("#title"+i).text(userRecipes[i].dish);
                    $("#link"+i).attr("onclick","showRecipe('"+userRecipes[i].ident+"')");
                    $("#link"+i).attr("href","/show");

                    if(i==0){
                      image0.src = userRecipes[i].image;
                      console.log("here0");
                    }
                    else if(i==1){
                      image1.src = userRecipes[i].image;
                      console.log("here1");
                    }
                    else if(i==2){
                      image2.src = userRecipes[i].image;
                      console.log("here2");
                    }
                    else if(i==3){
                      image3.src = userRecipes[i].image;
                      console.log("here3");
                    }
                }
            }
        );
});
>>>>>>> 8c35ab028c0ac381880e9c53e757df4b51ece18f
