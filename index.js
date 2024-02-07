// importation of modules
const express = require("express");
//the variable app holds an instance of express app
const app = express();
const moment = require("moment")
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const patientRoute = require("./routes/patientRecords")
const vitalsRoute = require("./routes/vitals")
const authRoute = require("./routes/auth")
const middlewareRoute = require("./middleware/AuthMiddleware")


//middleware
//app.use defines a middleware function

app.use(cookieParser());
//to allow cross-origin resources sharing
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["GET","POST","PATCH","DELETE"],
        credentials:true
    }
));
//parse incoming JSON payload(data) into the request body
app.use(express.json())

//routes
app.use("/api/v1",patientRoute)
app.use("/api/v1",vitalsRoute)
app.use("/api/v1",authRoute)
app.use("/api/v1",middlewareRoute)
const Port = process.env.PORT || 5000

//initializing and starting the express application
const start = async()=>{
    try {
        //connection to mongoose through dotenv file
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
        //start the express sever
        app.listen(Port,()=>{console.log(`Server listening on Port ${Port}...`)})
    } catch (error) {
        console.log(error);
    }
};
start()