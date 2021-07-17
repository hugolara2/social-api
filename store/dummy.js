const db = {
  'users': [
    {id: "1", name: 'Hugo'},
    {id: "2", name: 'Karen'}, 
  ]
};

async function list(table){
  return db[table] || [];
}

async function get(table, id){
  let row = await list(table);
  return row.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data){

  if(!db[table]){
    db[table] = [];
  }
  db[table].push(data);
  
  console.log(db);
}

async function remove(table, id){
  return true;
}
//q is query
async function query(table, q){
  let row = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];

  return row.filter(item => item[key] === q[key])[0] || null;
} 

module.exports = {
  list, 
  get, 
  upsert,
  query, 
};