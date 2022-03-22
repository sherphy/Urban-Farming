//contains the live camera viewable on the homepage

// const Dashboard = () => (
//     <div>
//         <h1> Welcome back, </h1>
//         <h3> Timelapse </h3>
//     </div>
// );

//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";

import React,{useState,useContext} from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";
import "./dashboard.css"
import { useLocation } from 'react-router-dom'///test

const useStyles = makeStyles((theme) => ({
    title: {
    marginTop: 0,
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "8px",
    padding: "20px 20px 20px 20px",
    background: "rgba(250, 243, 221, 0.85)",
    borderRadius: "10px",
  },
  bodyText: {
    marginTop: 10,
    marginBottom: 10,
  },
  
}));

const Dashboard = ()  =>{
  const classes = useStyles();

      //for user database
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const ref = firebase.firestore().collection("users");

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

    //const { from } = location.state not working
  return (
    <div className={classes.container}>

          <Typography align="center" variant="h3" fontWeight="fontWeightBold" className={classes.title}>Dashboard</Typography>
          
          <Typography inline variant="h5" className={classes.bodyText}>
          Welcome to our app! Here you can take a look at your plants.
          </Typography>

          {/* {users.map((user) => (
              <div key={user.name}>
                <h2>{user.points}</h2>
              </div>
            ))} */}
            
            
          <Typography inline variant="h4" align="center">Camera 1</Typography>
          <div class="responsive">
          <iframe src="https://www.youtube.com/embed/HpdO5Kq3o7Y?playlist=HpdO5Kq3o7Y&autoplay=1&mute=1&loop=1"></iframe> 
          </div>

          <Typography inline variant="h4" align="center">Camera 2</Typography>
          <div class="responsive">
          <iframe src="https://www.youtube.com/embed/K_Vg94nBiaY?playlist=K_Vg94nBiaY&autoplay=1&mute=1&loop=1"></iframe>
          </div>

          <Typography inline variant="h4" align="center">Camera 3</Typography>
          <div class="responsive">
          <iframe src="https://www.youtube.com/embed/XWq5kBlakcQ?playlist=XWq5kBlakcQ&autoplay=1&mute=1&loop=1"></iframe>
          </div>


    </div>
  
  );
};


export default Dashboard