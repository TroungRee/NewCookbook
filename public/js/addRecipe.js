
function createClicked(){
    $.ajax({
      url: "/createRecipe",
      type: "POST",
      data: {dish:$("#dish").val(),ingredients:$("#ingredients").val(),
             directions:$("#directions").val(),category:$("#category").val(),
             image:$("#imageStuff").val().substring(12)},
      dataType: "json"
    });
  return false;
}


$(document).ready(function(){
  $("#addRecipe").click(createClicked);
});
