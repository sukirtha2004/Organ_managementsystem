const mongoose = require("mongoose")

const recipientSchema = mongoose.Schema({
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
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: true
    },
    requiredTissueType: {
        type: [String],  
        enum: ['Cornea', 'Bone', 'Skin', 'Heart Valves', 'Tendons', 'Cartilage', 'Other'],
        required: true
    },
    urgencyLevel: {
        type: String,
        enum: ['Emergency', 'Urgent', 'Normal'],
        required: true
    },

    doctorName:{
        type:String,
        required: true,
    },
    hospitalName:{
        type:String,
        required: true,
    },
    allergy:{
        type:String,
        required: true,
    },
    location:
    {
        type:String,
        required: true,
    },
    consent: {
        type: Boolean,  
        required: true
    },
    informationAccuracy: {
        type: Boolean,  
        required: true
    },


})

module.exports = mongoose.model("Recipient",recipientSchema);