const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');

//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names

const tripService = require('../services/tripService');
const userService = require('../services/userService');

const { getErrorMessage } = require('../utils/errorHelpers')

const { preloadTrip, isTripCreator } = require('../middlewares/tripMiddleware')



router.get('/', async (req, res) => {

    const trips = await tripService.getAll().lean();

    res.render('trip/shared-trips', { trips })
});


router.get('/:tripId/details', async (req, res) => {
    const trip = await tripService.getOneDetailed(req.params.tripId).lean();
    const isCreator = trip.creator._id == req.user?._id;
    //Todo check logged out user
    const availableSeats = trip.seats > 0 

    const isShared = trip.buddies.some(x => x._id == req.user?._id)
    console.log(isShared)
    const people = trip.buddies.map(x => x.email).join(', ')
    console.log(people)


    res.render('trip/details', { ...trip, isCreator, people, isShared, availableSeats});


})


router.get(
    '/:tripId/edit',
    isAuth,
    preloadTrip,
    isTripCreator,
    (req, res) => {

        res.render('trip/edit', { ...req.trip })
    }
);


router.post('/:tripId/edit',
    isAuth,
    preloadTrip,
    isTripCreator,
    async (req, res) => {
        try {
            await tripService.updateOne(req.params.tripId, req.body);

            res.redirect(`/trips/${req.params.tripId}/details`)
        } catch (error) {
            res.render('trip/edit', { ...req.body, error: getErrorMessage(error) })
        }
    }
);


router.get(
    '/:tripId/delete',
    isAuth,
    preloadTrip,
    isTripCreator,
    async (req, res) => {

        await tripService.delete(req.params.tripId);
        
        res.redirect('/trips');
    }
);


router.get('/create', isAuth, (req, res) => {
    res.render('trip/create');
})

router.post('/create', isAuth, async (req, res) => {

    const tripData = { ...req.body, creator: req.user._id };

    try {
        const trip = await tripService.create(tripData);
        await userService.addTrip(req.user._id, trip._id);

        res.redirect('/trips');

    } catch (error) {
        res.render('trip/create', { ...req.body, error: getErrorMessage(error) })
    }

});


router.get('/:tripId/share', isAuth, async (req, res) => {
    const trip = await tripService.getOne(req.params.tripId);
    const user = await userService.getOne(req.user._id);

    trip.buddies.push(req.user._id);
    user.tripsHistory.push(trip)

    trip.seats -= 1
    
    await trip.save();
    await user.save();
    res.redirect(`/trips/${trip._id}/details`)
})


module.exports = router;