import { Box } from "@mui/material";
import ItemPhoto from "./ItemPhoto";

const BasicMode = (props) => {

    const {
        photos,
        userInfo,
        onComment,
        setOnComment,
        onDelete,
        setOnDelete
    } = props;
    return (
        <Box container spacing={2}>
            {photos.map((photo) => (
                <ItemPhoto
                    userInfo={userInfo}
                    photo={photo}
                    onComment={onComment}
                    setOnComment={setOnComment}
                    onDelete={onDelete}
                    setOnDelete={setOnDelete}
                />
            ))}
        </Box>
    );
}

export default BasicMode;