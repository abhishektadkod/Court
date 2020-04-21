var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Client = new Schema({
    username: {
        type: String,
		
    },
    pass: {
        type: String
		
    },
    email:{
        type:String,
        unique:true
    },
    logged: {
        type: Number	
    },
    Usertype:{
        type:Number
    },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Client', Client);
