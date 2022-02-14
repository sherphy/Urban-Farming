//https://www.youtube.com/watch?v=leD2RSJ-AfY
//contains the live camera viewable on the homepage, do let me know if you want to change the dashbaord-Davinod

// const Dashboard = () => (
//     <div>
//         <h1> Welcome back, </h1>
//         <h3> Timelapse </h3>
//     </div>
// );

//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";
import React from 'react'
import { db,auth } from '../util/firebase'
import Typography from "@material-ui/core/Typography";
import "./dashboard.css"
import firebase from 'firebase/compat/app';
import "firebase/auth";
import { makeStyles, useTheme } from "@material-ui/styles";
import withStyles from '@material-ui/core/styles/withStyles';

const useStyles = theme => ({
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
  });

class Dashboard extends React.Component{
    state = { 
        SignedUpUsersData: null 
    }

    componentDidMount(){
        db.collection('SignedUpUsersData')
        .get()
        .then( snapshot => {
            const SignedUpUsersData = []
            snapshot.forEach( doc => {
                const data = doc.data()
                SignedUpUsersData.push(data)
            })
            this.setState({SignedUpUsersData: SignedUpUsersData})
            console.log(snapshot)
        })
        .catch( error => console.log(error))
    }

    render(){
        const {classes} = this.props;
        let user = firebase.auth().currentUser;
        return(
            <div class={classes.title}>
                {
                    this.state.SignedUpUsersData && this.state.SignedUpUsersData.slice(0,1).map(SignedUpUsersData => {
                        return(
                            <div class={classes.container}>
                                {/*<p>{SignedUpUsersData.Email}</p> can use this line to check the user database on the website*/} 
                                <Typography align="center" variant="h3" fontWeight="fontWeightBold" className={classes.title}>Timelapse</Typography>
                                
                                {user.email === 'testuser2@testuser2.com' &&
                                <>
                                   <Typography inline variant="h4" className={classes.bodyText}>Camera 2</Typography>
                                   <Typography inline variant="h5" className={classes.bodyText}>current user: {user.email} </Typography>
                                  <div class="responsive">
                                  <iframe src="https://www.youtube.com/embed/K_Vg94nBiaY?playlist=K_Vg94nBiaY&autoplay=1&mute=1&loop=1"></iframe> {/*Venice*/}
                                  </div>
                                </>
                                } 
                                {user.email === 'testuser1@testuser1.com' &&
                                <>
                                   <Typography inline variant="h4" className={classes.bodyText}>Camera 1</Typography>
                                   <Typography inline variant="h5" className={classes.bodyText}>current user: {user.email} </Typography>
                                  <div class="responsive">
                                  <iframe src="https://www.youtube.com/embed/HpdO5Kq3o7Y?playlist=HpdO5Kq3o7Y&autoplay=1&mute=1&loop=1"></iframe> {/*Shibuya*/}
                                  </div>
                                </>
                                }
                                {user.email === 'testuser3@testuser3.com' &&
                                <>
                                   <Typography inline variant="h4" className={classes.bodyText}>Camera 3</Typography>
                                   <Typography inline variant="h5" className={classes.bodyText}>current user: {user.email} </Typography>
                                  <div class="responsive">
                                  <iframe src="https://www.youtube.com/embed/XWq5kBlakcQ?playlist=XWq5kBlakcQ&autoplay=1&mute=1&loop=1"></iframe> {/*CNA*/}
                                  </div>
                                </>
                                }  
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default withStyles(useStyles)(Dashboard);
  bodyText: {
    marginTop: 10,
    marginBottom: 10,
  },
  
}));

function Dashboard() {
  const classes = useStyles();

      //for user database
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const ref = firebase.firestore().collection("users");

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }
  
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
