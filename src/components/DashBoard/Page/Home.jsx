import '../../../App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from '../../TopBar';
import UserList from '../../UserList';
import UserDetail from '../../UserDetail';
import UserPhotos from '../../UserPhotos';


const Home = (props) => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TopBar />
                </Grid>
                <div className="main-topbar-buffer" />
                <Grid item sm={3}>
                    <Paper className="main-grid-item">
                        <UserList />
                    </Paper>
                </Grid>
                <Grid item sm={9}>
                    <Paper className="main-grid-item">
                        {/* <Routes>
                                <Route
                                    path="/users/:userId"
                                    element={<UserDetail />}
                                />
                                <Route
                                    path="/photos/:userId"
                                    element={<UserPhotos />}
                                />
                                <Route path="/users" element={<UserList />} />
                            </Routes> */}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
