function userClicked(){

    if ($("#username").val() == "" || $("#psw").val() == "") {
      alert("bad signup");
      return false;
    }
    $.post("/signup",{username:$("#username").val(), password:$("#psw").val()},function(data) {
      console.log(data.redirect);
      window.location = data.redirect;
    });

		return false;
}


$(document).ready(function(){

  $("#username").keydown( function( event ) {
      if ( event.which === 13 ) {
        userClicked();
        event.preventDefault();
        return false;
      }
  });

  $("#psw").keydown( function( event ) {
      if ( event.which === 13 ) {
        userClicked();
        event.preventDefault();
        return false;
      }
  });

});
