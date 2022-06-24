const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env')

//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (value) {
                return EMAIL_PATTERN.test(value);
            },
            message: "Please enter valid e-mail"
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'password should be at least 4 characters long!'],
    },

    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Please choose gender: male, female']
    }, 
    //// change the name of the collection in userService
    tripsHistory: [{
        type: mongoose.Types.ObjectId,
        ref: 'Trip',
    }],
    


});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
    .then(hashedPassword => {
        this.password = hashedPassword
        next()
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;