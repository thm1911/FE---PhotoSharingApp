// import AlertMessage from "@components/layout/AlertMessage";

import { Alert, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import {
//   functionAlert,
//   loadUser,
//   saveAuthToken,
// } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import CustomTextField from "../../common/CustomTextField";
import CustomButton from "../../common/CustomButton";
import { setAuthToken } from "../../../common/functions";

const Login = () => {
  //Context
  //   const { loginUser } = useContext(AuthContext);
  //Navigate
  const navigate = useNavigate();

  //Local state
  // const [type, setType] = useState("password");

  const [alert, setAlert] = useState(null);

  // const [loginForm, setLoginForm] = useState({
  //   username: "",
  //   password: "",
  // });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (event) => {
    try {
      const res = await fetchModel(
        "/admin/login",
        "post",
        JSON.stringify(event)
      );

      if (!res.success) {
        setAlert({ type: "error", msg: res.message });
      } else {
        setAuthToken(res?.token);
        setAlert({ type: "success", msg: res.message });
        navigate("/home");
      }
    } catch (error) {
      setAlert({ type: "error", msg: error });
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <Stack
      spacing={2}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      flex={1}
      flexDirection={"column"}
    >
      <CustomTextField
        name="username"
        label="Username"
        required
        register={register}
        errors={errors}
        autoFocus
      />
      <CustomTextField
        name="password"
        label="Password"
        type="password"
        required
        register={register}
        errors={errors}
      />
      {alert && (
        <Alert severity={alert.type}>
          {alert.msg}
        </Alert>
      )}
      <Typography>
        Don't have an account?
        <CustomButton
          id="goToRegisterButton"
          children={"Register"}
          onClick={() => {
            navigate("/register");
          }}
          variant="text"
        >
          Register
        </CustomButton>
      </Typography>
      <CustomButton children={"Login"} isSubmit={true} />
    </Stack>
  );
};

export default Login;
