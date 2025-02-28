const asyncHandler  = require("express-async-handler")
const Recipient = require("../models/recipientmodels")


const getRecipient = asyncHandler(async(req, res) => {
    const recipients = await Recipient.find();
    res.status(200).json(recipients);
});


const createRecipients = asyncHandler(async(req,res)=>
    {
        const{name,age,email,contactNumber,gender,address,
        bloodGroup,requiredTissueType, urgencyLevel, doctorName,hospitalName,allergy,location,
        consent, informationAccuracy} = req.body;
        if(!name||!age||!email||!contactNumber||!gender||!address||!bloodGroup||
            !requiredTissueType||!urgencyLevel||!doctorName||!hospitalName||!allergy||!location||
            !consent||!informationAccuracy)
            {
                res.status(400);
                throw new Error("All fields are mandatory")
            }
        const recipient = await Recipient.create({
        name,age,email,contactNumber,gender,address,bloodGroup,
        requiredTissueType,urgencyLevel,doctorName,hospitalName,allergy,location,
        consent, informationAccuracy
        });
        res.status(201).json(recipient);
    });


const getSingleDRecipient = asyncHandler(async(req,res)=>{
    const recipient = await Recipient.findById(req.params.id);
    if(!recipient)
    {
        res.status(404);
        throw new Error("Recipient not found");
    }
    res.status(200).json(recipient);
});


const updateRecipient = asyncHandler(async(req,res)=>{
    const recipient = await Recipient.findById(req.params.id);
    if(!recipient)
    {
        res.status(404);
        throw new Error("Recipient not found");
    }

    const updatedRecipient = await Recipient.findById(
        req.params.id,
        req.body,
        {new: true}
);
res.status(200).json(updatedRecipient)
})

//delete donor
const deleteRecipient = asyncHandler(async(req,res)=>
    {
        const recipient = await Donor.findById(req.params.id);
        if(!recipient)
        {
            res.status(404);
            throw new Error("Recipient not found");
        }
        await Recipient.remove();
        res.status(200).json({message:"recipient is removed"});
    })
module.exports = {getRecipient,createRecipients,getSingleDRecipient,updateRecipient,deleteRecipient};