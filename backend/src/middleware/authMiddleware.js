const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    let token;

    // check if Authorization header exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // extract token
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, "secretkey");

            // attach user info to request
            req.user = decoded;

            return next(); // allow access
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "No token, access denied" });
    }
};

module.exports = { protect };
