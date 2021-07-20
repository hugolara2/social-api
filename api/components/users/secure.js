const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  
  function middleWare(req, res, next) {
    switch(action) {
      case 'update':
        const owner = req.body.user_id;
        auth.check.own(req, owner);
        next();
        break;
      case 'follow':
        auth.check.token(req);
        next();
        break;
      default:
        next();
      case 'like':
        auth.check.token(req);
        next();
        break;
    }
  }

  return middleWare;

};