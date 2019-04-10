const Joi = require('joi');

const wodQuerySchema = Joi.object().keys({
    page: Joi.number().integer().min(1),
    size: Joi.number().integer(),
}).with('page', 'size')
  .with('size', 'page');

const validateWodQuery = (req, res, next) => {
    Joi.validate(req.query, wodQuerySchema, (err) => {
        if (err) {
            // TODO: figure out how to remove backslashed from response.
            // Need to make sure we send back */json content type
            res.status(422)
              .send(JSON.stringify(err, ['name', 'message']));
        } else {
            next();
        }
    });
}

module.exports = {
    validateWodQuery: validateWodQuery,
}