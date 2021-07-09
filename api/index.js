const express = require('express');

const config = require('../config.js');
const users = require('./components/users/network');

const app = express();

//Routes
app.use('/api/user', users);

app.listen(config.api.port, ()=>{
  console.log(`Api escuchando en el puerto ${config.api.port}`);
});