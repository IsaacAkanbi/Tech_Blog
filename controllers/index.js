const router = require('express').Router();
const apiRoutes = require('./api');
// imports our homeRoutes
const homeRoutes = require('./homeRoutes.js');



router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;