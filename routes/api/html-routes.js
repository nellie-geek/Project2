//Require path for relative routes to HTML files
var path= require("path");

// Require middleware for user logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../../public/signup.html"));
    });

    app.get("login", function(req, res) {

        if (req, res) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../../public/login.html"));
    });

    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../../public/members.html"));
    });
};