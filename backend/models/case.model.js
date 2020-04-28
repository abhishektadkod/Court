var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
let Case = new Schema({
   client_id:{
       type: Schema.ObjectId,
       ref:'Client',
       required:true
   },
   lawyer_id:{
    type: [Schema.ObjectId],
    ref:'Lawyer'
   },
   case_type:{
       type: String
   },
   case_description:{
       type: String
   },
   selected:{
        type:Number
   },
   accepted_lawyer:{
    type:Schema.ObjectId,
    ref:'Lawyer'
   },
   updated:{type: Date, default: Date.now}
});
 
module.exports = mongoose.model('Case', Case);