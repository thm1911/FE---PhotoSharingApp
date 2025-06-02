import './App.css';

import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Auth from './components/Auth';
import DashBoard from './components/Auth/DashBoard';
import Home from './components/DashBoard/Page/Home';
import PublicRoute from "./components/common/PublicRoute";

const App = (props) => {
  return (
    <Box bgcolor={"#E4E6EB"}>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Auth authRoute="login" />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Auth authRoute="register" />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
