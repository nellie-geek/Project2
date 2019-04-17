var db = require("../models");

module.exports = {

    create: function (req, res) {
        for (let i = 0; i < fldc.length; i++) {
            db.Florida_man.create().then(function (newUser) {
                res.json(newUser);
            });
        }
    },
};