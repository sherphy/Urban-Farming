import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme} from "@material-ui/styles";
import "./video.css"


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto',
    padding: "20px 20px 20px 20px",
    background: "rgba(250, 243, 221, 0.85)",
    borderRadius: "10px",
    width: '80%',
  },
}));


const Video = () => {
  const classes = useStyles();

  return (
    <div class={classes.container}>
        <Typography inline variant="h4" align="center">Video</Typography>
        <div class="vcontainer">
            <iframe class="responsive-iframe" src="https://www.youtube.com/embed/g3vxeEamWzQ?" frameborder="0"></iframe>
        </div>  
    </div>      

  );
};




export default Video;