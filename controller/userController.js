import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utility/generateToken.js";

//desc   Auth user and get token 
//routes POST /api/users/login
//access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    
    if(user && ( await(user.matchPassword(password))) ){
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid password or email")
    }
});

//desc   resister a new user
//routes POST /api/users
//access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existUser = await User.findOne({ email })
    
    if(existUser) {
        res.status(401)
        throw new Error("User already have an account")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Data is not valid')
    }
});

//desc   Get user profile
//routes GET api/users/profile
//access private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error("User not Found")
    }
});


export { authUser, registerUser, getUserProfile };
