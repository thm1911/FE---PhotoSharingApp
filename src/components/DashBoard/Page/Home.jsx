import '../../../App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import TopBar from '../../TopBar';
import UserList from '../../UserList';
import UserDetail from '../../UserDetail';
import UserPhotos from '../../UserPhotos';
import { getAuthToken, getUserId } from '../../../common/functions';


const Home = (props) => {

    console.log("🚀 ~ Login ~ Token:" + getAuthToken())
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TopBar />
                </Grid>
                <div className="main-topbar-buffer" />
                <Grid item sm={3}>
                    <Paper className="main-grid-item" >
                        <UserList />
                    </Paper>
                </Grid>
                <Grid item sm={9}>
                    <Paper className="main-grid-item">
                        <Outlet />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
