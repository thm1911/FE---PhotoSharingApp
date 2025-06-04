import { LoadingButton } from "@mui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    FormControl,
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

const UpdateInfor = (props) => {
    const { open, onClose, userInfo } = props;
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
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

    // const updateInfor = async (event) => {
    //     try {
    //         console.log("update");
    //         setLoading(true);
    //         const res = await fetchModel(
    //             "/api/user/me",
    //             "put",
    //             JSON.stringify(event)
    //         );
    //         if (res.success) {
    //             dispatch(setUser({ user: res?.data }));
    //             onClose();
    //             navigate(`/users/${user._id}`);
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         console.log("🚀 ~ handleSubmit ~ error:", error);
    //         setLoading(false);
    //     }
    // };
    return (
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
                    </Stack>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <CustomButton variant="text" onClick={onClose}>{"Cancel"}</CustomButton>
                <CustomButton
                    // onClick={handleSubmit(updateInfor)}
                    loading={loading}
                    variant="contained"
                >
                    {"Update"}
                </CustomButton>
            </DialogActions>
        </Dialog>
    );
};
export default UpdateInfor;
