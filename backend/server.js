const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;
const court="Court"
let logged=0
let user=[]


let Todo = require('./client.model');

app.use(cors({origin:'http://localhost:3000',credentials: true,}))


app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/'+court, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database '"+court+"' connection established successfully");
})

todoRoutes.route('/').get(function(req, res) {
	
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/logged').get(function(req, res) {
    res.json({"logged_in":logged,"user":user});
});

todoRoutes.route('/logout').get(function(req, res) {
	logged=0;
	user=[];
    res.json({"logged_in":logged,"user":user});
});


todoRoutes.route('/add').post(function(req, res) {
	console.log(req.method,req.url)
    let todo = new Todo(req.body);
	if(req.body.pass==req.body.repass){
		todo.save()
        .then(todo => {
			logged=1;
            res.status(200).json({'Client': 'Client added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new client failed');
        });
	}
	else{
	res.status(420).json({'Client':'Password doesnt match'});
	}
});

todoRoutes.route('/login').post(function(req, res) {
	 Todo.find({username:req.body.username,pass:req.body.pass},function(err, todos) {
        if (err) {
            res.json(err);
        } else {
			if(todos.length==0){
				res.status(420).json("User doesn't exist")
			}
			else
			{
				logged=1;
				user.push(todos);
				res.json(todos);
			}
        }
    });
});

app.use('/client', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});