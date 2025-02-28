import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const SearchOrgan = () => {
  const [query, setQuery] = useState({ organ_type: "", blood_group: "", location: "" });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/donors/available`, {
        params: { 
          organ_type: query.organ_type, 
          blood_group: query.blood_group, 
          location: query.location 
        }
      });
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching available organs:", error);
      alert("Failed to fetch organ availability.");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Search Available Organs</Typography>
      
      <TextField 
        label="Organ Type" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setQuery({ ...query, organ_type: e.target.value })} 
      />
      
      <TextField 
        label="Blood Group" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setQuery({ ...query, blood_group: e.target.value })} 
      />

      <TextField 
        label="Hospital Location" 
        fullWidth 
        margin="normal" 
        onChange={(e) => setQuery({ ...query, location: e.target.value })} 
      />

      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 2 }}>
        Search
      </Button>

      {results.length > 0 ? (
        results.map((donor) => (
          <Typography key={donor._id}>
            {donor.organ_type} available from {donor.name} at {donor.location}
          </Typography>
        ))
      ) : (
        <Typography sx={{ mt: 2 }}>No matching donors found.</Typography>
      )}
    </Container>
  );
};

export default SearchOrgan;
