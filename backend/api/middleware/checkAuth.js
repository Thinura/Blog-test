require('dotenv').config();
const { JWT_KEY } = process.env;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(authToken, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Auth failed."
        });
    }
};