var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Lawyer = new Schema({
    username: {
        type: String,
		
    },
    phone:{
        type:String,
        unique: true
    },
    pass: {
        type: String
		
    },
    logged: {
        type: Number
		
    },
    type:{
        type:String
    },
    updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Lawyer', Lawyer);
