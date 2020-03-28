let Todo = require('../models/client.model');
let logged=0
let user=[]

//client list
exports.client_list = function(req, res) {
	
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
};

//logged
exports.client_logged = function(req, res) {
    res.json({"logged_in":logged,"user":user[0]});
};


//logout
exports.client_logout = function(req, res) {
	logged=0;
	user=[];
    res.json({"logged_in":logged,"user":user[0]});
};

//Register client
exports.client_register = function(req, res) {
	console.log(req.method,req.url)
    let todo = new Todo(req.body);
	if(req.body.pass==req.body.repass){
		todo.save()
        .then(todo => {
            logged=1;
            user.push(todo);
            res.status(200).json({'Client': 'Client added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new client failed');
        });
	}
	else{
	res.status(420).json({'Client':'Password doesnt match'});
	}
};

//Client Registeration
exports.client_add = function(req, res) {
	console.log(req.method,req.url)
    let todo = new Todo(req.body);
	if(req.body.pass==req.body.repass){
		todo.save()
        .then(todo => {
            logged=1;
            user.push(todo);
            res.status(200).json({'Client': 'Client added successfully'});
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
    Todo.find({username:req.body.username,pass:req.body.pass},function(err, todos) {
       if (err) {
           res.json(err);
           
       } else {
           if(todos.length==0){
               res.status(420).json("User doesn't exist")
               console.log(todos);
           }
           else
           {
               logged=1;
               user.push(todos);
               res.json(user[0]);
           }
       }
   });
};