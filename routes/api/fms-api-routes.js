var fldc = require("./../../scrapers/fmdc-scraper");
var db = require("./../../models");

module.exports = function (app) {

app.get("/api/posts", function (req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }

//     db.Post.findAll({
//       where: query,
//       include: [db.Author]
//     }).then(function (dbPost) {
//       res.json(dbPost);
//     });

//     app.get("/api/posts/:id", function (req, res) {
//         // 2. Add a join here to include the Author who wrote the Post
//         db.Post.findOne({
//           where: {
//             id: req.params.id,
    
//           },
//           include: [db.Author] 
//         }).then(function (dbPost) {
//           console.log(dbPost);
//           res.json(dbPost);
//         });
//       });
    
      // POST route for saving a new post
      app.post("/api/fl-men", function (req, res) {
        db.Florida_man.create(req.body).then(function (dbPost) {
          res.json(dbPost);
        });
      });
    
      // DELETE route for deleting posts
      // app.delete("/api/posts/:id", function (req, res) {
      //   db.Post.destroy({
      //     where: {
      //       id: req.params.id
      //     }
      //   }).then(function (dbPost) {
      //     res.json(dbPost);
      //   });
      // });
    
      // PUT route for updating posts
      app.put("/api/posts", function (req, res) {
        db.Post.update(
          req.body, {
            where: {
              id: req.body.id
            }
          }).then(function (dbPost) {
          res.json(dbPost);
        });
      });
  });

}
