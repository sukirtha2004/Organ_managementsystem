const mongoose = require("mongoose")

const donorSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter the name"],
    },
    age:{
        type:Number,
        required:[true,"Please enter the age"]
    },
    email:{
        type:String,
        required:[true,"Please enter the email address"]
    },
    contactNumber:{
        type:String,
        required:[true,"Please enter the contact number"]
    },
    gender:
    {
        type:String,
        required:[true,"Please enter the gender"]
    },
    address:{
     type:String,
     required:[true,"Please enter the address"]
    },
    chronic:{
        type:String,
        required:[true,"Please enter the chronic disease"]
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], // Restrict to valid blood groups
        required: true
    },
    medicationPdfUrl:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:[true,"Please enter the preferable location"],
    },
    typeOfDonation: {  
        type: [String],  
        enum: ['Blood', 'Plasma', 'Platelets', 'Bone Marrow', 'Cornea', 'Skin', 'Heart Valves', 'Other'], 
        required: true
    },
    consent: {
        type: Boolean,  
        required: true
    },
    informationAccuracy: {
        type: Boolean,  
        required: true
    }
});

module.exports = mongoose.model("Donor" , donorSchema)