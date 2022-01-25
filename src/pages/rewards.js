import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

export default function Rewards() {
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
          Rewards
        </Typography>
        <Typography variant="h5" color="primary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum rhoncus diam, quis porttitor nulla ultricies quis. Pellentesque lacinia imperdiet diam nec convallis. Fusce congue suscipit dui eu vehicula. Fusce viverra diam dolor, quis rhoncus felis cursus eget. In dolor ex, lobortis eget viverra eu, venenatis vitae orci. Ut auctor interdum tortor eu aliquet. In mattis accumsan dignissim. Ut vehicula eget velit non faucibus.
        Sed magna lorem, aliquet eu porttitor quis, egestas vitae justo. Suspendisse ornare ipsum consequat lectus sodales iaculis. Etiam in pharetra nisi. Sed consequat lectus vel rhoncus dictum. Mauris vel laoreet leo. Aliquam erat volutpat. Nullam pellentesque in est in eleifend. Fusce at ex in lorem consectetur suscipit. Nam leo dui, interdum at velit et, tristique condimentum diam. Nullam at neque mauris. Quisque ut nisi leo. Curabitur vitae risus non turpis mattis porttitor.
        </Typography>
    </Grid>
  );
};
