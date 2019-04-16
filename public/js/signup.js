$(document).ready(function() {
    //VAribles to collect user form inputs
    var signUpForm = $("form.signup");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");

    //Signup is clicked to validate fields are not empty//
    signUpForm.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if(!userData.email || !userData.password) {
            return;
        }

        signUpUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val(""); 
    });

        function signUpUser(email, password) {
            $.post("/api/signup", {
                email: email,
                password: password
            }).then(function(data) {
                window.location.replace(data);
            }).catch(handleLoginErr);
        }
        
        function handleLoginErr(err) {
            $("#alert.msg").text(err.responseJSON);
            $("#alert").fadeIn(500);
        }
    })