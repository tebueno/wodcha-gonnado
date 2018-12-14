var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var wodSchema = mongoose.Schema({
  link: String,
  status: String,
  workout: String
});

var model = mongoose.model('wodmodel', wodSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.count((err, resp) => {
    let random = Math.floor(Math.random() * resp);
  model.findOne().skip(random).exec((err, wods) => {
    (err) ? res.send(err) : res.send(wods);
  });
});
});

module.exports = router;
