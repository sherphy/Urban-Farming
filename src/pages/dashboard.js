// const Dashboard = () => (
//     <div>
//         <h1> Welcome back, </h1>
//         <h3> Timelapse </h3>
//     </div>
// );

//for user database
// import firebase from "../util/firebase";
// import React, { useState } from "react";

const Dashboard = () => {
    //for user database
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(false);

    // const ref = firebase.firestore().collection("users");

    // if (loading) {
    //     return <h1>Loading...</h1>;
    // }

    return (
        <div>
            <h1>Welcome back</h1>
            {/* {users.map((user) => (
                <div key={user.name}>
                    <h2>{user.points}</h2>
                </div>
            ))} */}
        </div>
    );
}

export default Dashboard;