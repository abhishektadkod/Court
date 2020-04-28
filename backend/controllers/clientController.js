//https://codeforgeek.com/manage-session-using-node-js-express-4/
//req.params.id
let Client = require('../models/client.model');
let Case = require('../models/case.model');
let Lawyer = require('../models/lawyer.model');

let user="000000000000";

let soc = require('../app');

//client list
exports.client_list = function(req, res) {
	
    Client.find(function(err, response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response);
        }
    });
};

//logged
exports.client_logged = function(req, res) {
    
    Client.findById({_id : req.params.id},function(err, client) {
        if (err) {
            console.log(err);
        } else {
            if(!client){
                res.status(420).json("User doesn't exist")
                console.log(client);
            }
            else
            {
            res.json({"logged_in":client.logged,"user":client});
            
           
            }
        }
    });
    
};


//logout
exports.client_logout = function(req, res) {
    Client.updateOne({_id:req.params.id},{logged:0},
        function(err, resp) {
                if (err) {
                    res.json(err);
                } else {
                    user="000000000000"
                    res.json("Logged Out successfully");
                }
            });
         };
	
   


//Register client
exports.client_register = function(req, res) {
	console.log(req.method,req.url)
    let client = new Client(req.body);
	if(req.body.pass==req.body.repass){
        client.logged=1;
        client.Usertype=1;
		client.save()
        .then(resp=> {
            user=client._id
            res.status(200).json(resp);
            console.log(resp);
            soc.clientsoc(client._id);
        })
        .catch(err => {
            res.status(400).send('adding new client failed');
        });
	}
	else{
	res.status(420).json({'Client':'Password doesnt match'});
	}
};


//Client login validation
exports.client_login = function(req, res) {
Client.updateOne({username:req.body.username,pass:req.body.pass},
    {logged:1},function(err, resp) {
        if (err) {
            res.json(err);
        } else {
                Client.find({username:req.body.username,pass:req.body.pass},function(err, response) {
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
                        console.log(user);
                        soc.clientsoc(response[0]._id);
                        }
                    }
                });
        }
    });
 };

 //Adding a case
exports.add_case= function(req, res) {
 
    let cases = new Case(req.body);
        cases.save()
        .then(resp=> {
  
            res.status(200).json(resp);
            console.log(resp);
        })
        .catch(err=>{
            res.status(400).send('adding a case failed');
            console.log(err);
        });
   
 };
 
 //Adding a lawyer
exports.add_lawyer = function(req, res) {
    Case.updateOne({client_id:req.body.client_id,_id:req.body.caseid},
        { $push: {lawyer_id:req.body.lawyer_id}},function(err, resp) {
            if (err) {
                res.json(err);
            } else {
                Lawyer.updateOne({_id:req.body.lawyer_id},
                    { $push: {requests:req.body.caseid}},function(err, resp) {
                        if (err) {
                            res.json(err);
                        } else {
                                res.json("updated!");
                        }
                    });
            
            }
        });
   
     };

exports.get_case = function(req, res) {
	
    Case.find({client_id:req.params.id},function(err, response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response);
        }
    });
};

//Get selected clients
exports.get_selected_clients = function(req, res) {
    Case.find({client_id:req.params.id, selected:1})
      .populate({path:'accepted_lawyer',model: 'Lawyer'})
      .then(function(dbProduct) {
        res.json(dbProduct);
      })
      .catch(function(err) {
        res.json(err);
      });
}
