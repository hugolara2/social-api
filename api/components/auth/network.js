const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', (req, res, next) => {
  controller.login(req.body.user_login, req.body.user_pwd)
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch(next);
});

module.exports = router;