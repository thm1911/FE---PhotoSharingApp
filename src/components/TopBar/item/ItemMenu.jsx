import {
    AccountCircle,
    Comment,
    Info,
    Logout,
} from "@mui/icons-material";
import {
    Avatar,
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchModel from "../../../lib/fetchModelData";
import { removeAuthToken, removeUserId } from "../../../common/functions";
import UpdateInfor from "./UpdateInfor";

const ItemMenu = (props) => {
    const { userInfo, visible } = props;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        handleClose();
        const res = await fetchModel("/admin/logout", "post");
        try {
            if (res.success) {
                removeAuthToken();
                removeUserId();
                navigate("/login");
            }
        } catch (error) {
            console.log("❌ Error logout:", error.message);
        }
    }

    const goToProfile = () => {
        handleClose();
        navigate(`/users/${userInfo?._id}`);
    };

    const goToPhotoUserComment = () => {
        handleClose();
        navigate(`/commentOfUser/${userInfo?._id}`);
    };

    const handleUpdate = () => {
        handleClose();
        setIsOpen(true);
    };

    return (
        <div>
            <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                visibility={visible ? "visible" : "hidden"}
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
            >
                <Avatar sx={{ bgcolor: "transparent" }} />
                <Typography variant="h6" color="white">
                    {userInfo?.first_name} {userInfo?.last_name}
                </Typography>
            </Stack>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={goToProfile}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    {"My profile"}
                </MenuItem>
                <MenuItem onClick={handleUpdate}>
                    <ListItemIcon>
                        <Info fontSize="small" />
                    </ListItemIcon>
                    {"Update Information"}
                </MenuItem>
                <MenuItem onClick={goToPhotoUserComment}>
                    <ListItemIcon>
                        <Comment fontSize="small" />
                    </ListItemIcon>
                    {"My comments"}
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {"Logout"}
                </MenuItem>
            </Menu>
            <UpdateInfor 
                open={isOpen} 
                onClose={() => setIsOpen(false)} userInfo={userInfo} 
            />
        </div>
    );
};
export default ItemMenu;
