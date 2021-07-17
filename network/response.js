exports.success = function(req, res, message, status){
  // codigo que envia un mensaje si la request es exitosa
  let statusCode = status || 200;
  let statusMessage = message || '';

  res.status(status).send({
    error: false, 
    status: statusCode,
    body: statusMessage
  });
}

exports.error = function(req, res, message, status){
  // codigo que envia un mensaje si la request fallo
  let statusCode = status || 500;
  let statusMessage = message || 'Internal error';

  res.status(statusCode).send({
    error: true, 
    status: statusCode,
    body: statusMessage
  });
}