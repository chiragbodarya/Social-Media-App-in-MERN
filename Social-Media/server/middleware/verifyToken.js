const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const tokenWithoutBearer = token.slice(7);
    // console.log("token22222 =====> ", token);s
    if (!tokenWithoutBearer) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    // console.log("tokenWithoutBearer =====> ", tokenWithoutBearer);
    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        // Token is valid
        console.log(decoded);
        req.user = decoded;
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