export default {
  "a:-webkit-any-link": {
    color: "#33c9dc", //to use #dc4633
  },
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  authForms: {
    form: {
      textAlign: "center",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
      color: "#c3ffaf",
      textStroke: "2px #103814", 
      fontWeight: "900",
    },
    sectionTitle: {
      margin: "10px auto 10px auto",
      color: "black",
      textDecoration: "underline",
      fontWeight: "900",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    input: {
      color: "white",
    },
    button: {
      marginTop: 20, 
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 5,
    },
    progress: {
      position: "absolute",
    },
  },
  profile: {
    paper: {
      width: "600px",
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute", 
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 225, //edited on 30/12/21 used to be 200
        height: 225, //edited on 30/12/21 used to be 200
        objectFit: "cover",  
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center", 
        "& span, svg": {
          verticalAlign: "middle", 
        },
      },
      "& hr": {
        border: "none", 
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
      buttons: {
        textAlign: "center",
        "& a": {
          margin: "20px 10px",
        },
      },
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        minWidth: 12,
      },
    },
  },
};
