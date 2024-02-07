
const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const router =require("express").Router();
// checks if the user has access to the route by checking if the tokens match. 

router.post("/",(req,res)=>{
 // extract JWT from cookies
    const token = req.cookies.token;
    if(!token){
        return res.json({status:false})
    }
    jwt.verify(token,process.env.TOKEN_KEY ,async(err,data)=>{
        if(err){
            return res.json({status:false})
        }
        else{
    // retrieve user based on user Id
            const user = await User.findById(data.id)
            if(user){
                return res.json({status:true,user:user.userName})
            }
            else{
                return  res.json({status:false})
            }
        }
    })
})

module.exports = router