import './App.css';

import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import DashBoard from './components/DashBoard';
import Login from './components/Auth/Login';
import Auth from './components/Auth';

const App = (props) => {
  return (
    <Box bgcolor={"#E4E6EB"}>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />}/>
          <Route path="/login" element={<Auth authRoute="login" />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
