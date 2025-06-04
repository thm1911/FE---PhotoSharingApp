import { CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import HiddenInput from "../../common/HiddenInput";
import CustomButton from "../../common/CustomButton";
import { useState } from "react";

const CreatePhoto = (props) => {
    const {
        open,
        onClose,
        uploaded,
        handleFileChange,
        handleSubmit,
        loading,
        description,
        setDescription,
        error,
    } = props;

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle fontWeight={"bold"}>Upload your photo</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                {uploaded && (
                    <DialogContentText>
                        Preview image
                    </DialogContentText>
                )}
                {uploaded && <img src={uploaded} />}
                <DialogContentText>
                    Select an image to upload
                </DialogContentText>
                <CustomButton
                    component="label"
                    role={undefined}
                    variant="outlined"
                    startIcon={<CloudUpload sx={{ color: "#F29F05" }} />}
                >
                    Add your photo
                    <HiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </CustomButton>
                <DialogContentText mt={2}>
                    {error && <Alert severity="error">{error}</Alert>}
                </DialogContentText>
                <DialogContentText>
                    Description:
                </DialogContentText>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#F29F05',
                            },
                            '&:hover fieldset': {
                                borderColor: '#F28705',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#F29F05',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#F29F05',
                            '&.Mui-focused': {
                                color: '#F29F05',
                            },
                        },
                    }}
                />

            </DialogContent>
            <DialogActions>
                <CustomButton variant="text" onClick={onClose}>Cancel</CustomButton>
                <CustomButton
                    variant="contained"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Upload
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};
export default CreatePhoto;
