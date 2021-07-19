const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLE = 'auth';

module.exports = function(injectedStore) {
  let store = injectedStore;

  if(!store){
    store = require('../../../store/dummy');
  }

  async function login(username, password){
    const data = await store.query(TABLE, {user_login: username});

    return bcrypt.compare(password, data.user_pwd)
      .then((sonIguales) => {
        console.log(data);
        if(sonIguales == true){
          //Generar token
          return auth.sign(data);
        }else{
          throw new Error('Invalid info');
        }
      });
      
  }

  async function upsert(data){
    const authData = {
      user_id: data.user_id,
    };

    if(data.user_login){
      authData.user_login = data.user_login;
    }
    if(data.user_pwd){
      authData.user_pwd = await bcrypt.hash(data.user_pwd, 5);
    }

    return store.upsert(TABLE, authData);

  }

  return {
    upsert,
    login
  };

};
