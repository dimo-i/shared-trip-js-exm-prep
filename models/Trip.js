const mongoose = require('mongoose');

//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names

const URL_PATERN = /^https?:\/\/(.+)/;

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        required: true,
    },
    endPoint: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    carImage: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: function (value) {
                return URL_PATERN.test(value);
            },
            message: "Image must be a valid URL"
        },
    },
    carBrand: {
        type: String,
        required: true,
    },
    seats: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true, 
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    buddies: [{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    }]


});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;