import './App.css';

import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper, Box, Snackbar, Alert } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserPhotos from "./components/UserPhotos";
import Auth from './components/Auth';
import Home from './components/DashBoard/Page/Home';
import DashBoard from './components/DashBoard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import InitialPage from './components/DashBoard/Page/InitialPage';
import UserComment from './components/UserComments';

const App = (props) => {
  const [alert, setAlert] = useState(false);
  const token = localStorage.getItem("tokenExpired");

  useEffect(() => {
    if (token) {
      setAlert(true);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

    }
  }, [token]);


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
            <Route
              index
              path="/photos/:userId"
              element={
                <ProtectedRoute>
                  <UserPhotos />
                </ProtectedRoute>
              }
            />

            <Route
              index
              path="/commentOfUser/:userId"
              element={
                <ProtectedRoute>
                  <UserComment />
                </ProtectedRoute>
              }
            />

          </Route>
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
        </Routes>
      </Router>

      <Snackbar
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Token has expired. Please login again.</Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
