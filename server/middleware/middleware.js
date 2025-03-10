const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header or cookies
    let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", success: false });
    }
};

module.exports = authMiddleware;
