$(document).ready(function(){
    let searchParams = new URLSearchParams(window.location.search)

    $.post("/getRecipeById",{ident:searchParams.get("dish")}, function(data){
        $("#title").text(data.dish + " by " + data.username);
        $("#ingredients").text(data.ingredients);
        $("#directions").text(data.directions);
        $("#category").text(data.category);
        $("#image").attr("src", data.image);
    });
});
