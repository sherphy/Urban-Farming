//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";
import React, { useEffect } from "react";
import moment from "moment";
//for points
import { useState } from "react";
import { auth, db } from "../util/firebase";

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
    //must save to local storage, otherwise date keeps updating
    useEffect(() => {
        localStorage.setItem("lastRefreshTime", JSON.stringify(getLastRefreshDate));
    }, [getLastRefreshDate]);
    //retrieve from local storage
    var lastLogTime = localStorage.getItem("lastRefreshTime");
    console.log(lastLogTime);
    //milliseconds since 1 jan 1970, to find difference in milliseconds
    var lastLogTimeParsed = Date.parse(lastLogTime);
    console.log(lastLogTimeParsed);
    var currentTime = Date.parse(Date());
    console.log(currentTime);
    var timeSinceRefresh = currentTime - lastLogTimeParsed;
    console.log(timeSinceRefresh + "ms since refresh");
    //if <1 day, aka 8.64e^7 milliseconds since last log, streak cont
    //resets at midnight, so check that
    
    let streak = 1;
    var secondsToMidnight = moment("24:00:00", "hh:mm:ss").diff(moment(), 'seconds');

    const streakCounter = () => {
          if (timeSinceRefresh < 8.64e7) {
            streak += 1;
            console.log("retained streak of " + streak);
          }
          //must else, otherwise it will be streak 0 in the end if no exit
          //so if they did not log in for more than a day 
          else {
          streak = 1;
          console.log("lost streak");
          }
          //must find a way to return streak first, then restart loop
          //for both, so they all reset at midnight 
          return streak;
        } 
    
    console.log(streakCounter());
    console.log(secondsToMidnight + " for next reset");
    
    //for the streak points of the day    
    //must run streakCounter first, then if there is a streak,
    //add it to the getStreakPoints that resets daily
    //caps off at 5 streaks
    var streakPoints = 0;

    const getStreakPoints = () => {
        if (streak < 5) {
            streakPoints = streak;
            return streakPoints;
        }
        else {
            return 5;
        }
    }
    getStreakPoints();

    // console.log(getStreakPoints());


    // get the current points they have in their database
    function GetCurrentUser(){
        const [userPoints, setUserPoints]=useState('');

        useEffect(()=>{
            //this probably reloads the console
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot=>{
                        setUserPoints(snapshot.data().Points);
                        // setFullName(snapshot.data().FullName);
                        // setEmail(snapshot.data().Email);
                        // setCamera(snapshot.data().Camera);
                        setUid(user.uid);
                    })
                }
                else{
                    setUserPoints(null);
                }
            })
        },[])
        return userPoints;
    }
    const userPoints = GetCurrentUser();
    //to copy other relevant fields over for user data to update
    //otherwise the whole object must update
    // const [FullName, setFullName] = useState('');
    // const [Email, setEmail] = useState('');
    // const [Camera, setCamera] = useState('');
    
    const [uid, setUid] = useState('');
    const userid = uid;
    console.log(userid + " user id")
    console.log(userPoints + " user points from database pre-update");
    const finalPoints = userPoints + streakPoints;
    console.log(finalPoints + " database points");
    //must add the streakPoints to existing database points
    //cannot just call uid in case blank
    if (uid) {
    db.collection('SignedUpUsersData').doc(userid).update({Points: finalPoints});
    }

    return (
        <div>
            <h1>Welcome back, </h1>
                <h3> 
                    {secondsToMidnight === 0 && streakCounter}
                    You have a streak of: {streak}
                </h3>
            {/* {users.map((user) => (
                <div key={user.name}>
                    <h2>{user.points}</h2>
                </div>
            ))} */}
        </div>
    );
}

export default Dashboard;
