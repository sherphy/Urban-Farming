import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAXqEpFzbnhrXvPoZEeIVU5qnnzRDbgi6w",
    authDomain: "eg4301-urban-farming.firebaseapp.com",
    databaseURL: "https://eg4301-urban-farming-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eg4301-urban-farming",
    storageBucket: "eg4301-urban-farming.appspot.com",
    messagingSenderId: "14363207375",
    appId: "1:14363207375:web:96d571fda134fc026b79ba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;