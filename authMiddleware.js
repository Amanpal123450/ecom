const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ msg: "Token not found or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.my_secret_key);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ msg: "Invalid token structure" });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ msg: "Invalid token", error: error.message });
    }
}

module.exports = authMiddleware;
