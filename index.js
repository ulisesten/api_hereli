const http = require('http');
const express = require('express');
const cors = require('cors');

const users = require('./app/routes/api/v1/users/users.js')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use('/static', express.static(__dirname + '/public/static/'));
app.use(express.json());

/** API routes */
app.use('/api/v1/users', users);


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/home.html');
});

const server = http.createServer(app);

server.listen(PORT, function(err) {
    if (err) {
      console.log('Encountered error starting server: ', err);
      return;
    }
  
    console.log('server running at port: ' + PORT);
});