const response = (res, options = {}) => {
  const {
    statusCode = 200,
    message = 'Success',
    data = null
  } = options;

  return res.status(statusCode).json({
    statusCode,
    message,
    data
  });
};


module.exports = {
    response
};