import { Grid } from "@mui/material";
import Welcome from "./Page/Welcome";
import TopBar from "../TopBar";

export default function DashBoard() {
  return (
    <Grid container bgcolor={"#E4E6EB"}>
      <Grid item xs={12} sm={12}>
        {true && <TopBar />}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Welcome />
      </Grid>
    </Grid>
  )
}