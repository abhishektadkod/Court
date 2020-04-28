let Client = require('../models/client.model');
let Case = require('../models/case.model');
let Lawyer = require('../models/lawyer.model');

let soc = require('../app');
 
let user="000000000000";
 
//lawyer list
exports.lawyer_list = function(req, res) {
  
   Lawyer.find(function(err, response) {
       if (err) {
           console.log(err);
       } else {
           res.json(response);
       }
   });
};
 
//logged
exports.lawyer_logged = function(req, res) {
  
   Lawyer.findById({_id : req.params.id},function(err, lawyer) {
       if (err) {
           console.log(err);
       } else {
           if(!lawyer){
               res.status(420).json("User doesn't exist")
               console.log(lawyer);
               
           }
           else
           {
           res.json({"logged_in":lawyer.logged,"user":lawyer});
           console.log(user);
           
           }
       }
   });
  
};
 
 
//logout
exports.lawyer_logout = function(req, res) {
   Lawyer.updateOne({_id:req.params.id},{logged:0},
       function(err, resp) {
               if (err) {
                   res.json(err);
               } else {
                   user="000000000000"
                   res.json("Logged Out successfully");
               }
           });
};
  
 
 
//Lawyer login validation
exports.lawyer_login = function(req, res) {
Lawyer.updateOne({phone:req.body.phone},
   {logged:1},function(err, resp) {
       if (err) {
           res.json(err);
       } else {
               Lawyer.find({phone:req.body.phone},function(err, response) {
                   if (err) {
                       console.log(err);
                   } else {
                       if(response.length==0){
                           res.status(420).json("User doesn't exist")
                           console.log(response);
                       }
                       else
                       {
                       user=response[0]._id;
                       res.json(response[0]);
                       console.log(user)
                       }
                   }
               });
       }
   });
};
 
//lawyer otp 
exports.opt_validation = function(req, res) {
   let otp=Math.floor(Math.random() * 899999 + 100000)
   Lawyer.updateOne({phone:req.body.phone},{OTP:otp},function(err,resp) {
       if (err) {
           res.json(err);
       } else {
               Lawyer.find({phone:req.body.phone},function(err, response) {
                   if (err) {
                       console.log(err);
                   } else {
                       if(response.length==0){
                           res.status(420).json("User doesn't exist 101")
                           console.log(response);
                       }
                       else
                       {
                       user=response[0]._id;
                       soc.lawyersoc(response[0]._id);
                       res.json(response[0]);
                       console.log(user)
                       console.log(otp)
                       }
                   }
               });
       }
   });  
};

 
// GET lawyer listing based on type
exports.lawyer_type = function(req, res, next) {
 
    Lawyer.find({type:req.params.id},function(err, response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response);
        }
    });
  };

//Add lawyers   
exports.lawyer_add=function(req, res) {
	console.log(req.method,req.url);
    let client = new Lawyer(req.body);

        client.logged=1;
		client.save()
        .then(resp=> {
            user=client._id;
            res.status(200).json(resp);
            console.log(resp);
        })
        .catch(err => {
            res.status(400).send(err);
        });
};

//Select a client case and update
exports.lawyer_case_select=function(req, res) {
	console.log("Hi");
    Lawyer.updateOne({_id:req.params.id},
        { $push: {accepted:req.body.caseid}},function(err, resp) {
            if (err) {
                res.json(err);
            } else {
                Case.updateOne({_id:req.body.caseid},
                    { selected:1 ,accepted_lawyer:req.body.lawyer_id},function(err, resp) {
                        if (err) {
                            res.json(err);
                        } else {
                                res.json("updated!");
                        }
                    });
            }
        });  
};

//GET lawyer listing
exports.lawyer_case_list=function(req, res) {
    Lawyer.findOne({ _id:req.params.id})
      .populate({path:'requests',model: 'Case'})
      .then(function(dbProduct) {
        res.json(dbProduct.requests);
      })
      .catch(function(err) {
        res.json(err);
      });
  };