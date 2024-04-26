import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config.js';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token.token;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
