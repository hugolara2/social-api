const express = require('express');
const bodyParser = require('body-parser');


const config = require('../config.js');
const posts = require('./components/posts/network');
const errors = require('../network/errors'); 

const app = express();

app.use(bodyParser.json()); 

const { application } = require('express');

//Router
app.use('/api/post', posts);

app.use(errors);

app.listen(config.post.port, () => {
  console.log(`Servicio de post escuchando en el puerto ${config.post.port}`);
}); 