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