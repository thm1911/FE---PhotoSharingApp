import { ArrowRightAlt } from "@mui/icons-material";
import {
    Backdrop,
    Box,
    Button,
    CardMedia,
    Grid,
    Stack,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../../images/background_dashboard.jpg';
import CustomButton from "../../common/CustomButton";
import { useState, useEffect } from "react";

const Welcome = (props) => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        setOpenSnackbar(true);
    }, []);

    return (
        <Grid item flex={1}>
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
                height={"100vh"}
                flexDirection={"column"}
            >
                <CardMedia
                    component="div"
                    image={backgroundImage}
                    alt={`DashBoard intro`}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Stack spacing={1} alignItems={"center"} backgroundColor='rgba(0, 0, 0, 0.4)' padding={5}>
                        <Typography variant="h4" color={"wheat"}>
                            Spread love
                        </Typography>
                        <Typography variant="h6" color={"wheat"}>
                            <b>Where dogs and cats find love – and you find smiles!</b>
                        </Typography>
                        <Typography variant="h6" color={"wheat"}>
                            Join our community
                        </Typography>
                        <CustomButton
                            id="goToRegisterButton"
                            children={"Explore now"}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Explore now
                            <ArrowRightAlt sx={{ ml: 1 }} />
                        </CustomButton>
                    </Stack>
                </CardMedia>
            </Box>

            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="info" sx={{ width: '100%' }}>
                    Please login to explore our community!
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default Welcome;
