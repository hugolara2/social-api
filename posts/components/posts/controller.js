const nanoid = require('nanoid');

const TABLE = 'posts';

module.exports = function(injectedStore) {
  let store = injectedStore;

  if(!store){
    store = require('../../../store/mysql');
  }

  function list(){
    return store.list(TABLE);
  }

  function get(id){
    return store.get(TABLE, id);
  }

  async function upsert(body){
    const post = {
      post_content: body.post_content,
      post_date: body.post_date,
      user_id: body.user_id
    };

    if(body.post_id){
      post.post_id = body.post_id
    }else{
      post.post_id = nanoid.nanoid();
    }

    return store.upsert();

  }



  return {
    list,
    get,
    upsert,
  };  

};