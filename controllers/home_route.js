const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('landing');
})

router.get('/test', (req, res) => {
    console.log("Testing ....")
    let tempObj = {
        name: 'Bill'
    }

    // test that your getting data from the DB back


    // look at activities 7 and 8 about data Serialization from DB to VIEW
    res.render('post', {tempObj} )
})


module.exports = router;