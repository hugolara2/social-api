const nanoid = require('nanoid');
const auth = require('../auth');

const TABLE = 'users';

module.exports = function(injectedStore) {
  let store = injectedStore;

  if(!store){
    store = require('../../../store/dummy');
  }

  function list(){
    return store.list(TABLE);
  }
  
  function get(id){
    return store.get(TABLE, id);
  }

  async function upsert(body){
    const user = {
      user_name: body.user_name,
      user_lastName: body.user_lastName,
      birthdate: body.birthdate,
      user_email: body.user_email
    };
    
    if(body.user_id){
      user.user_id = body.user_id;
    }else{
      user.user_id = nanoid.nanoid();
    }

    if(body.user_pwd || body.user_login){
      await auth.upsert({        
        user_id: user.user_id,
        user_login: body.user_login, 
        user_pwd: body.user_pwd
      });
    }

    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert
  };
}
