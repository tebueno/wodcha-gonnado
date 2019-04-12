const express = require('express');
const router = express.Router();
const wodController = require('../controllers/wodController'); 
const queryValidator = require('../validations/wodValidations');

router.get('/random', wodController.getRandomWod);
router.get('/all', [
  queryValidator.validateWodQuery,
  wodController.getAllWods]);
router.get('/:wodId', [
  queryValidator.validateWodIdParam,
  wodController.getWodById]);

module.exports = router;
