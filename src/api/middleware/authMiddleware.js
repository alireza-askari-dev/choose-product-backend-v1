const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../data/models/userModel');

const responsehandler = require('../helper/consts/messageHandler');

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            req.user = await User.findById(decoded?.id).select('-password')

            next()
        } catch (error) {
            res.status(200)
            res.json({
                isSuccess: false,
                message: "you dont have access!"
            })
        }
    }

    if (!token) {
        res.status(200)
        res.json({
            isSuccess: false,
            message: "you dont have access!"
        })
    }
})

module.exports = { protect }