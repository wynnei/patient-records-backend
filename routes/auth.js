const User = require("../models/User");
const router = require("express").Router()
const {createSecretToken} =require("../util/SecretToken")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
//SIGHNUP
router.post("/registerUser",async(req,res,next) =>{
    try {
        // get the details off request body
        const {email,userName, password} = req.body
        // check if the user already exits
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({message:"User already exists"})
        }
        // hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password,10);
        // create new user
        const user = await User.create({email,userName, password:hashedPassword})
        // create secret token and store in cookies
        const token = createSecretToken (user._id);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        })
        res.status(201).json({message:"User registered successfully",user})
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
})

//LOGIN
router.post("/login",async(req,res,next)=>{
    try {
        //get email and password off req.body
        const {email,password}=req.body
        if(!email || !password){
            return res.json({message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.json({message:"Incorect email or password"})
        }
        const auth = await bcrypt.compare(password,user.password)
        if(!auth){
            return res.json({message:"Incorect email or password"})
        }
        const token = createSecretToken(user._id);
        res.cookie("token",token,{
            withCredentials:true,
            httpOnly:false
        })
        res.status(201).json({message:"User logged in successfully",success:true})
        next()
    } catch (error) {
        
    }
})

module.exports = router