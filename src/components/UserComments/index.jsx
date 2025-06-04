import { Avatar, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { getAuthToken } from "../../common/functions";

// import "./styles.css";
const UserComment = (props) => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    const [photo, setPhoto] = useState([]);
    const token = getAuthToken();
    const navigate = useNavigate();

    const loadData = async () => {
        try {
            const response = await fetchModel(`/api/commentsOfUser/${userId}`, "GET", null, token);
            const commentsData = response?.data;

            // Fetch photo information for each comment
            const commentsWithPhotos = await Promise.all(
                commentsData.map(async (comment) => {
                    const photoResponse = await fetchModel(
                        `/api/photosOfUser/photo/${comment.photo_id}`,
                        "GET",
                        null,
                        token
                    );
                    return {
                        ...comment,
                        photo: photoResponse?.data
                    };
                })
            );

            setComments(commentsWithPhotos);
        } catch (error) {
            console.log("🚀 ~ loadData ~ error:", error);
        }
    }

    useEffect(() => {
        loadData();
    }, [userId]);

    const goToUser = (userId) => {
        navigate(`/users/${userId}`);
    };

    const goToPhoto = (userId) => {
        navigate(`/photos/${userId}`);
    };

    return (
        <Stack spacing={2} bgcolor={"white"} p={2} borderRadius={2}>
            {comments?.map((items, index) => {
                return (
                    <>
                        <Stack
                            direction="row"
                            spacing={1}
                            style={{ cursor: "pointer" }}
                            onClick={() => goToPhoto(items?.photo?.user_id)}
                        >
                            <img

                                src={
                                    items?.photo?.file_path ?
                                        items?.photo?.file_path :
                                        `../../images/${items?.photo?.file_name}`
                                }
                                alt={items?.file_name}
                                loading="lazy"
                                style={{
                                    objectFit: "cover",
                                    height: "100px",
                                    width: "100px",
                                    borderRadius: "5px"
                                }}
                            />
                            <Stack>
                                <Typography
                                    onClick={() => goToUser(userId)}
                                    style={{
                                        display: "flex",
                                        cursor: "pointer",
                                        color: "black",
                                        fontWeight: "bold",
                                        marginBottom: 5,
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: "#30d5c8",
                                            mr: "12px",
                                        }}
                                    >
                                        {items?.user?.first_name[0]}
                                    </Avatar>
                                    {`${items?.user?.first_name} ${items?.user?.last_name}`}
                                </Typography>
                                <Typography className="breakword">{`${items?.comment}`}</Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    textAlign={"left"}
                                >
                                    {moment(items?.date_time).format("llll")}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                    </>

                );
            })}
        </Stack>
    )
};
export default UserComment;
