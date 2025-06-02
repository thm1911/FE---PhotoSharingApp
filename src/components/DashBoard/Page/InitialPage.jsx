import { Box, Typography } from "@mui/material";

const InitialPage = () => {
  // const [user, setUser] = useState();
  // const getData = async () => {
  //   const res = await fetchModel("/api/user/me");
  //   console.log("🚀 ~ getData ~ res:", res)
  //   if (res?.success) setUser(res?.data);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography>
        "Hello"
      </Typography>
    </Box>
  );
};
export default InitialPage;