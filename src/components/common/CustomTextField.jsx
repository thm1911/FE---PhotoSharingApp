import { TextField } from "@mui/material";
import React from "react";

const CustomTextField = ({
  name,
  label,
  type = "text",
  required = false,
  register,
  errors,
  ...props
}) => {
  return (
    <TextField
      margin="normal"
      required={required}
      fullWidth
      id={name}
      label={label}
      name={name}
      type={type}
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
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
        '& .MuiInputBase-input': {
          color: '#333',
        }
      }}
      {...props}
    />
  );
};

export default CustomTextField; 