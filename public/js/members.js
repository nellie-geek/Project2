$(document).ready(function() {
    //File to GET request which user is logged in and update HTML accordingly.//
    $.get("api/user_data").then(function(data) {
        $(".member-name").text(data.email);
    });
});