const tripService = require('../services/tripService')


//////CHANGE trip WITH "SECOND ITEM" + File names

exports.preloadTrip = async (req, res, next) => {
    const trip = await tripService.getOne(req.params.tripId).lean();

    req.trip = trip
    next();
}

exports.isTripCreator = (req, res, next) => {
    if (req.trip.creator != req.user._id){
        return next({message: 'You are not authorized!', status: 401});
    }
    next();
}