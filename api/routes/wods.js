var express = require("express");
var router = express.Router();
let model = require('../models/wods');

/* GET users listing. */
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

/* GET users listing. */
router.get("/all", function(req, res, next) {
    model.find((err, wods) => {
      res.send(wods);
    })
  });

module.exports = router;
