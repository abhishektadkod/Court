var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Client = new Schema({
    username: {
        type: String,
		
    },
    pass: {
        type: String
		
    },
    logged: {
        type: Number
		
    }
});

module.exports = mongoose.model('Client', Client);
