
function createClicked(){

    $.ajax({
      url: "/clientCreate",
      type: "POST",
      data: {dish:$("#dish").val(),ingredients:$("#ingredients").val(),
             directions:$("#directions").val(),category:$("#category").val(),
             image:$("#imageStuff").val().substring(12), index:0},
      dataType: "json"
    });
  return false;
}


$(document).ready(function(){
  $("#addRecipe").click(createClicked);
});
