// import { createContext, useEffect, useState, useContext } from "react";
// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged
// } from "firebase/auth";
// import { auth } from "../util/firebase";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {

//     const [user, setUser] = useState({});

//     function signUp(email, password) {
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     function logIn(email, password) {
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     function logOut() {
//         return signOut(auth);
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             console.log("Auth", currentUser);
//             setUser(currentUser);
//         });
//         return () => {
//             unsubscribe();
//         }
//     }, []);

//     return (
//     <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
//         {children}
//     </userAuthContext.Provider>
//     );
// }

// export function useUserAuth() {
//     return useContext(userAuthContext);
// }