// const Dashboard = () => (
//     <div>
//         <h1> Welcome back, </h1>
//         <h3> Timelapse </h3>
//     </div>
// );

//for login streak
import { useEffect } from "react"
//for sensors
// import React, { useState } from "react";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
    RiTestTubeFill,
    RiPercentLine,
    RiTempHotLine,
    RiPieChartLine,
    RiSpeedFill, //Flow rate
    RiSunFill, //Light spectrum
    RiWaterFlashLine, //Ph
} from "react-icons/ri";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useObject } from 'react-firebase-hooks/database';
import CircularProgress from "@material-ui/core/CircularProgress";
import { database } from "../util/firebase";

import GraphCard from "../components/View/GraphCard"

// import useWindowDimensions from "../util/useWindowDimensions";

import Box from "@material-ui/core/Box";
// import { Alert, AlertTitle } from "@material-ui/lab";

import { GiClick } from "react-icons/gi";
import Divider from "@material-ui/core/Divider";

//for theme
const useStyles = makeStyles((theme) => ({
    gridItem: {
        display: "flex",
        justifyContent: "center",
    },
    cardContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: 150, // Change for desktop and mobile
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardContentTop: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    displayName: {
        fontSize: 12,
    },
    displayValues: {
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
        color: "green",
        textAlign: "center",
    },
    viewTitle: {
        paddingBottom: 25,
    },
    dividerContainer: {
        marginBottom: 40,
    },
    divider: {
        width: "100%",
        backgroundColor: "rgba(104, 176, 171, 0.8)",
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
    },
    displayDate: {
        fontSize: 10,
    },
}));

