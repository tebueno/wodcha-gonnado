const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const wodQuerySchema = Joi.object()
  .keys({
    page: Joi.number().integer().min(1),
    size: Joi.number().integer()
  })
  .with('page', 'size')
  .with('size', 'page');

// TODO not sure I need two schemas maybe we can validate both in one schema?
const wodIdSchema = Joi.object()
  .keys({
    wodId: Joi.objectId(),
  })

const validateWodQuery = (req, res, next) => {
  Joi.validate(req.query, wodQuerySchema, err => {
    if (err) {
      // TODO: figure out how to remove backslashed from response.
      // Need to make sure we send back */json content type
      res.status(422).send(JSON.stringify(err, ['name', 'message']));
    } else {
      next();
    }
  });
};

const validateWodIdParam = (req, res, next) => {
    Joi.validate(req.params, wodIdSchema, err => {
        if (err) {
            res.status(422).send(JSON.stringify(err, ['name', 'message']));
        } else {
            next();
        }
    })
}

module.exports = {
  validateWodQuery: validateWodQuery,
  validateWodIdParam: validateWodIdParam,
};
