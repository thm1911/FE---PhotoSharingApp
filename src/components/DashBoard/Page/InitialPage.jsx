import { Box, Typography } from "@mui/material";
import { getAuthToken, getUserId } from "../../../common/functions";
import { useState } from "react";
import { useEffect } from "react";
import fetchModel from "../../../lib/fetchModelData";

const InitialPage = () => {
  const userId = getUserId();
  const token = getAuthToken();
  const [user, setUser] = useState();
  const getData = async () => {
    try {
      const res = await fetchModel(`/api/user/${userId}`, "GET", null, token);
      if (res?.success) {
        setUser(res?.data);
      }
    } catch (error) {
      console.log("❌ Error get user:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Box
      bgcolor={"white"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={1}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        {`Hello ${user?.first_name} ${user?.last_name}!`}
      </Typography>
    </Box>
  );
};
export default InitialPage;