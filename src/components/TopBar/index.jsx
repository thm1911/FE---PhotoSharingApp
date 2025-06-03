import React from "react";
import { AppBar, Button, ListItemIcon, Stack, Toolbar, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { getAuthToken, removeAuthToken } from "../../common/functions";
import CustomButton from "../common/CustomButton";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const navigate = useNavigate();
  const token = getAuthToken();

  const logout = async () => {
    const res = await fetchModel("/admin/logout", "post");
    try {
      if (res.success) {
        removeAuthToken();
        navigate("/login");
      }
    } catch (error) {
      console.log("❌ Error logout:", error.message);
    }
  }

  return (
    <AppBar className="topbar-appBar">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <ListItemIcon>
            <PetsIcon
              fontSize="large"
              sx={{ color: "white" }}
            />
          </ListItemIcon>
        </Stack>
        {token ? (
          <CustomButton variant="text" color="white" onClick={() => {
            logout()
          }}>
            Logout
          </CustomButton>
        ) : (
          <CustomButton variant="text" color="white" onClick={() => navigate("/login")}>
            Login
          </CustomButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
