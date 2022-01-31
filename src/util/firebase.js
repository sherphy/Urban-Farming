import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import "firebase/compat/firestore";
// //i put product photos in storage. can go local if u want 
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAXqEpFzbnhrXvPoZEeIVU5qnnzRDbgi6w",
    authDomain: "eg4301-urban-farming.firebaseapp.com",
    databaseURL: "https://eg4301-urban-farming-default-rtdb.asia-southeast1.firebasedatabase.app",
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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }