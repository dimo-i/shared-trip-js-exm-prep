const Trip = require('../models/Trip');

//////CHANGE Trip WITH "SECOND ITEM" + File names




exports.getAll = () => Trip.find();

exports.getOne = (tripId) => Trip.findById(tripId);

exports.getOneDetailed = (tripId) => Trip.findById(tripId).populate('creator').populate('buddies');

exports.create = (tripData) => Trip.create(tripData);

exports.updateOne = (tripId, tripData) => Trip.updateOne({_id: tripId}, {$set: tripData}, {runValidators: true});

exports.delete = (tripId) => Trip.deleteOne({_id: tripId});

