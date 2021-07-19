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

function list(table){
  return new Promise((resolve, reject) => {
    connection.query(`SELECT* FROM ${table}`, (err, data) => {
      if(err){
        return reject(err);
      }
      resolve(data);
    });
  }); 
}

function get(table, id){
  return new Promise((resolve, reject) => {  
    connection.query(`SELECT* FROM ${table} WHERE user_id=${id}`, (err,data) => {
      if(err){
        return reject(err);
      }
      resolve(data);
    });
  }); 
}

function insert(table, data){
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if(err){
        return reject(err);
      }
      resolve(result);
    });
  });
}

function update(table, data){
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE user_id=?`, [data, data.user_id], (err, result) => {
      if(err){
        return reject(err);
      }
      resolve(result);
    });
  });
}

function upsert(table, data){
  if(data && data.user_id){
    return update(table, data);
  }
  return insert(table, data);
}

function query(table, query){
  return new Promise((resolve, reject) => {
    connection.query(`SELECT* FROM ${table} WHERE ?`, query, (err, res) => {
      if(err){
        return reject(err);
      }
      resolve(res[0]);
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};