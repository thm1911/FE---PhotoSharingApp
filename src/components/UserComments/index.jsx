import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";
const UserComment = (props) => {
    const { listComment } = props;

    return (
        <Stack spacing={2}>
            {listComment?.map((items, index) => {
                // const postComment = listPhoto.find((i) => i?._id == items?.post_id);
                // console.log("🚀 ~ {listComment?.map ~ postComment:", postComment);
                return (
                    <Stack
                        direction="row"
                        spacing={1}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={
                                postComment?.file_path
                                    ? `${BaseUrl}/${postComment?.file_path}`
                                    : `../../images/${postComment?.file_name}`
                            }
                            alt={postComment?.file_name}
                            loading="lazy"
                            style={{ objectFit: "cover", height: "100px", width: "100px" }}
                        />
                        <Stack>
                            <Typography
                                onClick={() => goToUser(items?.user?.id)}
                                style={{
                                    display: "flex",
                                    cursor: "pointer",
                                    color: "blue",
                                    margin: 0,
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: getColorForAvatar(items?.user?.first_name?.[0]),
                                        mr: "12px",
                                    }}
                                >
                                    {items?.user?.first_name[0]}
                                </Avatar>
                                {`${items?.user?.first_name} ${items?.user?.last_name}:`}
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
                );
            })}
        </Stack>
    )
};
export default UserComment;
