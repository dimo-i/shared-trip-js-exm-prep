const User = require('../models/User');


//////CHANGE trip WITH "SECOND ITEM" + File names


exports.getOne = (userId) => User.findById(userId);

exports.addTrip = (userId, tripId) => {

    return User.updateOne({_id: userId}, {$push: {tripsHistory: tripId}});
}
