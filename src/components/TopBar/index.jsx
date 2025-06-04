import React, { useEffect, useState } from "react";
import { AppBar, Button, ListItemIcon, Stack, Toolbar, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { getAuthToken, getUserId, removeAuthToken } from "../../common/functions";
import CustomButton from "../common/CustomButton";
import fetchModel from "../../lib/fetchModelData";
import ItemMenu from "./item/ItemMenu";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const location = useLocation();
  const path = location.pathname.split("/");
  const title = path[1];
  const userId = path[2];
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetchModel(`/api/user/${userId}`, "GET", null, token);
      if (response.success) {
        setUser(response.data);
      } else {
        console.log("❌ Error get list user:", response);
      }
    } catch (error) {
      console.error("❌ Error get user:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const id = getUserId();
      const response = await fetchModel(`/api/user/${id}`, "GET", null, token);
      if (response.success) {
        setCurrentUser(response.data);
      } else {
        console.log("❌ Error get current user:", response);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchUser();
    fetchCurrentUser();
  }, [userId]);

  console.log("🚀 ~ title:", title);

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
          {
            token ? (
              <>
                {
                  userId ? (
                    <Typography variant="h6" color={"white"} component={"span"} >
                      {title === "photos"
                        ? "Photos of"
                        : title === "commentOfUser"
                          ? "Comments of"
                          : "Profile of"
                      }
                      {` ${user?.first_name} ${user?.last_name}`}

                    </Typography>
                  ) : (
                    <Typography variant="h6" color={"white"} >Select user to view</Typography>
                  )
                }
              </>
            ) : (
              <Typography variant="h6" color={"white"}>Photo sharing</Typography>
            )
          }
        </Stack>
        {token ? (
          <ItemMenu userInfo={currentUser} visible={true} />
        ) : (
          <CustomButton variant="text" color="white" onClick={() => navigate("/login")}>
            Login
          </CustomButton>
        )}
      </Toolbar>
    </AppBar >
  );
}

export default TopBar;
