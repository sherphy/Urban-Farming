import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import TimeSeriesGraph from "./TimeSeriesGraph";

const useStyles = makeStyles({
  root: {
    width: 150, // Change for desktop and mobile
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function GraphCard({
  dataType = "Ambient Temperature",
  children,
}) {
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
      <CardActionArea onClick={handleOpen} style={{ height: "100%" }}>
        <CardContent className={classes.cardContent}>{children}</CardContent>
      </CardActionArea>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modalContainer}
      >
        <div>
          <TimeSeriesGraph dataType={dataType} />
        </div>
      </Modal>
    </Card>
  );
}
