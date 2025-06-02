import { ArrowRightAlt } from "@mui/icons-material";
import {
    Backdrop,
    Box,
    Button,
    CardMedia,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../../images/background_dashboard.jpg';

const Welcome = (props) => {
    const navigate = useNavigate();
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
                    <Backdrop sx={{ zIndex: 1 }} open={true} />
                    <Stack spacing={1} alignItems={"center"} backgroundColor='rgba(0, 0, 0, 0.4)' padding={5}>
                        <Typography variant="h4" color={"wheat"} zIndex={2}>
                            Spread love
                        </Typography>
                        <Typography variant="h6" color={"wheat"} zIndex={2}>
                            <b>Where dogs and cats find love – and you find smiles!</b>
                        </Typography>
                        <Typography variant="h6" color={"wheat"} zIndex={2}>
                            Join our community
                        </Typography>
                        <Button
                            onClick={() => navigate("/login")}
                            variant="contained"
                            sx={{
                                pr: 1.5,
                                zIndex: 2,
                                backgroundColor: "#F29F05",
                                '&:hover': { backgroundColor: "#F28705" }, textTransform: 'none'
                            }}
                        >
                            Explore now
                            <ArrowRightAlt sx={{ ml: 1 }} />
                        </Button>
                    </Stack>
                </CardMedia>
            </Box>
        </Grid>
    );
};
export default Welcome;
