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
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CommentDetail from "../../UserComments/item/ItemComment";
// import { translate } from "../../../utils/i18n/translate";
// import { BaseUrl, socketComment } from "../../../utils/socketComment";
// import "./styles.css";


const ItemPhoto = (props) => {
    const { photo, userInfo } = props;
    // let userPostPhoto =
    //     userInfo?._id === item?.user_id
    //         ? userInfo
    //         : listUser.find((i) => i._id === item?.user_id);
    // const navigate = useNavigate();
    // const [photoData, setPhotoData] = useState(item);
    // // const [numOfFavorite, setNumOfFavorite] = useState(0);
    // // const [numOfBookmark, setNumOfBookmark] = useState(0);
    const [expanded, setExpanded] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    // const [isFavorite, setIsFavorite] = useState(item?.isFavorite);
    // const [isBookmark, setIsBookmark] = useState(item?.isBookmark);
    // const [anchorEl, setAnchorEl] = useState(null);
    // const { user } = useSelector((state) => state.auth);
    // const open = Boolean(anchorEl);

    // const isUser = item?.user_id === user?._id;

    // const postComment = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await fetchModel(
    //       `/api/commentsOfUser/${photoData?._id}`,
    //       "post",
    //       JSON.stringify({ comment })
    //     );
    //     console.log("🚀 ~ postComment ~ res:", res);
    //     if (res?.success) {
    //       setComment("");

    //       setExpanded(true);
    //       setPhotoData(res?.data);
    //       socketComment.emit("sendComment");
    //     }
    //     setLoading(false);
    //   } catch (error) {
    //     setLoading(false);
    //     console.log("🚀 ~ getData ~ error:", error);
    //   }
    // };

    // const goToUser = (userId) => {
    //   console.log("userId", userId);
    //   navigate(`/users/${userId}`);
    // };
    // const handleFavorite = async () => {
    //   const res = await fetchModel(
    //     `/api/likeOfPhoto/${photoData?._id}`,
    //     isFavorite ? "delete" : "post"
    //   );
    //   socketComment.emit("likePost");
    //   console.log("🚀 ~ postComment ~ res:", res);
    //   setIsFavorite(!isFavorite);
    // };
    // const handleBookmark = async () => {
    //   const res = await fetchModel(
    //     `/api/bookmarkOfPhoto/${photoData?._id}`,
    //     isBookmark ? "delete" : "post"
    //   );
    //   socketComment.emit("bookmarkPost");
    //   setIsBookmark(!isBookmark);

    //   console.log("🚀 ~ handleBookmark ~ res:", res);
    // };
    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };
    // const handleDeletePost = async () => {
    //     try {
    //         setLoading(true);
    //         const res = await fetchModel(
    //             `/api/photosOfUser/${photoData?._id}`,
    //             "delete"
    //         );
    //         console.log("🚀 ~ postComment ~ res:", res);
    //         if (res?.success) {
    //             navigate(`/photos/${photoData?.user_id}`);
    //             socketComment.emit("sendComment");
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         console.log("🚀 ~ getData ~ error:", error);
    //     }
    // };
    // const getInitData = async () => {
    //   const likeOfPhoto = await fetchModel(
    //     `/api/likeOfPhoto/byPhoto/${photoData?._id}`
    //   );
    //   setNumOfFavorite(likeOfPhoto?.data?.length);
    //   console.log("🚀 ~ getInitData ~ likeOfPhoto:", likeOfPhoto);

    //   const bookmarkOfPhoto = await fetchModel(
    //     `/api/bookmarkOfPhoto/byPhoto/${photoData?._id}`
    //   );
    //   setNumOfBookmark(bookmarkOfPhoto?.data?.length);
    //   console.log("🚀 ~ getInitData ~ bookmarkOfPhoto:", bookmarkOfPhoto);
    // };

    // useEffect(() => {
    //   getInitData();
    // }, [isFavorite, isBookmark]);

    return (
        <Grid item xs={16} sm={12}>
            <Card variant="outlined" sx={{ mb: 3, mr: 2 }}>
                <CardHeader
                    title={
                        <Typography
                            variant="body1"
                            fontWeight={"bold"}
                            style={{ cursor: "pointer" }}
                        >
                            {`${userInfo?.first_name} ${userInfo?.last_name}`}
                        </Typography>
                    }
                    subheader={moment(photo?.date_time).format("llll")}
                    avatar={
                        <Avatar
                            sx={{ bgcolor: "#30d5c8" }}
                        >
                            {userInfo?.first_name?.[0]}
                        </Avatar>
                    }
                // action={
                //     isUser ? (
                //         <Box>
                //             <IconButton onClick={handleClick} aria-label="settings">
                //                 <MoreHoriz />
                //             </IconButton>
                //             <Menu
                //                 id="account-menu"
                //                 anchorEl={anchorEl}
                //                 open={open}
                //                 onClose={handleClose}
                //                 MenuListProps={{
                //                     "aria-labelledby": "basic-button",
                //                 }}
                //             >
                //                 <MenuItem onClick={handleDeletePost}>
                //                     <ListItemIcon>
                //                         <Delete />
                //                     </ListItemIcon>
                //                     Delete
                //                 </MenuItem>
                //             </Menu>
                //         </Box>
                //     ) : null
                // }
                />
                <CardMedia
                    component="img"
                    sx={{
                        height: 400,
                        objectFit: "contain",
                    }}
                    image={
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
                            <IconButton color="black" onClick={() => setExpanded(!expanded)}>
                                {expanded ? <Comment /> : <CommentOutlined />}
                            </IconButton>
                            {/* {numOfBookmark} */}
                        </Box>
                        {/* <MenuItem onClick={() => setExpanded(!expanded)}>
                            <Box mr={1}>
                                <Chat fontSize="small" color={expanded ? "info" : "disabled"} />
                            </Box> */}
                        {/* {translate("photoSharing:comment")} */}
                        {/* </MenuItem> */}
                        <Box display={"flex"} alignItems={"center"}>
                            <IconButton color="warning">
                                <Bookmark />
                            </IconButton>
                            {/* {numOfBookmark} */}
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
                                    // how to hidden scrollbar
                                    // "&::-webkit-scrollbar": {
                                    //   display: "none",
                                    // },
                                }}
                            >
                                {[...photo?.comments]?.reverse()?.map((items) => (
                                    <ListItem >
                                        <CommentDetail items={items} userId={photo.user_id} />
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
                    // onClick={postComment}
                    >
                        <Send />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid >
    );
};
export default ItemPhoto;
