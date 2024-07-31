const jwt = require("jsonwebtoken")
const jwt_secret = "ThisisJwtSecretCodeforfoodorderingsite";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).json({ message: "Forbidden" });

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;