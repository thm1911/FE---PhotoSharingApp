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
import { useLocation, useNavigate } from "react-router-dom";


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
  // useEffect(() => {
  //   socketComment.on("commented", () => getData());
  // }, [socketComment]);


  return (
    <>
      <ListItem style={{ cursor: "pointer" }}>
        <Stack direction="row" flex={1}>
          <ListItemText
            primary={`${item?.first_name}`}
            onClick={() => handleClick(item?._id)}
          />
          <Stack direction="row" alignItems={"center"} spacing={2}>
            {numOfComment ? (
              <Avatar
                // onClick={() => goToPhotoUserComment(item?._id)}
                sx={{ backgroundColor: "#d32f2f", width: 24, height: 24 }}
              >
                <Typography variant="body2" color={"whitesmoke"}>
                  {numOfComment}
                </Typography>
              </Avatar>
            ) : null}
            {numOfPhotos ? (
              <Avatar
                onClick={() => goToPhotosOfUser(item?._id)}
                sx={{ backgroundColor: "#2e7d32", width: 24, height: 24 }}
              >
                <Typography variant="body2" color={"whitesmoke"}>
                  {numOfPhotos}
                </Typography>
              </Avatar>
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
