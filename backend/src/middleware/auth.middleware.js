const jwt = require("jsonwebtoken");
require('dotenv').config();
const authenticate = (req, res, next) => {
 try{

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }    
    
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded; 
    next();

 }catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
 }  
};

module.exports = authenticate;