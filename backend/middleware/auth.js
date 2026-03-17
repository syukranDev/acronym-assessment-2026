const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid authorization header' });
  }

  const bearer = bearerHeader.split(' ')[1];
  const token = bearer.length > 0 ? bearer : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { verifyToken };
