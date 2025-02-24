const jwt = require('jsonwebtoken');

const authorize = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      
      if (!authHeader) {
        return res.status(401).json("No authentication token provided");
      }

      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.user_type)) {
        return res.status(403).json("Not authorized for this resource");
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error('Auth error:', err.message);
      res.status(401).json("Token is not valid");
    }
  };
};

module.exports = authorize;
