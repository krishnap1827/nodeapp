const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecretkey';


function jwtMiddleware(req, res, next) {
  const jwtToken = req.headers.authorization;
  
  if (!jwtToken) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = jwtToken.split(' ')[1];
//   console.log(token)
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {
    jwtMiddleware
}