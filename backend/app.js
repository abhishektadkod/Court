const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

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

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

let interval;
let lawyer;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on("lawyerid", data => {lawyer=data});
});



const getApiAndEmit = async socket => {
    try {
      const cases = await axios.get(
        "http://localhost:4000/lawyer/select/"+lawyer
      ); 
      socket.emit("F",cases.data); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }  
  };


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

server.listen(4001, () => console.log(`Listening on port ${4001}`));