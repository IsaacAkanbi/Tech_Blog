const { Post } = require('../models');

const postData = [
    {
        title: "MongoDB",
        description: "A comprehensive database management apps",
        date_created: "June 6, 2021 ",
        user_id: 1
    },
    {
        title: "CSS",
        description: "Getting the best styling framework for your apps",
        date_created: "June 21, 2021 ",
        user_id: 1
    },
    {
        title: "PYTHON",
        description: "All you should know about Python",
        date_created: "June 4, 2021 ",
        user_id: 1

    },
    {
        title: "HTML",
        description: "Perfect looks for the perfect solutions you are building",
        date_created: "June 1, 2021 ",
        user_id: 1
    }
]
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;