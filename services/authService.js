const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env')

//////CHANGE PUBLICATION WITH "SECOND ITEM" + File names



exports.create = (userData) => User.create(userData);

exports.login = async (email, password) => { // email or email
    const user = await User.findOne({email})

    if (!user) {
        throw { message: 'Cannot find email or password'};
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw { message: 'Cannot find email or password'};
    };

    return user;
};


exports.createUserToken = async (user) => {
    const payload = {_id: user._id, email: user.email, gender: user.gender};

    const options = {expiresIn: '2d'};

    const tokenPromise = new Promise((resolve, reject) => {

        jwt.sign(payload, SECRET, options, (err, decodedToken) =>{
            if(err){
                return reject(err);
            }
            resolve(decodedToken);
        });
    });

    return tokenPromise;
};
