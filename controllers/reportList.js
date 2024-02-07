//import model
const Patient = require("../models/PatientRecord");
// get patient report list

exports.getPatientReportList = async(req,res)=>{
    try {
        
        // all patients
const patients = await Patient .find()
//variable to store patient recorder
const report = []
for(const patient of patients ){
    const patientVitals = await Patient.findOne({identificationNum:patient.identificationNum}).sort({date: -1})
    if (patientVitals){
        const patientInfo ={
            fullName :`${patient.firstName} ${patient.lastName}`,
            age:calculateAge(patient.dateOfBirth),
            bmiStatus : calculateBMIStatus(patient.vitals[0].bmi)
        }
        report.push(patientInfo)
    }
}
res.status(200).json(report)
        
    } catch (error) {
        console.log(error);
    }
    
}
// helper function to calculate age
const calculateAge = (dateOfBirth)=>{
    // get the date today
    const today = new Date();
    // convert the provided dateOfBirth into a date object
    const birthDate = new Date(dateOfBirth)
    // difference in years between today and birthDate
    let age = today.getFullYear() - birthDate.getFullYear()
    // get the months difference
    const monthDiff = today.getMonth() - birthDate.getMonth()
    // check if the birthdate for the current month has not occurred 
    // or if the birthdate is later in the current month
    if(monthDiff<0 || (monthDiff === 0 && today.getDate()<birthDate.getDate())){
        // deduct one year in age
        age -- ;
    }
    return age
}

// helper function to culculate BMI status
const calculateBMIStatus=(bmi)=>{
    if(bmi<18){
        return "Underweight"
    }
    else if(bmi >= 18.5 && bmi<25){
        return "Normal"
    }
    else if(bmi >=25){
        return "Overweight"
    }
}