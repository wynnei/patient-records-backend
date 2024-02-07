// invoke router from express
const router = require("express").Router();
const Patient = require("../models/PatientRecord")
const reportListContoller = require("../controllers/reportList")

router.post("/vitals/:patientId",async(req,res)=>{
    try {
        // get the sent in data off request body
        const {date, height, weight,generalHealth,onDiet,TakingDrugs,comment} = req.body
        // get the spesific patientId and use it to identify the patient
        const patientId = req.params.patientId
        const patient = await Patient.findById(patientId)
        if(!patient){
            res.status(404).json({error:"Patient not found"})
        }
        // calculate BMI
        const bmi = (weight/Math.pow(height/100,2)).toFixed(2)
        // add vitals to the patient record
        patient.vitals.push({date, height, weight,bmi,generalHealth,onDiet,TakingDrugs,comment})
        await patient.save();
        res.status(201).json(patient)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }

})

// get patient report list
router.get("/reportList",reportListContoller.getPatientReportList)
module.exports = router;