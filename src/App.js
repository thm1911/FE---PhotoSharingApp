import './App.css';

import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Auth from './components/Auth';
import Home from './components/DashBoard/Page/Home';
import DashBoard from './components/DashBoard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import InitialPage from './components/DashBoard/Page/InitialPage';

const App = (props) => {
  return (
    <Box bgcolor={"#E4E6EB"}>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route 
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
          >

            <Route index
              path="/users"
              element={
                <ProtectedRoute>
                  <InitialPage />
                </ProtectedRoute>}
            />
            <Route
              index
              path="/users/:userId"
              element={
                <ProtectedRoute>
                  <UserDetail />
                </ProtectedRoute>
              }
            />


          </Route>
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
