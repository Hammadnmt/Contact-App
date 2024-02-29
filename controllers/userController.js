const asynchandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

/*
@desc Login User
@route POST /api/user/login
@access public
*/
const login = asynchandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const userInfo = await User.findOne({ email });

    if (userInfo && (await bcrypt.compare(password, userInfo.password))) {
        // User authenticated, generate JWT token
        const accessToken = jwt.sign({
            user: {
                username: userInfo.username,
                email: userInfo.email,
                id: userInfo.id
            },
        }
            , process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15m" });
        res.status(201).json({ accessToken });
    } else {
        res.status(400)
        throw new Error("Email or Password not correct")
    }
})

/*
@desc Register User
@route POST /api/user/signup
@access public
*/
const signup = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User Already existed!")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            username: user.name,
            message: 'User Registered'
        })
    }
    else {
        res.status(400);
        throw new Error("An Error Occured")
    }
})

/*
@desc GET User
@route GET /api/user/current
@access public
*/
const current = asynchandler(async (req, res, next) => {
    res.send('hello')
})

module.exports = {
    login,
    signup,
    current
}