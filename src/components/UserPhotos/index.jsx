import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import ItemPhoto from "./item/ItemPhoto";
import { Grid } from "semantic-ui-react";
import fetchModel from "../../lib/fetchModelData";
import { getAuthToken } from "../../common/functions";
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:3001"); 

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

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


  return (
    <Box container spacing={2}>
      {photos.map((photo) => (
        <ItemPhoto userInfo={userInfo} photo={photo} />
      ))}
    </Box>
  );
}

export default UserPhotos;
