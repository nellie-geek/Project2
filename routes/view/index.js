//Require path for relative routes to HTML files
var path= require("path");
var router = require("express").Router();
// Require middleware for user logged in
var isAuthenticated = require("./../../config/middleware/isAuthenticated");


    router.get("/", function(req, res) {
        
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../../public/signup.html"));
    });

    router.get("login", function(req, res) {

        if (req, res) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../../public/login.html"));
    });

    router.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../../public/members.html"));
    });
