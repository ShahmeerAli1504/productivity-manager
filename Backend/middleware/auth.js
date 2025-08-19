const { verifyAccessToken } = require('../utils/jwt');

// Authentication middleware
const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication invalid' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const { valid, expired, decoded } = verifyAccessToken(token);
    
    if (!valid) {
      return res.status(401).json({ 
        success: false, 
        message: expired ? 'Token expired' : 'Invalid token' 
      });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication failed' 
    });
  }
};

module.exports = authenticate;