const router = require('express').Router();

// imports our home-route
const commentRoutes = require('./comment-routes.js');
const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/comment', commentRoutes);
router.use('/blogPost', postRoutes);
router.use('/user', userRoutes);


//router.use((req, res) => {
//    res.status(404).end();
//});

module.exports = router;