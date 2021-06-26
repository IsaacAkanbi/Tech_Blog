const { Comment } = require('../models');

const commentData = [
    {
        content: 'Interesting',
        // date_created:'June 10, 2021',
        // post_id: 1,
        // user_id: 1
    },
    {
        content: 'like it',
        // date_created:'June 7, 2021',
        // post_id: 4,
        // user_id: 1
    },

    {
        content: 'Lovely',
        // date_created:'June 10, 2021',
        // post_id: 2,
        // user_id: 1
    }
]
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;