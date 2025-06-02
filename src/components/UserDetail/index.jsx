import React, { useEffect, useState } from "react";
import {Avatar, Box, Typography} from "@mui/material";

import "./styles.css";
import {Link, useParams} from "react-router-dom";
import { Button, Card, CardContent, Grid } from "semantic-ui-react";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import fetchModel from "../../lib/fetchModelData";
import CustomButton from "../common/CustomButton";
import { Padding } from "@mui/icons-material";

function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const response = await fetchModel(`/api/user/${userId}`, "GET", null, token);
      if (response.success) {
        console.log("🚀 ~ fetchUser ~ response:", response);
        setUser(response.data);
      }
      else {
        console.log("🚀 ~ fetchUser ~ response:", response);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <Grid container justifyContent="center" sx={{ mt: 4, px: 2 }}>
      <Grid item xs={11} sm={8} md={6}>
        <Card elevation={4} sx={{ p: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={3} mb={3}>
              <Avatar sx={{ bgcolor: "#30d5c8", width: 80, height: 80 }}>
                <Typography variant="h4">
                  {user.first_name[0]}
                </Typography>
              </Avatar>
              <Typography variant="h4">
                {user.first_name} {user.last_name}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <WorkIcon
                sx={{ fontSize: 20, color: "#1976d2", verticalAlign: "middle" }}
              />
              <strong> Occupation: </strong> {user.occupation}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <PlaceIcon
                sx={{ fontSize: 20, color: "red", verticalAlign: "middle" }}
              />
              <strong> Location: </strong> {user.location}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {user.description}
            </Typography>
            <CustomButton
              variant="contained"
              startIcon={<InsertPhotoIcon />}
            >
              View Photos
            </CustomButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserDetail;

