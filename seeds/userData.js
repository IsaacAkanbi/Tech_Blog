const { User } = require('../models');

const userData = [
    {
        username: "adam@gmail.com",
        password: "password1"
    },
    {
        username: "paolo@gmail.com",
        password: "password2"
    },
    {
        username: "isaac@gmail.com",
        password: "password3"
    },
    {
        username: "dams@gmail.com",
        password: "password4"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;