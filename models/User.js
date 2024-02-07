// create a schema for health care workers to register and login in order to access patient records
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("HealthCareUser",UserSchema)