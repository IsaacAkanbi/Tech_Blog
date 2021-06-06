const router = require('express').Router();
const apiRoutes = require('./api');
// imports our home-route
const commentRoutes = require('./comment-routes.js');
const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/', commentRoutes);
router.use('/', postRoutes);
router.use('/', userRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;