const mongoose = require('mongoose');

const {DB_QUERYSTRING} = require('./env');

exports.dbInit = () => {
    
    mongoose.connection.on('open', () => console.log('DataBase connected Successfully!'));
    return mongoose.connect(DB_QUERYSTRING);


}
