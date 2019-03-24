var express = require("express");
var router = express.Router();
let model = require('../models/wods');

/* GET random workout. */
router.get("/random", function(req, res, next) {
  model.count((err, resp) => {
    let random = Math.floor(Math.random() * resp);
    model
      .findOne()
      .skip(random)
      .exec((err, wods) => {
        err ? res.send(err) : res.send(wods);
      });
  });
});

/* GET all workouts */
router.get("/all", function(req, res, next) {
    let query = {};
    query.limit = parseInt(req.query.size) || 25;

    if (!req.query.page && req.query.page !== 1) {
      let response = {
        "error": true,
        "message": 'invalid page parameter',
      };
      res.send(response);
    }
    query.skip = query.limit * req.query.page;

    model.find({},{}, query, (err, wods) => {
      if(err) {
        wods = {
          "error": true,
          "message": `error while fetching data: ${err}`,
        }
        res.send(wods);
      }

      res.send(wods);
    })
  });

module.exports = router;
