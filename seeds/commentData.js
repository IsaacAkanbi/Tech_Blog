const { Comment } = require('../models');

const commentData = [
    {
        comment: 'Interesting',
        date_created:'June 10, 2021',
        post_id: 1,
        user_id: 1
    },
    {
        comment: 'like it',
        date_created:'June 7, 2021',
        post_id: 4,
        user_id: 1
    },

    {
        comment: 'Lovely',
        date_created:'June 10, 2021',
        post_id: 2,
        user_id: 1
    }
]
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;