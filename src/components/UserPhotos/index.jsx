import React, { useState, useEffect } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import ItemPhoto from "./item/ItemPhoto";
import { Grid } from "semantic-ui-react";
import fetchModel from "../../lib/fetchModelData";
import { getAuthToken } from "../../common/functions";
import { socket } from "../../utils/utils";
import BasicMode from "./item/BasicMode";
import AdvanceMode from "./item/AdvanceMode";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [onComment, setOnComment] = useState([]);
  const [onDelete, setOnDelete] = useState([]);

  const fetchUserInfo = async () => {
    try {
      const token = getAuthToken();
      const response = await fetchModel(`/api/user/${userId}`, "GET", null, token);
      if (response.success) {
        setUserInfo(response.data);
      } else {
        console.log("❌ Error get list user:", response);
      }
    } catch (error) {
      console.error("❌ Error get user:", error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const token = getAuthToken();
      const res = await fetchModel(`/api/photosOfUser/${userId}`, "GET", null, token);
      if (res.success) {
        setPhotos(res.data);
      } else {
        console.log("❌ Error get list user:", res);
      }
    } catch (error) {
      console.error("❌ Error get user:", error);
    }
  };


  useEffect(() => {
    fetchUserInfo();
    fetchPhotos();
    socket.on("newPhoto", (data) => {
      fetchPhotos();
    });

  }, [userId]);

  useEffect(() => {
    socket.on("newComment", (data) => {
      fetchPhotos();
    });
  }, [onComment]);

  useEffect(() => {
    socket.on("deletedPhoto", (data) => {
      fetchPhotos();
    });
  }, [onDelete]);

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={
            <Switch
              checked={isAdvancedMode}
              onChange={(e) => setIsAdvancedMode(e.target.checked)}
              sx={{
                '&.Mui-checked': {
                  color: '#F29F05',
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#F29F05',
                    opacity: 0.5,
                  },
                },
              }}

            />
          }
          label={isAdvancedMode ? "Advanced Mode" : "Basic Mode"}
        />
      </Box>
      {isAdvancedMode ?
        <AdvanceMode
          photos={photos}
          userInfo={userInfo}
          onComment={onComment}
          setOnComment={setOnComment}
          onDelete={onDelete}
          setOnDelete={setOnDelete}
        />
        : <BasicMode
          photos={photos}
          userInfo={userInfo}
          onComment={onComment}
          setOnComment={setOnComment}
          onDelete={onDelete}
          setOnDelete={setOnDelete}
        />}
    </Box>
  );
}

export default UserPhotos;
