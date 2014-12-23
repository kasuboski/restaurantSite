Template.signin.events({
    'submit #login-form' : function(e,t) {
        e.preventDefault();

        var user = t.find('#inputUsername').value, password = t.find('#inputPassword').value;

        Meteor.loginWithPassword(user, password, function(err){
            if (err) {
                // The user might not have been found, or their passwword
                // could be incorrect. Inform the user that their
                // login attempt has failed.
                $(".error").text("Your username or password was not found");
                $(".error").show();
            } else {
                // The user has been logged in.
                Router.go('/dashboard');
            }
        });
        return false;
    }
});
