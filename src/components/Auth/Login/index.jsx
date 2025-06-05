import { Alert, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../../lib/fetchModelData";
import CustomTextField from "../../common/CustomTextField";
import CustomButton from "../../common/CustomButton";
import { setAuthToken, setUserId, getUserId, getAuthToken } from "../../../common/functions";

const Login = () => {
  console.log("~ Login ~ " + "Token:" + getAuthToken())
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
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
        setUserId(res?.user?.id);
        setAlert({ type: "success", msg: res.message });
        navigate("/users");
      }
    } catch (error) {
      setAlert({ type: "error", msg: error.message });
      console.log("❌ Error login:", error);
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
