import {
    AccountCircle,
    BorderColor,
    Chat,
    Check,
    Comment,
    Info,
    Language,
    Logout,
    MedicalInformation,
    Settings,
} from "@mui/icons-material";
import {
    Avatar,
    Chip,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Flag } from "semantic-ui-react";
import fetchModel from "../../../lib/fetchModelData";
import { removeAuthToken, removeUserId } from "../../../common/functions";
import UpdateInfor from "./UpdateInfor";

const ItemMenu = (props) => {
    const { userInfo, visible } = props;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // const [numOfComment, setNumOfComment] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // const getData = async () => {
    //     try {
    //         const photoUserComment = await fetchModel(
    //             `/api/commentsOfUser/${userInfo?._id}`
    //         );
    //         let count = 0;
    //         if (photoUserComment?.success)
    //             photoUserComment?.data?.map((i) =>
    //                 i?.comments?.map((items) => {
    //                     if (items.user._id == userInfo?._id) count++;
    //                 })
    //             );

    //         setNumOfComment(count);
    //     } catch (error) {
    //         console.log("🚀 ~ getData ~ error:", error);
    //     }
    // };
    // useEffect(() => {
    //     getData();
    // }, [anchorEl]);
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
                {/* <MenuItem
            onClick={() => {
              navigate("/me/chat");
            }}
          >
            <ListItemIcon>
              <Forum fontSize="small" />
            </ListItemIcon>
            {translate("photoSharing:chat")}
          </MenuItem> */}
                {/* <MenuItem onClick={handleUpdate}>
                    <ListItemIcon>
                        <BorderColor fontSize="small" />
                    </ListItemIcon>
                    {translate("photoSharing:updateInformation")}
                </MenuItem> */}
                {/* <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {translate("photoSharing:logout")}
                </MenuItem> */}
                {/* <Divider />
                <MenuList dense>
                    <MenuItem disableTouchRipple>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        {translate("photoSharing:setting")}
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(setBasic())}>
                        <ListItemText inset>
                            {translate("photoSharing:basicMode")}
                        </ListItemText>
                        <ListItemIcon sx={{ visibility: isBasic ? "visible" : "hidden" }}>
                            <Check color="success" />
                        </ListItemIcon>
                    </MenuItem>

                    <MenuItem onClick={() => dispatch(setAdvance())}>
                        <ListItemText inset>
                            {translate("photoSharing:advanceMode")}
                        </ListItemText>
                        <ListItemIcon sx={{ visibility: isAdvance ? "visible" : "hidden" }}>
                            <Check color="success" />
                        </ListItemIcon>
                    </MenuItem>

                    <MenuItem onClick={() => dispatch(setSticky())}>
                        <ListItemText inset>
                            {translate("photoSharing:masonryMode")}
                        </ListItemText>
                        <ListItemIcon sx={{ visibility: isSticky ? "visible" : "hidden" }}>
                            <Check color="success" />
                        </ListItemIcon>
                    </MenuItem>
                </MenuList> */}
                {/* <Divider />
                <MenuList dense>
                    <MenuItem disableTouchRipple>
                        <ListItemIcon>
                            <Language fontSize="small" />
                        </ListItemIcon>
                        {translate("photoSharing:language")}
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(setVietnamese());
                            i18n.changeLanguage("vi");
                        }}
                    >
                        <ListItemText inset>
                            <ListItemIcon>
                                <Flag name="vn" />
                            </ListItemIcon>
                            {translate("photoSharing:vietnamese")}
                        </ListItemText>
                        <ListItemIcon
                            sx={{ visibility: language === "vi" ? "visible" : "hidden" }}
                        >
                            <Check color="success" />
                        </ListItemIcon>
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            dispatch(setEnglish());
                            i18n.changeLanguage("en");
                        }}
                    >
                        <ListItemText inset>
                            <ListItemIcon>
                                <Flag name="us" />
                            </ListItemIcon>
                            {translate("photoSharing:english")}
                        </ListItemText>
                        <ListItemIcon
                            sx={{ visibility: language === "en" ? "visible" : "hidden" }}
                        >
                            <Check color="success" />
                        </ListItemIcon>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            dispatch(setFrench());
                            i18n.changeLanguage("fr");
                        }}
                    >
                        <ListItemText inset>
                            <ListItemIcon>
                                <Flag name="fr" />
                            </ListItemIcon>
                            {translate("photoSharing:french")}
                        </ListItemText>
                        <ListItemIcon
                            sx={{ visibility: language === "fr" ? "visible" : "hidden" }}
                        >
                            <Check color="success" />
                        </ListItemIcon>
                    </MenuItem>
                </MenuList> */}
            </Menu>
            <UpdateInfor open={isOpen} onClose={() => setIsOpen(false)} userInfo={userInfo} />
        </div>
    );
};
export default ItemMenu;
