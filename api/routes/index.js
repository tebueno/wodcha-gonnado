const express = require('express');
const router = express.Router();
const wodRoutes = require('./wodRoutes');


router.use('/wods', wodRoutes);

module.exports = router;
