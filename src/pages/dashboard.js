//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";
import React, { useEffect } from "react";
import moment from "moment";

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
    console.log(secondsToMidnight + " for next reset")
      
    return (
        <div>
            <h1>Welcome back, </h1>
                <h3> 
                    {secondsToMidnight === 0 && streakCounter()};
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
