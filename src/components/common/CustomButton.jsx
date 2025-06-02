import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  children,
  variant = "contained",
  color = "#F29F05",
  onClick,
  isSubmit = false,
  error = false,
  ...props
}) => {
  const buttonStyles = {
    textTransform: 'none',
    backgroundColor: variant === "contained" ? color : "transparent",
    color: variant === "contained" ? "white" : color,
    '&:hover': {
      backgroundColor: variant === "contained" ? "#F28705" : "transparent",
    },
    '&.Mui-disabled': {
      backgroundColor: error ? '#ffcdd2' : 'rgba(0, 0, 0, 0.12)',
      color: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.26)',
    },
    ...props.sx
  };

  if (isSubmit) {
    return (
      <Button
        variant={variant}
        type="submit"
        disabled={error}
        sx={buttonStyles}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      type="submit"
      disabled={error}
      sx={buttonStyles}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton; 