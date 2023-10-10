const jwt = require('jsonwebtoken');
require("dotenv").config();


const auth =(req, res, next)=> {
    const token = req.header('Authorization');
    

    if (!token) {
        return res.status(401).json({ "msg": "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(403).json({ "msg": "Invalid token." });
    }
}

module.exports = {
    auth
}
