import {
  Avatar,
  Divider,
  ListItem,
  
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAuthToken } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CircleButton from "../../common/CircleButton";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const ItemUser = (props) => {
  const { item, handleClick, isLast } = props;
  const [numOfPhotos, setNumOfPhotos] = useState(0);
  const [numOfComment, setNumOfComment] = useState(0);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const arrPath = pathname?.split("/");

  const getData = async () => {
    try {
      const token = getAuthToken();
      const photos = await fetchModel(`/api/photosOfUser/${item?._id}`, "GET", null, token);

      if (photos?.success) setNumOfPhotos(photos?.data?.length);

      const photoUserComment = await fetchModel(
        `/api/commentsOfUser/${item?._id}`, "GET", null, token
      );

      if (photoUserComment?.success) setNumOfComment(photoUserComment?.data?.length);
    } catch (error) {
      console.log("🚀 ~ getData ~ error:", error);
    }
  };

  const goToPhotoUserComment = (userId) => {
    navigate(`/commentOfUser/${userId}`);
  };

  const goToPhotosOfUser = (userId) => {
    navigate(`/photos/${userId}`);
  };

  useEffect(() => {
    getData();
  }, []);


  useEffect(() => {
    socket.on("newComment", () => {
      getData();
    });

    socket.on("newPhoto", () => {
      getData();
    });

  }, []);

  return (
    <>
      <ListItem style={{ cursor: "pointer" }}>
        <Stack direction="row" flex={1} alignItems={"center"}>
          <ListItemText
            primary={`${item?.first_name}`}
            onClick={() => handleClick(item?._id)}
          />
          <Stack direction="row" alignItems={"center"} spacing={2}>
            {numOfComment ? (
              <CircleButton
                primary="red"
                secondary="#d32f2f"
                onClick={() => goToPhotoUserComment(item?._id)}
              >
                {numOfComment}
              </CircleButton>
            ) : null}
            {numOfPhotos ? (
              <CircleButton
                primary="green"
                secondary="darkgreen"
                onClick={() => goToPhotosOfUser(item?._id)}
              >
                {numOfPhotos}
              </CircleButton>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </ListItem>
      {!isLast && <Divider />}
    </>
  );
};
export default ItemUser;
