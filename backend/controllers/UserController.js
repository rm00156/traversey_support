const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.registerUser = asyncHandler( async function(req,res) {

    const {name, email, password} = req.body;

    if( !name || !email || !password) {
        
        res.status(400);
        throw new Error("Please include all fields");
    }

    // find if user already exists

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    } 
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if(user) {
         return res.status(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }

    res.status(400)
    throw new Error('Invalid user data');
});

exports.loginUser = asyncHandler( async function(req,res) {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
      
        // user exists

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }

    res.status(401)
    throw new Error('Invalid credentials');
});

exports.getMe = asyncHandler( async function(req,res) {

    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user);
});

function generateToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}