// const Dashboard = (props) => {
const Dashboard = () => {

    //for user database
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const ref = firebase.firestore().collection("users");

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

    //for login streak
    var getLastRefreshDate = Date();

    useEffect(() => {
        localStorage.setItem("lastRefreshTime", JSON.stringify(getLastRefreshDate));
    }, [getLastRefreshDate]);

    const lastLogTime = localStorage.getItem("lastRefreshTime");
    console.log(lastLogTime);
    var currentTime = Date();
    console.log(currentTime);

    //for themes
    const classes = useStyles();
    // const theme = useTheme();
    const [value, loadingHook] = useObject(
        database.ref("eg4301-urban-farming-850a0")
    );
    const [ECvalue, ECLoadingHook] = useObject(
        database.ref("EC")
    );
    //   const [photoURLS, setPhotoURLS] = useState([]);
    // const [isOpen, setIsOpen] = useState(false);
    // const { height, width } = useWindowDimensions();
    //   const [photoIndex, setPhotoIndex] = useState(0);
    // let {
    //     user: {
    //       credentials: { userHandle, plantsLocation },
    //       loading,
    //     },
    //   } = props;
    // let imgWidth, imgHeight;
    // if (width <= 960) {
    //     imgWidth = 120;
    //     imgHeight = 80;
    // } else {
    //     imgWidth = 300;
    //     imgHeight = 225;
    // }

    let tempDisplay;
    let ECDisplay;
    let humidityDisplay;
    let humidityDisplayLay;
    let waterLevelDisplayTop;
    let waterLevelDisplayBottom;
    let waterLevelDisplayLay;
    let flowRate;
    let lightIntensity;
    let lightIntensityLay;
    let ph;
    let metricsDate;
    let ec;
    let ecDate;
    if (!loadingHook) {
        try {
            tempDisplay = value.val().AmbientTemperature.toFixed(2);
            ECDisplay = value.val().FlowRate.toFixed(2);
            humidityDisplay = value.val().Humidity.toFixed(2);
            waterLevelDisplayTop = value.val()["WaterLevel Top"];
            waterLevelDisplayBottom = value.val()["WaterLevel Bottom"];
            flowRate = value.val().FlowRate.toFixed(2);
            lightIntensity = value.val().LightIntensity.toFixed(0);
            ph = value.val().PH.toFixed(2);
            metricsDate = value.val().DateTime.slice(0, -3);
            ec = ECvalue.val()["Nutrient Content"].toFixed(2);
            ecDate = ECvalue.val()["DateTime"].slice(0, -3);
            if (waterLevelDisplayBottom === "LOW\r\n") {
                waterLevelDisplayLay = "Low";
            } else if (waterLevelDisplayTop === "HIGH\r\n") {
                waterLevelDisplayLay = "High";
            } else if (waterLevelDisplayTop === "LOW\r\n") {
                waterLevelDisplayLay = "Medium";
            }

            if (humidityDisplay > 80) {
                humidityDisplayLay = "High";
            } else if (humidityDisplay > 50) {
                humidityDisplayLay = "Medium";
            } else if (humidityDisplay > 0) {
                humidityDisplayLay = "Low";
            }

            if (lightIntensity >= 32000) {
                lightIntensityLay = "Direct Sunlight";
            } else if (lightIntensity > 10000) {
                lightIntensityLay = "Full daylight";
            } else if (lightIntensity > 1000) {
                lightIntensityLay = "Overcast";
            } else if (lightIntensity > 400) {
                lightIntensityLay = "Dawn or Dusk";
            } else if (lightIntensity > 0) {
                lightIntensityLay = "Low Light Levels";
            }
            if (ph < 2 || ph > 10) {
                ph = "Sensor is down";
            }
        } catch (e) {
            console.log(e);
            tempDisplay = "Error";
            ECDisplay = "Error";
            humidityDisplay = "Error";
            flowRate = "Error";
            lightIntensity = "Error";
            ph = "Error";
            metricsDate = "Error";
            ec = "Error";
            ecDate = "Error";
        }
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Grid item lg={12} align="center">
                    <Typography variant="h3" align="center" className={classes.viewTitle}>
                        Hello!
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                        Here are your photos for your plants for {Date()}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        style={{ fontSize: 10, paddingBottom: 25 }}
                    >
                        New photos are updated at 12.00pm noon everyday
                    </Typography>
                    {/* <Alert severity="success" style={{ marginBottom: 25 }}>
                        <AlertTitle>Phase 2 System</AlertTitle>
                        We have upgraded the <i>Community Stage</i> system! Do go down to
                        the Sky Garden to take a look, and lookout for the beautiful LED
                        lights at night. <strong> Be careful </strong> when its dark out
                        there!
                    </Alert> */}
                    {/* <Typography align="center">
                        Do press on the photos below to view it in full screen!
                    </Typography> */}
                    <div
                        style={{ width: "100%", display: "flex", alignContent: "center" }}
                    >
                        <GiClick size={"2em"} />
                    </div>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        {/* {plantLoading &&
                            photoURLS.map((name, index) => {
                                return (
                                    <Grid item xs={6} key={index}>
                                        {photoURLS.length > 1 ? (
                                            <p>Plant at Level {plantsLocationArr[index][5]}</p>
                                        ) : (
                                            <p />
                                        )}
                                        <Image
                                            src={photoURLS[index]}
                                            color="transparent"
                                            onClick={() => {
                                                handleLightBoxClick(index);
                                            }}
                                            imageStyle={{
                                                height: imgHeight,
                                                width: imgWidth,
                                            }}
                                        />
                                    </Grid>
                                );
                            })} */}
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Typography variant="h3" align="center" className={classes.viewTitle}>
                    System Statistics
                </Typography>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={6} sm={4} className={classes.gridItem}>
                        <GraphCard dataType="Ambient Temperature">
                            <div className={classes.cardContentTop}>
                                <RiTempHotLine size={"2em"} />
                                <Typography
                                    variant="caption"
                                    align="center"
                                    className={classes.displayName}
                                >
                                    {" "}
                                    Temperature{" "}
                                </Typography>
                            </div>
                            {!loadingHook ? (
                                <Typography align="center" className={classes.displayValues}>
                                    {" "}
                                    {tempDisplay} <Typography variant="caption"> °C </Typography>
                                </Typography>
                            ) : (
                                <CircularProgress />
                            )}
                        </GraphCard>
                    </Grid>
                    <Grid item xs={6} sm={4} className={classes.gridItem}>
                        <GraphCard dataType="Ambient Humidity">
                            <div className={classes.cardContentTop}>
                                <RiPercentLine size={"2em"} />
                                <Typography variant="caption" className={classes.displayName}>
                                    {" "}
                                    Humidity{" "}
                                </Typography>
                            </div>
                            {!loadingHook ? (
                                <div>
                                    <Typography className={classes.displayValues}>
                                        {humidityDisplayLay}
                                    </Typography>
                                    <Typography variant="caption">
                                        {" "}
                                        {humidityDisplay}{" "}
                                        <Typography variant="caption"> % </Typography>
                                    </Typography>
                                </div>
                            ) : (
                                <CircularProgress />
                            )}
                        </GraphCard>
                    </Grid>
                    <Grid item xs={6} sm={4} className={classes.gridItem}>
                        <GraphCard dataType="LightIntensity">
                            <div className={classes.cardContentTop}>
                                <RiSunFill size={"2em"} />
                                <Typography
                                    align="center"
                                    variant="caption"
                                    className={classes.displayName}
                                >
                                    {" "}
                                    Light Intensity{" "}
                                </Typography>
                            </div>
                            {!loadingHook ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography className={classes.displayValues}>
                                        {lightIntensityLay}
                                    </Typography>
                                    <Typography align="center" variant="caption">
                                        {" "}
                                        {lightIntensity}{" "}
                                        <Typography variant="caption"> Lux </Typography>
                                    </Typography>
                                </div>
                            ) : (
                                <CircularProgress />
                            )}
                        </GraphCard>
                    </Grid>

                    <Grid item xs={6} sm={4} className={classes.gridItem}>
                        <GraphCard dataType="PH">
                            <div className={classes.cardContentTop}>
                                <RiWaterFlashLine size={"2em"} />
                                <Typography
                                    align="center"
                                    variant="caption"
                                    className={classes.displayName}
                                >
                                    {" "}
                                    PH{" "}
                                </Typography>
                            </div>
                            {!loadingHook ? (
                                <Typography align="center" className={classes.displayValues}>
                                    {" "}
                                    {ph}{" "}
                                </Typography>
                            ) : (
                                <CircularProgress />
                            )}
                        </GraphCard>
                    </Grid>
                    <Grid item xs={6} sm={4} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.cardContentTop}>
                                    <RiTestTubeFill size={"2em"} />
                                    <Typography
                                        align="center"
                                        variant="caption"
                                        className={classes.displayName}
                                    >
                                        {" "}
                                        Water Level{" "}
                                    </Typography>
                                </div>
                                {!loadingHook ? (
                                    <div>
                                        <Typography className={classes.displayValues}>
                                            {waterLevelDisplayLay}
                                        </Typography>
                                    </div>
                                ) : (
                                    <CircularProgress />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} sm={4} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <div className={classes.cardContentTop}>
                                    <RiSpeedFill size={"2em"} />
                                    <Typography
                                        align="center"
                                        variant="caption"
                                        className={classes.displayName}
                                    >
                                        {" "}
                                        Flow Rate{" "}
                                    </Typography>
                                </div>
                                {!loadingHook ? (
                                    <Typography align="center" className={classes.displayValues}>
                                        {" "}
                                        {flowRate / 2} l/min{" "}
                                    </Typography>
                                ) : (
                                    <CircularProgress />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item lg={12} align="center">
                    <Typography variant="caption" align="center">
                        <Box fontWeight="fontWeightBold" display="inline">
                            Live Data Update
                        </Box>
                        , click on the card (except for WaterLevel and FlowRate) to see
                        historical data for past 7 days or 24 hours
                        {/* <Box fontWeight="fontWeightBold">
                            Last Updated at:{" "}
                            {!loadingHook ? formatDateString(metricsDate, true) : "Loading"}
                        </Box> */}
                    </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Grid align="center" item xs={6} sm={4} className={classes.gridItem}>
                    <GraphCard dataType="Nutrient Content">
                        <div className={classes.cardContentTop}>
                            <RiPieChartLine size={"2em"} />
                            <Typography
                                variant="caption"
                                align="center"
                                className={classes.displayName}
                            >
                                {" "}
                                Nutrient{" "}
                            </Typography>
                        </div>
                        {!ECLoadingHook ? (
                            <div>
                                <Typography className={classes.displayValues}>
                                    {" "}
                                    {ec} EC{" "}
                                </Typography>
                            </div>
                        ) : (
                            <CircularProgress />
                        )}
                    </GraphCard>
                </Grid>
                <Grid item lg={12} align="center">
                    <Typography variant="caption" align="center">
                        <Box fontWeight="fontWeightBold" display="inline">
                            Daily Data Update
                        </Box>
                        , click on the card to see daily data for past 7 days
                        {/* <Box fontWeight="fontWeightBold">
                            {" "}
                            Last updated at:{" "}
                            {!ECLoadingHook ? formatDateString(ecDate, false) : "Loading"}
                        </Box> */}
                    </Typography>
                </Grid>
            </Grid>
            {/* <LightBoxComponent
                isOpen={isOpen}
                closeRequest={handleLightBoxCloseRequest}
                imagesURL={photoURLS}
                imagesCaption={plantsLocationArr}
                reactModalStyle={{ ril: { toolbar: { marginTop: "100px" } } }}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
            /> */}
        </Grid>
    );
};



    //     <div>
    //         <h1>Welcome back, </h1>
    //         {/* {users.map((user) => (
    //             <div key={user.name}>
    //                 <h2>{user.points}</h2>
    //             </div>
    //         ))} */}
    //     </div>
    // );


export default Dashboard;
