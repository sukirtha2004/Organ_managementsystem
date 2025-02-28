import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Card, CardContent, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const Recipient = () => {
  const [recipient, setRecipient] = useState({
    name: "",
    age: "",
    blood_group: "",
    height: "",
    weight: "",
    location: "",
    organ_needed: "",
    medical_report: null,
    urgency_level: "",
  });

  const urgencyLevels = [1, 2, 3, 4, 5];

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
    setRecipient({ ...recipient, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setRecipient({ ...recipient, medical_report: e.target.files[0] });
  };

  const checkCompatibility = async () => {
    try {
      const formData = new FormData();
      Object.keys(recipient).forEach((key) => {
        formData.append(key, recipient[key]);
      });

      const response = await axios.post("http://localhost:5000/api/recipients/check", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCompatibleDonors(response.data);
    } catch (error) {
      console.error("Error checking compatibility:", error);
    }
  };

  const [compatibleDonors, setCompatibleDonors] = useState([]);

  return (
    <Container style={{ padding: "20px", maxWidth: "600px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Recipient Information
      </Typography>

      <TextField label="Recipient Name" name="name" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Age" name="age" type="number" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Blood Group" name="blood_group" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Height (cm)" name="height" type="number" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Weight (kg)" name="weight" type="number" fullWidth margin="normal" onChange={handleChange} required />
      <TextField label="Hospital Location" name="location" fullWidth margin="normal" onChange={handleChange} required />

      <FormControl fullWidth margin="normal">
        <InputLabel>Organ Needed</InputLabel>
        <Select name="organ_needed" value={recipient.organ_needed} onChange={handleChange} required>
          {organOptions.map((organ, index) => (
            <MenuItem key={index} value={organ}>
              {organ}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Urgency Level (1 - Most Urgent)</InputLabel>
        <Select name="urgency_level" value={recipient.urgency_level} onChange={handleChange} required>
          {urgencyLevels.map((level) => (
            <MenuItem key={level} value={level}>
              Level {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <input type="file" accept="application/pdf" onChange={handleFileChange} required />

      <Button variant="contained" color="primary" fullWidth onClick={checkCompatibility} style={{ marginTop: "10px" }}>
        Check Compatibility
      </Button>

      {compatibleDonors.length > 0 && (
        <>
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            Compatible Donors:
          </Typography>
          <Grid container spacing={2}>
            {compatibleDonors.map((donor) => (
              <Grid item xs={12} key={donor._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {donor.organ_type} - {donor.blood_group}
                    </Typography>
                    <Typography>Donor: {donor.name}</Typography>
                    <Typography>Height: {donor.height} cm</Typography>
                    <Typography>Weight: {donor.weight} kg</Typography>
                    <Typography>Hospital Location: {donor.location}</Typography>
                    <Typography>Status: {donor.availability_status}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Recipient;
