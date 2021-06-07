const { User } = require('../models');

const userData = [
    {
        username: "awonaya@gmail.com",
        password: "p@ssword1"
    },
    {
        username: "evrad@gmail.com",
        password: "p@ssword2"
    },
    {
        username: "isaac@gmail.com",
        password: "p@ssword3"
    },
    {
        username: "dipti_razdan@gmail.com",
        password: "p@ssword4"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;