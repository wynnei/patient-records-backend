const router = require("express").Router()
const Patient = require("../models/PatientRecord")
const moment = require("moment");
const tz = require("moment-timezone")
//Routes
//CREATE PATIENT
router.post("/register",async(req,res)=>{
    //res.send("post operation")
    try {
        // get details off request body
        const {firstName,lastName,dateOfBirth,gender,identificationNum}  = req.body
        // check if the patient already exist in the database
        const existingPatient = await Patient.findOne({identificationNum})
        if(existingPatient){
            //patient already exists retrieve details
            res.status(200).json({message:"Patient already exists",existingPatient})
        }
        else{
            // use moment to format the date
            const formattedDateOfBirth = moment(dateOfBirth).tz("Africa/Nairobi").toDate()
            //capture details for new patient by first creating an instance of Patient
            const newPatient = new Patient({firstName,lastName,dateOfBirth:formattedDateOfBirth,gender,identificationNum})
            // save patient
            await newPatient.save()
            res.status(201).json(newPatient)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
})
//GET PATIENT
//GET ALL PATIENTS
router.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//UPDATE PATIENT
//DELETE PATIENT
module.exports = router;