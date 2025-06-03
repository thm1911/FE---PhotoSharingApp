// import AlertMessage from "@components/layout/AlertMessage";

import {
  Alert,
  Button,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { loadUser, saveAuthToken } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
// import { translate } from "../../../utils/i18n/translate";
import CustomButton from "../../common/CustomButton";
import MyTextField from "../../common/CustomDoubleTextField";
import CustomTextField from "../../common/CustomTextField";
import CustomDoubleTextField from "../../common/CustomDoubleTextField";
import { getAuthToken, setAuthToken, setUserId } from "../../../common/functions";
const Register = () => {
  console.log("🚀 ~ Login ~  Token:" + getAuthToken())
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      location: "",
      description: "",
      occupation: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setAlert({ type: "error", msg: "Passwords do not match" });
        return;
      }
      const { confirmPassword, ...registerData } = data;

      const res = await fetchModel(
        "/admin/register",
        "post",
        JSON.stringify(registerData)
      );

      if (res.success) {
        setAuthToken(res.token);
        setUserId(res?.user?.id);
        setAlert({ type: "success", msg: res.message });
        navigate("/users");
      } else {
        setAlert({ type: "error", msg: res.message });
      }
    } catch (error) {
      console.log("❌ Error register:", error);
      setAlert({ type: "error", msg: error.message || "Something went wrong" });
    }
  };

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      flex={1}
      flexDirection={"column"}
    >
      <List sx={{ overflow: "auto" }}>
        <Stack spacing={2}>
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            id="username"
            register={register}
            errors={errors}
          />
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            register={register}
            errors={errors}
          />
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            register={register}
            errors={errors}
            validation={{
              validate: value => value === password || "Passwords do not match"
            }}
          />

          <CustomDoubleTextField
            errors={errors}
            register={register}
            dataFirst={{
              value: "first_name",
              label: "First name",
              required: true,
            }}
            dataSecond={{
              value: "last_name",
              label: "Last name",
              required: true,
            }}
          />
          <CustomDoubleTextField
            errors={errors}
            register={register}
            dataFirst={{ label: "Location", value: "location" }}
            dataSecond={{ label: "Occupation", value: "occupation" }}
          />

          <CustomTextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            register={register}
            errors={errors}
          />
        </Stack>
      </List>
      {alert && (
        <Alert severity={alert.type}>
          {alert.msg}
        </Alert>
      )}
      <Typography>
        Already have an account?
        <CustomButton
          id="goToLoginButton"
          onClick={() => {
            navigate("/login");
          }}
          variant="text"
        >
          Login
        </CustomButton>
      </Typography>
      <CustomButton variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>
        Register
      </CustomButton>
    </Stack>
  );
};

export default Register;
