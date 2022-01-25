import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

export default function Dashboard() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh", marginTop:40, marginBottom:40 }}
      spacing={5}
    >
      <Grid item style={{ border: "0.2px solid gray", backgroundColor:"#FFE5B4" }}>
        <Content/>
      </Grid>
    </Grid>
  );
}

const Content = () => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
        <Typography variant="h3" color="primary">
          Dashboard
        </Typography>
        <Typography variant="h5" color="primary">
        Welcome to our homepage!
        </Typography>
    </Grid>
  );
};
