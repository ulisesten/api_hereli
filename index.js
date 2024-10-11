const http = require('http');
const express = require('express');
const cors = require('cors');
const settings = require('./app/core/configuration.js')

const users = require('./app/routes/api/v1/users/users.js');
const products = require('./app/routes/api/v1/products/products.js');

const PORT = process.env.PORT || 8080;

const app = express();

const cors_origins = settings.getCors();

const corsOptions = {
  origin: cors_origins, // Solo permitir este dominio
  methods: ['GET', 'POST'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  credentials: true, // Si necesitas enviar cookies o credenciales
};

//console.log(corsOptions)

app.use(cors(corsOptions));
app.use('/static', express.static(__dirname + '/public/static/'));
app.use(express.json());

/** API routes */
app.use('/api/v1/users', users);
app.use('/api/v1/products', products);


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