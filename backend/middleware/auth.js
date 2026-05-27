const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
  // use jwtSecurityKey env var for consistency with routes
  const payload = jwt.verify(token, process.env.jwtSecurityKey || 'jwtSecurityKey');
    // attach basic user info (id and role)
    req.user = { id: payload.id, role: payload.role };
    // optional: load full user
    // req.userDoc = await User.findById(payload.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = auth;
