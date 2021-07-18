const mysql = require('mysql2');

const config = require('../config');

const dbConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

let connection;

function handleConn(){
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if(err){
      console.error('[db error]', err);
      setTimeout(handleConn, 2000);
    }else{
      console.log('DB connected!');
    }
    
  });
  
  connection.on('error', err => {
    console.error('[db error]');
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleConn();
    }else{
      throw err;
    }
  });

}

handleConn();