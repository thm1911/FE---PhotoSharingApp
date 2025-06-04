import '../../../App.css';

import React, { useState } from "react";
import { Grid, Typography, Paper, SpeedDial, SpeedDialIcon, SpeedDialAction, Box, IconButton, Snackbar, Alert } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import TopBar from '../../TopBar';
import UserList from '../../UserList';
import UserDetail from '../../UserDetail';
import UserPhotos from '../../UserPhotos';
import { getAuthToken, getUserId } from '../../../common/functions';
import { AddAPhoto, AddBox } from '@mui/icons-material';
import CreatePhoto from '../../UserPhotos/item/CreatePhotos';
import fetchModel from '../../../lib/fetchModelData';



const Home = (props) => {
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setUploaded(null);
        setError(null);
        setDescription("");
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("file" + file);
        setSelectedFile(file);
        if (file) {
            setUploaded(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async () => {
        console.log("selectedFile" + selectedFile.path);
        if (!selectedFile) {
            setError("Please select a file");
            return;
        }
        setLoading(true);
        setError(null);
        const formData = new FormData();
        const token = getAuthToken();
        formData.append("photo", selectedFile);
        formData.append("description", description);
        formData.append("user_id", getUserId());

        try {
            const res = await fetchModel("/api/photosOfUser/upload", "POST",
                formData,
                token);
            if (res.success) {
                setOpenSnackbar(true);
                setOpen(false);
                setSelectedFile(null);
                setUploaded(null);
                setError(null);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TopBar />
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3} sx={{ ml: 2 }}>
                <Paper style={{ maxHeight: "75vh", overflow: "auto" }}>
                    <UserList />
                </Paper>
            </Grid>
            <Grid item sm={8.5}>
                <Outlet />
            </Grid>

            <Box sx={{ position: "fixed", bottom: 10, left: 10, backgroundColor: "transparent" }}>
                <IconButton color="black">
                    <AddBox sx={{ fontSize: 60, color: "#F29F05" }}
                        onClick={() => setOpen(true)} />
                </IconButton>
            </Box>

            <CreatePhoto open={open}
                onClose={handleClose}
                handleFileChange={handleFileChange}
                uploaded={uploaded}
                description={description}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
                loading={loading}
                error={error}
            />

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Photo uploaded successfully!
                </Alert>
            </Snackbar>

        </Grid>
    );
}

export default Home;
