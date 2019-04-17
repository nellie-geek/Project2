var db = require("./../models");
// var fldc = require("./../scrapers/fmdc-scraper");


module.exports = {

    // create: function (req, res) {
    //     for (let i = 0; i < fldc.length; i++) {
    //         db.Florida_man.bulkCreate(fldc).then(function (newPost) {
    //             res.json(newPost);
    //         });
    //     }
    // },

    findByTag: function (req, res) {

        db.Florida_man.findAll({
            where: {
                meta_tag: req.body
            }

        })
    },

    findAll: function (req, res) {

        db.Florida_man.findAll({})
    }

};