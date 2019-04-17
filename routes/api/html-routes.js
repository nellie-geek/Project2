//Require path for relative routes to HTML files
var path = require("path");
var db = require("../../models");

// Require middleware for user logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {

        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "../../public/signup.html"));
        });

        app.get("/login", function (req, res) {
            res.sendFile(path.join(__dirname, "../../public/login.html"));
        });

        app.get("/posts", function (req, res) {
            res.render("posts");
        });

        app.get("/posts/tag/:tag", function (req, res) {
            var postsArr = [];
            db.Florida_man.findAll({
                where: {
                    meta_tag1: req.params.tag
                }
            }).then(function (posts) {
                for (var i = 0; i < posts.length; i++) {
                    postsArr.push(posts[i]);
                }
            });

            db.Florida_man.findAll({

                where: {
                    meta_tag2: req.params.tag
                }
            }).then(function (posts) {
                for (var i = 0; i < posts.length; i++) {
                    postsArr.push(posts[i])
                }
                res.render("posts", {
                    posts: postsArr
                });
            });
        })
        app.get("/posts/all", function (req, res) {
                db.Florida_man.findAll({}).then(function (posts) {
                    res.render("posts", {
                        posts: posts
                    });
                });


            });
        };


