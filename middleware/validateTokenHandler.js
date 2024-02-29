const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');

const validateToken = asynchandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization; // Corrected the header name

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            console.log(req.user);
            next();
        });
    } else {
        res.status(401);
        throw new Error("User is not Authorized or Token is expired");
    }
});

module.exports = validateToken;
