const { Post } = require('../models');

const postData = [
    {
        title: "MongoDB",
        description: "A comprehensive database management apps. MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.",
        // date_created: "June 6, 2021 ",
        // user_id: 1
    },
    {
        title: "CSS",
        description: "Getting the best styling framework for your apps. Cascading Style Sheets (CSS) is a simple mechanism for adding style (e.g., fonts, colors, spacing) to Web documents.These pages contain information on how to learn and use CSS and on available software.",
        // date_created: "June 21, 2021 ",
        // user_id: 2
    },
    {
        title: "PYTHON",
        description: "Python is an interpreted high-level general-purpose programming language. Python's design philosophy emphasizes code readability with its notable use of significant indentation. Python is a multi-paradigm programming language.",
        // date_created: "June 4, 2021 ",
        // user_id: 1

    },
    {
        title: "HTML",
        description: "The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.",
        // date_created: "June 1, 2021 ",
        // user_id: 1
    }
]
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;