const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token)
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const tokenWithoutBearer = token.slice(7);
    // console.log("token22222 =====> ", token);
    if (!tokenWithoutBearer) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    // console.log("tokenWithoutBearer =====> ", tokenWithoutBearer);
    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);   // process.env.JWT_SECRET is the secret key and this is a defind in .env file in your peoject 
        // Token is valid
        // console.log("decoded", decoded);
        // console.log(decoded.id);
        const user = await User.findOne({ _id: decoded.id });
        // console.log(user)
        req.user = { decoded, user };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
}

module.exports = { verifyToken }