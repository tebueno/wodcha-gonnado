const model = require('../models/wods');

const getRandomWod = (req, res, next) => {
  model.count((err, resp) => {
    let random = Math.floor(Math.random() * resp);
    model
      .findOne()
      .skip(random)
      .exec((err, wods) => {
        err ? res.send(err) : res.send(wods);
      });
  });
};

const getAllWods = (req, res, next) => {
    console.log(JSON.stringify(req.query))
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
  }

module.exports = {
    getRandomWod: getRandomWod,
    getAllWods: getAllWods,

}