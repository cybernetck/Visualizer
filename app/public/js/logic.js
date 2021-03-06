$(document).ready(function() {
  

  //////----------------EXISTING USER---------------//////
  $('#existingUserLogin').on("submit", function(){
    event.preventDefault();

    var existingUser = {
      username: $("#existingUsername").val().trim(),
      password: $("#existingPassword").val().trim()
    };
    
    validateUser(existingUser);
  });

    var validateUser = function (existingUser){
        $.post("api/existingUsers", existingUser)
            .then(function (data) {
                if (data){
                    loggedIn = true;
                    isAnimating = true;
                    name = data.username;
                    keypress = data.displayPreference;
                    volumePref = data.volumeLevel;
                    $('#existingUserModal').modal('hide');
                    $('#username').text("Welcome " + name);
                    loadVisuals(keypress);
                } else {
                    $(".error").text("Either your username or password is incorrect. Please try again!");
                    $("#existingUsername").val("");
                    $("#existingPassword").val("");
                }
            });
    }
  


  //////----------------NEW USER---------------//////
    $("#newUserLogin").on("submit", function() {
      event.preventDefault();

      var newUser = {
        username: $("#newUsername").val().trim(),
        password: $("#newPassword").val().trim(),
      };

        createUser(newUser);
    });

      var createUser = function(newUser){
        $.post("api/createNew", newUser, function (data){
            if (data){
              loggedIn = true;
              isAnimating = true;
              name = data.username;
              keypress = data.displayPreference;
              volumePref = data.volumeLevel;
              $('#newUserModal').modal('hide');
              $('#username').text("Welcome " + name);
            
            } else {
              $(".error").text("A user already exists with that name. Try again!");
              $("#newUsername").val("");
              $("#newPassword").val("");
            }
        });  
      }


//closes the document ready function
});
