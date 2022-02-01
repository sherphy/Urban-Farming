import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "5px",
    padding: "30px 20px 20px 20px",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(250, 243, 221, 0.85)",
    borderRadius: "10px",
    maxWidth: "640px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: 320,
    },
  },
  children: {
    display: "flex",
    justifyContent: "center",
  },
}));

const View = ({ title, children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.container}>
      <div className={classes.children}>{children}</div>
    </div>
  );
};

View.propTypes = {
  title: PropTypes.string
};

export default View;
