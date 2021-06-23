// import the express router object
const router = require('express').Router();
// include our required objects for these routes
const { Post, User, Comment } = require('../../models');
// import our sequelize connection to the database
const sequelize = require('../../config/connection');
// import our loggedIn authenticator since users can't post unless in
const withAuth = require('../../utils/auth');
// when a post is added, find all it's content and post it in reverse
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
            attributes: ['id',
                'title',
                'description',
                'date_created'
            ],
            order: [
                ['date_created', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'post_id', 'comment', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => res.json(dbPostData.reverse()))
        res.render('homepage', {loggedIn: req.session.loggedIn})
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// when a user clicks on a specific post, return all that data
router.get('/:id', (req, res) => {

    console.log(`Post ID: ${req.params.id}`)

    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'description',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id','post_id', 'comment', 'date_created', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {

            console.log(dbPostData);
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// After user submits a new post, connect user session then get above
router.post('/', withAuth, (req, res) => {
    // creates a new Post model instance and calls save on it
    Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
            include: [ {
                model: User,
                attributes: ['username']

            }]
            
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// when user clicks 'update' button, replace post-id data with new
router.put('/:id', withAuth, (req, res) => {
// Update multiple instances that match the where options
    Post.update({
// hash of values to update
            title: req.body.title,
            description: req.body.description
        }, {
// options to be met within the where attribute
            where: {
                id: req.params.id
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// when user clicks 'delete' button, remove record from database entirely
router.delete('/:id', withAuth, (req, res) => {
// Delete multiple instances, in this case just where the id has been selected. On a post/:id page, clicking the delete button will trigger the front end form that will ship a delete request back here
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;