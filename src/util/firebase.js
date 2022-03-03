import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "firebase/compat/firestore";
// //i put product photos in storage. can go local if u want 
import "firebase/compat/storage";
import { getDatabase } from "firebase/database"
import {ref} from "firebase/database"
import React from 'react';
import { useObject} from 'react-firebase-hooks/database';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from "@material-ui/core/Typography";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { makeStyles, useTheme } from "@material-ui/core/styles";


const firebaseConfig = {
    apiKey: "AIzaSyAXqEpFzbnhrXvPoZEeIVU5qnnzRDbgi6w",
    authDomain: "eg4301-urban-farming.firebaseapp.com",
    databaseURL: "https://eg4301-urban-farming-850a0.firebaseio.com/",
    projectId: "eg4301-urban-farming",
    storageBucket: "eg4301-urban-farming.appspot.com",
    messagingSenderId: "14363207375",
    appId: "1:14363207375:web:96d571fda134fc026b79ba"
};
//old version 
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = initializeApp.firestore();
// //remove if u want go local for product pics
// export const storage = initializeApp.storage();
// export default app;

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const database = getDatabase(app); //sensor realtime database

export { auth, db, storage, database}

const useStyles = makeStyles((theme) => ({
  gridItem: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "gold",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 250, // Change for desktop and mobile
    height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    [theme.breakpoints.up("lg")] : {
      Width: 300
    },
    [theme.breakpoints.up("md")] : {
    Width: 200
    },
    [theme.breakpoints.up("sm")] : {
      Width: 100
      }
  },
}));

 const Sensor = () => {
  const classes = useStyles();
  const theme = useTheme();
   //initialising the values with the sensor database
    const [BLuxsnapshot, Bluxloading, Bluxerror] = useObject(ref(database, 'Current bottom lux'));
    const [MLuxsnapshot, Mluxloading, Mluxerror] = useObject(ref(database, 'Current middle lux '));
    const [TLuxsnapshot, Tluxloading, Tluxerror] = useObject(ref(database, 'Current top lux '));     
    const [ECsnapshot, ECloading, ECerror] = useObject(ref(database, 'EC'));
    const [Flowsnapshot, Flowloading, Flowerror] = useObject(ref(database, 'Flow rate'));
    const [Humiditysnapshot, Humidityloading, Humidityerror] = useObject(ref(database, 'Humidity'));
    const [LuxBottomsnapshot, LuxBottomloading, LuxBottomerror] = useObject(ref(database, 'Lux level Bottom'));
    const [LuxMiddlesnapshot, LuxMiddleloading, LuxMiddleerror] = useObject(ref(database, 'Lux level Middle'));
    const [LuxTopsnapshot, LuxToploading, LuxToperror] = useObject(ref(database, 'Lux level Top'));
    const [Tempsnapshot, Temploading, Temperror] = useObject(ref(database, 'Temperature'));
    const [Waterbottomsnapshot, Waterbottomloading, Waterbottomerror] = useObject(ref(database, 'Water Level Bottom'));
    const [Watertopsnapshot, Watertoploading, Watertoperror] = useObject(ref(database, 'Water Level Top'));
    const [Watertempsnapshot, Watertemploading, Watertemperror] = useObject(ref(database, 'Water Temperature'));
  
    return (
      //output on webapp
      <div>
        <Grid className={classes.gridItem}>
        <Card className={classes.root}>

        <Typography inline gutterBottom variant="body2">
          {Bluxerror && <strong>Error: {Bluxerror}</strong>}
          {Bluxloading && <span>Current bottom lux: Loading...</span>}
          {BLuxsnapshot && <span>Current bottom lux: {BLuxsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Mluxerror && <strong>Error: {Mluxerror}</strong>}
          {Mluxloading && <span>Current middle lux: Loading...</span>}
          {MLuxsnapshot && <span>Current middle lux: {MLuxsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Tluxerror && <strong>Error: {Tluxerror}</strong>}
          {Tluxloading && <span>Current top lux: Loading...</span>}
          {TLuxsnapshot && <span>Current top lux: {TLuxsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {ECerror && <strong>Error: {ECerror}</strong>}
          {ECloading && <span>EC: Loading...</span>}
          {ECsnapshot && <span>EC: {ECsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Flowerror && <strong>Error: {Flowerror}</strong>}
          {Flowloading && <span>Flow rate: Loading...</span>}
          {Flowsnapshot && <span>Flow rate: {Flowsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Humidityerror && <strong>Error: {Humidityerror}</strong>}
          {Humidityloading && <span>Humidity: Loading...</span>}
          {Humiditysnapshot && <span>Humidity: {Humiditysnapshot.val()}%</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {LuxBottomerror && <strong>Error: {LuxBottomerror}</strong>}
          {LuxBottomloading && <span>Lux level Bottom: Loading...</span>}
          {LuxBottomsnapshot && <span>Lux level Bottom: {LuxBottomsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {LuxMiddleerror && <strong>Error: {LuxMiddleerror}</strong>}
          {LuxMiddleloading && <span>Lux level Middle: Loading...</span>}
          {LuxMiddlesnapshot && <span>Lux level Middle: {LuxMiddlesnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {LuxToperror && <strong>Error: {LuxToperror}</strong>}
          {LuxToploading && <span>Lux level Top: Loading...</span>}
          {LuxTopsnapshot && <span>Lux level Top: {LuxTopsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Temperror && <strong>Error: {Temperror}</strong>}
          {Temploading && <span>Temperature: Loading...</span>}
          {Tempsnapshot && <span>Temperature: {Tempsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Waterbottomerror && <strong>Error: {Waterbottomerror}</strong>}
          {Waterbottomloading && <span>Water Level Bottom: Loading...</span>}
          {Waterbottomsnapshot && <span>Water Level Bottom: {Waterbottomsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Watertoperror && <strong>Error: {Watertoperror}</strong>}
          {Watertoploading && <span>Water Level Top: Loading...</span>}
          {Watertopsnapshot && <span>Water Level Top: {Watertopsnapshot.val()}</span>}
        </Typography>

        <Typography inline gutterBottom variant="body2">
          {Watertemperror && <strong>Error: {Watertemperror}</strong>}
          {Watertemploading && <span>Water Temperature: Loading...</span>}
          {Watertempsnapshot && <span>Water Temperature: {Watertempsnapshot.val()}</span>}
        </Typography>
        </Card>
        </Grid>
      </div>
    );

  };
   export default Sensor
