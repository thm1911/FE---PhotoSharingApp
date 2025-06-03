import { Avatar, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { getAuthToken } from "../../../common/functions";
import fetchModel from "../../../lib/fetchModelData";
import { useNavigate } from "react-router-dom";


const CommentDetail = (props) => {
    const { items } = props;
    const user = items.user;
    const navigate = useNavigate();

    const goToUser = (userId) => {
        navigate(`/users/${userId}`);
    };

    // const [user, setUser] = useState(null);
    // const userId = items.user
    // const getUserComment = async () => {
    //     try {
    //         const token = getAuthToken();
    //         const response = await fetchModel(`/api/user/${userId}`, "GET", null, token);
    //         if (response.success) {
    //             setUser(response.data);
    //         } else {
    //             console.log("❌ Error get list user:", response);
    //         }
    //     } catch (error) {
    //         console.error("❌ Error get user:", error);
    //     }
    // }

    // useEffect(() => {
    //     getUserComment();
    // }, [items]);

    return (
        <div>
            <Typography
                onClick={() => goToUser(items?.user?.objectID || items?.user?._id)}
                style={{
                    display: "flex",
                    cursor: "pointer",
                    margin: 0,
                    alignItems: "center",
                    fontWeight: "bold",
                }}
            >
                <Avatar
                    onClick={() => goToUser(items?.user?.objectID || items?.user?._id)}
                    sx={{
                        bgcolor: "#30d5c8",
                        mr: "12px",
                    }}>
                    {user?.first_name[0]}
                </Avatar>
                {`${user?.first_name} ${user?.last_name}`}
            </Typography>
            <Typography
                variant="body1"
                color="ActiveCaption"
                className="breakall"
                sx={{
                    mt: 1
                }}
            >{`${items?.comment}`}</Typography>
            <Typography variant="subtitle2" color="textSecondary" textAlign={"left"}>
                {moment(items?.date_time).format("llll")}
            </Typography>
        </div>
    );
};

export default CommentDetail;