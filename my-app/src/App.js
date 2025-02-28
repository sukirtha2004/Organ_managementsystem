import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddDonor from "./components/AddDonor";
import SearchOrgan from "./components/SearchOrgan";
import Recipient from "./components/Recipient";
import "./App.css";  // Import global styles


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-donor" element={<AddDonor />} />
        <Route path="/search-organ" element={<SearchOrgan />} />
        <Route path="/Recipient" element={<Recipient />} />
      </Routes>
    </Router>
  );
}

export default App;
