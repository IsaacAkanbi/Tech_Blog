const router = require('express').Router();
// Import the Comment model for our routes
const { Comment } = require('../../models');
// Make sure our sequelize connection is intact
// const sequelize = require('../../config/connection');
// Users shouldn't post or update comments if they are not loggedIn
const withAuth = require('../../utils/auth');
// When a post/:id is viewed, make sure to include/display all its related comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});
// Click into a specific comment
// router.get('/:id', (req, res) => {
//     Comment.findAll({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         })
// });
// When a loggedIn user posts a comment, store text, post and user ids
router.post('/', withAuth, (req, res) => {
    console.log("helllloooooo", req.body)
    if (req.session) {
        // Builds a new comment model instance and saves it
        Comment.create({
                content: req.body.content,
                post_id: req.body.post_id,
                // date_created: 1,
                //user_id: 0 // test data
                // user_id: req.session.user_id
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});
// If a user wants to update a comment, they must be logged in
// router.put('/:id', withAuth, (req, res) => {
//     Comment.update({
//         comment: req.body.comment
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(dbCommentData => {
//         if (!dbCommentData) {
//             res.status(404).json({ message: 'No comment found with this id' });
//             return;
//         }
//         res.json(dbCommentData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });
// To delete a comment, click on button associated with the comment id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;