const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var lawyerRouter = require('./routes/lawyer');
var clientRouter = require('./routes/client');

const PORT = 4000;
const court="Court"





app.use(cors({origin:'http://localhost:3000',credentials: true,}))


app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/'+court,  {
    useCreateIndex: true,
    useNewUrlParser: true
  });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database '"+court+"' connection established successfully");
})


app.use('/client', clientRouter);
app.use('/lawyer', lawyerRouter);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});