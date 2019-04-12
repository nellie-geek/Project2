var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

va db = require("../models");

// Telling passport to use Local - email and password 
passport.use(new LocalStrategy(
    {   //User login is email not userName
        usernameField: "email"
    },
    function(email, password, done) {

        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {

            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            } else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
    