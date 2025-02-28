import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const AddDonor = () => {
  const [donor, setDonor] = useState({
    name: "",
    age: "",
    blood_group: "",
    height: "",
    weight: "",
    organ_type: "",
    location: "", // Added location field
    medical_report: null,
  });

  const organOptions = [
    "Blood",
    "Tissue",
    "Pancreatic Tissues",
    "Stem Cells",
    "Kidney",
    "Liver",
    "Heart",
    "Lung",
    "Cornea",
  ];

  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDonor({ ...donor, medical_report: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(donor).forEach((key) => {
      formData.append(key, donor[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/donors/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Donor Added Successfully!");
    } catch (error) {
      console.error("Error adding donor:", error);
      alert("Failed to add donor");
    }
  };

  return (
    <Container className="container">
      <Typography variant="h4">Register Donor</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Age" name="age" type="number" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Blood Group" name="blood_group" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Height (cm)" name="height" type="number" fullWidth margin="normal" onChange={handleChange} required />
        <TextField label="Weight (kg)" name="weight" type="number" fullWidth margin="normal" onChange={handleChange} required />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Organ to Donate</InputLabel>
          <Select name="organ_type" value={donor.organ_type} onChange={handleChange} required>
            {organOptions.map((organ, index) => (
              <MenuItem key={index} value={organ}>
                {organ}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField 
          label="Hospital Location" 
          name="location" 
          fullWidth 
          margin="normal" 
          onChange={handleChange} 
          required 
        />

        <input type="file" accept="application/pdf" onChange={handleFileChange} required />

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          Add Donor
        </Button>
      </form>
    </Container>
  );
};

export default AddDonor;
