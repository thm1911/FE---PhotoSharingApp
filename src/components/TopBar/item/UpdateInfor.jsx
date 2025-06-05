import { LoadingButton } from "@mui/lab";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../../lib/fetchModelData";
import CustomDoubleTextField from "../../common/CustomDoubleTextField";
import CustomTextField from "../../common/CustomTextField";
import CustomButton from "../../common/CustomButton";
import { getAuthToken } from "../../../common/functions";
import { socket } from "../../../utils/utils";

const UpdateInfor = (props) => {
    const { open, onClose, userInfo } = props;
    const [alert, setAlert] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();
    const token = getAuthToken();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            location: "",
            description: "",
            occupation: "",
        },
        values: {
            first_name: userInfo?.first_name,
            last_name: userInfo?.last_name,
            location: userInfo?.location,
            description: userInfo?.description,
            occupation: userInfo?.occupation,
        },
    });

    const updateInfor = async (data) => {

        try {
            const res = await fetchModel(
                `/api/user/${userInfo?._id}`,
                "put",
                JSON.stringify(data),
                token
            );
            if (res.success) {
                socket.emit("updateUser", res.data);
                onClose();
                navigate
                    (`/users/${userInfo._id}`);
            }
            else {
                setAlert({ type: "error", msg: res.message });
            }
        } catch (error) {
            console.log("❌ Error update infor:", error.message);
            setAlert({ type: "error", msg: error.message || "Something went wrong" });
        }
    };


    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: "20px", fontWeight: "bold" }}>
                        {"Update Information"}
                    </DialogContentText>
                </DialogContent>
                <DialogContent>
                    <FormControl>
                        <Stack spacing={2}>
                            <CustomDoubleTextField
                                errors={errors}
                                register={register}
                                dataFirst={{
                                    value: "first_name",
                                    label: "First Name",
                                    required: true,
                                }}
                                dataSecond={{
                                    value: "last_name",
                                    label: "Last Name",
                                    required: true,
                                }}
                            />
                            <CustomDoubleTextField
                                errors={errors}
                                register={register}
                                dataFirst={{
                                    label: "Location",
                                    value: "location",
                                }}
                                dataSecond={{
                                    label: "Occupation",
                                    value: "occupation",
                                }}
                            />
                            <CustomTextField
                                margin="normal"
                                fullWidth
                                name="description"
                                label={"Description"}
                                id="description"
                                errors={errors}
                                register={register}
                            />
                            {alert && (
                                <Alert severity={alert.type}>
                                    {alert.msg}
                                </Alert>
                            )}
                        </Stack>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <CustomButton variant="text" onClick={onClose}>{"Cancel"}</CustomButton>
                    <CustomButton
                        onClick={handleSubmit(updateInfor)}
                        variant="contained"
                    >
                        {"Update"}
                    </CustomButton>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default UpdateInfor;
