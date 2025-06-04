import {
    Bookmark,
    BookmarkBorder,
    Chat,
    Comment,
    CommentOutlined,
    Delete,
    Favorite,
    FavoriteBorderOutlined,
    MoreHoriz,
    Send,
} from "@mui/icons-material";
import {
    Alert,
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Divider,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CommentDetail from "../../UserComments/item/ItemComment";
import fetchModel from "../../../lib/fetchModelData";
import { getAuthToken, getUserId } from "../../../common/functions";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ItemComment from "../../UserComments/item/ItemComment";

const socket = io.connect("http://localhost:3001");


const ItemPhoto = (props) => {
    const { photo, userInfo } = props;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [commentOfPhoto, setCommentOfPhoto] = useState(photo?.comments || []);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const fetchUser = async () => {
        try {
            const token = getAuthToken();
            const userId = getUserId();
            const response = await fetchModel(`/api/user/${userId}`, "GET", null, token);
            if (response.success) {
                await setUser(response.data);
            } else {
                console.log("❌ Error get user:", response);
            }
        } catch (error) {
            console.error("❌ Error get user:", error);
        }
    };

    const postComment = async () => {
        await fetchUser();
        try {
            const token = getAuthToken();
            const req = {
                comment: comment,
                photo_id: photo._id,
                user: user
            }
            const res = await fetchModel(
                `/api/commentsOfUser/post`,
                "post",
                JSON.stringify(req),
                token
            );
            if (res?.success) {
                socket.emit("sendComment", req);
                setOpenSnackbar(true);
                setExpanded(true);
                setComment("");
            }
        } catch (error) {
            console.log("❌ Error post comment:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        setCommentOfPhoto(photo?.comments || []);
        socket.on("newComment", (data) => {
            if (data._id === photo._id) {
                setCommentOfPhoto(prev => [...prev, data]);
            }
        });

    }, [photo]);

    const goToUser = (userId) => {
        navigate(`/users/${userId}`);
    };
   
    return (
        <Grid item xs={16}>
            <Card variant="outlined" sx={{ mb: 3, mr: 2 }}>
                <CardHeader
                    title={
                        <Typography
                            variant="body1"
                            fontWeight={"bold"}
                            style={{ cursor: "pointer" }}
                            onClick={() => goToUser(userInfo?._id)}
                        >
                            {`${userInfo?.first_name} ${userInfo?.last_name}`}
                        </Typography>
                    }
                    subheader={moment(photo?.date_time).format("llll")}
                    avatar={
                        <Avatar
                            sx={{ bgcolor: "#30d5c8" }}
                            onClick={() => goToUser(userInfo?._id)}
                        >
                            {userInfo?.first_name?.[0]}
                        </Avatar>
                    }
               
                />
                <Typography variant="body2" sx={{ marginLeft: 3, marginBottom: 2}}>
                    {photo?.description}
                </Typography>
                <CardMedia
                    component="img"
                    sx={{
                        height: 400,
                        objectFit: "contain",
                    }}
                    src={
                        photo?.file_path ?
                            photo?.file_path :
                            `../../images/${photo?.file_name}`
                    }
                />

                <CardActions>
                    <Stack
                        direction={"row"}
                        flex={1}
                        justifyContent={"space-around"}
                    >
                        <Box display={"flex"} alignItems={"center"}>
                            <IconButton
                                aria-label="add to favorites"
                                // onClick={handleFavorite}
                                color="error"
                            >
                                <FavoriteBorderOutlined />
                            </IconButton>
                            {/* {numOfFavorite} */}
                        </Box>

                        <Box display={"flex"} alignItems={"center"}>
                            <IconButton color="black" onClick={
                                () => {
                                    console.log(photo._id);
                                    setExpanded(!expanded);
                                }
                            }>
                                {expanded ? <Comment /> : <CommentOutlined />}
                            </IconButton>
                        </Box>

                        <Box display={"flex"} alignItems={"center"}>
                            <IconButton color="warning">
                                <Bookmark />
                            </IconButton>
                        </Box>
                    </Stack>
                </CardActions>
                <Divider />

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {photo?.comments?.length ? (
                            <List
                                sx={{
                                    maxHeight: 300,
                                    overflow: "auto",
                                
                                }}
                            >
                                {commentOfPhoto.map((items) => (
                                    <ListItem >
                                        <ItemComment items={items} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography>No comment.</Typography>
                        )}
                    </CardContent>
                </Collapse>
                <Divider />
                <CardActions disableSpacing>
                    <InputBase
                        multiline
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={"Enter your comment..."}
                        inputProps={{ "aria-label": "add your comment" }}
                    />
                    <IconButton
                        color="primary"
                        sx={{ p: "10px" }}
                        aria-label="directions"
                        onClick={postComment}
                    >
                        <Send />
                    </IconButton>
                </CardActions>
            </Card>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Comment posted successfully!
                </Alert>
            </Snackbar>
        </Grid >
    );
};
export default ItemPhoto;
