import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { Grid, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    width: 200, 
  },
  media: {
    height: 200,
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  paper: {
    position: "absolute",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 5,
    padding: 1,
    display: "center",
    flexDirection: "column",
  },
  modalContainer: {
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
  },

  plantInfo: {
    maxHeight: 550, //edited 29/12/21 previously it was 500
  },
});

export default function PlantWikiCard({ name }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          className={classes.media}
          image={require(`../images/${name}.jpg`)}
          title="Contemplative Reptile"
        >
          <CardContent className={classes.textContainer}>
            <Typography
              gutterBottom
              variant="h5" 
              component="h2"
              style={{ color: "white" }}
            >
              {name}
            </Typography>
          </CardContent>
        </CardMedia>
      </CardActionArea>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modalContainer}
      >
        <div className={classes.paper}>
          <img
            src={require(`../images/${name}Info.jpg`)}
            className={classes.plantInfo}
            alt=""
          />
          {/*<Typography variant="caption">
            Produced by NParks
          </Typography> removed 27/12/21*/}
        </div>
      </Modal>
    </Card>
  );
}
