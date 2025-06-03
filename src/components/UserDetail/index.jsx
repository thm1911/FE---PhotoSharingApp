import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardContent, Grid } from "semantic-ui-react";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import fetchModel from "../../lib/fetchModelData";
import CustomButton from "../common/CustomButton";
import { Padding } from "@mui/icons-material";
import { getAuthToken } from "../../common/functions";
import { useNavigate } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getAuthToken();
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
    fetchUser();
  }, [userId]);

  return (
    <Box sx={{
      px: 2, py: 2, bgcolor: "white", borderRadius: 1, mr: 2
    }}>
      <Grid container justifyContent="center" sx={{ mt: 10, px: 4, py: 3 }}>
        <Grid item xs={11} sm={8} md={6} sx={{ p: 10 }}>
          <Card elevation={4} sx={{ p: 10 }}>
            <CardContent sx={{ p: 10 }}>
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <Avatar sx={{ bgcolor: "#30d5c8", width: 80, height: 80 }}>
                  <Typography variant="h4">
                    {user?.first_name?.[0]}
                  </Typography>
                </Avatar>
                <Typography variant="h4">
                  {user?.first_name} {user?.last_name}
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
                <strong> Occupation: </strong>
                {user?.occupation}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PlaceIcon
                  sx={{ fontSize: 20, color: "red", verticalAlign: "middle" }}
                />
                <strong> Location: </strong>
                {user?.location}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                {user?.description}
              </Typography>
              <CustomButton
                variant="contained"
                startIcon={<InsertPhotoIcon />}
                onClick={() => {
                  navigate(`/photos/${userId}`);
                }}
              >
                View Photos
              </CustomButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDetail;

