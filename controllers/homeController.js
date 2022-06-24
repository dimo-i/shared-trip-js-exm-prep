const router = require('express').Router();


//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names

const tripService = require('../services/tripService')
const userService = require('../services/userService')



router.get('/', async(req, res) => {
    const tripsResult = await tripService.getAll().lean();
    // const buddies = tripsResult.map(x => ({...x, buddies: x.buddies.length}))

    // console.log(buddies)
    res.render('home', {tripsResult});
})

//TODO

router.get('/profile', async (req, res) => {
    const user = await userService.getOne(req.user._id).populate('tripHistory').lean();

    const tripHistory = user.tripHistory.map(x => x.title).join(', ');



    
    res.render('shared-trips', {...user, tripHistory});
})


module.exports = router;


