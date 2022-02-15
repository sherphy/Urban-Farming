//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";
import React, { useEffect } from "react";
import moment from "moment";
//for points
import { useState } from "react";
import { auth, db } from "../util/firebase";

const Dashboard = () => {
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
        if (secondsToMidnight === 0) {
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
    }
    
    console.log(streakCounter());
    console.log(secondsToMidnight + " for next reset");
    
    //for the streak points of the day    
    //must run streakCounter first, then if there is a streak,
    //add it to the getStreakPoints that resets daily
    //caps off at 5 streaks
    var streakPoints = 1;

    streakCounter();
    const getStreakPoints = () => {
        if (streak < 5) {
            streakPoints = streak;
            return streakPoints;
        }
        else {
            return 5;
        }
    }

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
                        setFullName(snapshot.data().FullName);
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
    const [FullName, setFullName] = useState('');
    // const [Email, setEmail] = useState('');
    // const [Camera, setCamera] = useState('');
    
    const [uid, setUid] = useState('');
    const userid = uid;
    console.log(userid + " user id")
    console.log(userPoints + " user points from database pre-update");
    getStreakPoints();
    const finalPoints = userPoints + streakPoints;

    //if it is a new day, the streak count increases by 1
    //the points that i add to the database will be getStreakPoints
    //which is determined on streakCounter
    //then i will renew the property of "Points" in database 
    //by taking the initial points + streakPoints of the day, added once
    if (secondsToMidnight === 0) {
        //must add the streakPoints to existing database points
        //cannot just call uid in case blank
      if (uid) {
        db.collection('SignedUpUsersData').doc(userid).update({Points: finalPoints});
        }
    }
    console.log(finalPoints + " database points");

    return (
        <div>
            <h1>Welcome back, {FullName} </h1>
                <h3> 
                    You have a streak of: {streak}
                </h3>
        </div>
    );
}

export default Dashboard;
