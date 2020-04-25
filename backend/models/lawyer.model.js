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
    OTP:{
       type:String
   },
    type:{
        type:String
    },
    Usertype:{
        type:Number
    },
    requests:{
        type: [Schema.ObjectId],
        ref:'Case'
    },
    accepted:{
        type: [Schema.ObjectId],
        ref:'Case'
    },
    updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Lawyer', Lawyer);
