// const Dashboard = () => (
//     <div>
//         <h1> Welcome back, </h1>
//         <h3> Timelapse </h3>
//     </div>
// );

//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";
import { useEffect } from "react"

const Dashboard = () => {
    //for user database
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const ref = firebase.firestore().collection("users");

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

    var getLastLogDate = Date();

    useEffect(() => {
        localStorage.setItem("lastLogTime", JSON.stringify(getLastLogDate));
      }, [getLastLogDate]);

    const lastLogTime = localStorage.getItem("lastLogTime");
    console.log(lastLogTime);
    var currentTime = Date();
    console.log(currentTime);


// console.log(Date.now());

    // localStorage.setItem('time', +new Date);
    // var lastLogTime = new Date(parseInt(localStorage.getItem('time')));
    // var currentTime = Date();
    // console.log(lastLogTime);
    // console.log(currentTime);

    

    return (
        <div>
            <h1>Welcome back, </h1>
            {/* {users.map((user) => (
                <div key={user.name}>
                    <h2>{user.points}</h2>
                </div>
            ))} */}
        </div>
    );
}

export default Dashboard;
