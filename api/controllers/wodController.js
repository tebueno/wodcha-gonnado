const model = require('../models/wods');

// TODO: Must improve error handeling for mongo queries
// look as some design patterns, figure out how to remove slashes etc.

const getRandomWod = (req, res) => {
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

const getAllWods = (req, res) => {
    let query = {};

    query.limit = parseInt(req.query.size);
    query.skip = req.query.size * req.query.page;

    // TODO: optimize this code
    model.find({},{}, query, (err, wods) => {
      if(err) {
        const error = {
          "error": true,
          "message": `error while fetching data: ${err}`,
        }
        res.status(404).send(error);
      }

      res.status(200).send(wods);
    })
  }

const getWodById = (req, res) => {
  const { wodId } = req.params;
  model.findById(wodId, (err, wod) => {
    if(err) {
      res.status(404).type('txt').send(err);
    }

    res.status(200).send(wod);

  })
}

module.exports = {
    getRandomWod: getRandomWod,
    getAllWods: getAllWods,
    getWodById: getWodById,
}