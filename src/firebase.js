import firebase from "firebase";

/* const firebaseConfig = {
  apiKey: "AIzaSyAvEGQPLyEAQsWnlZfol_tyzcQC7X9u8tU",
  authDomain: "ubytes-dashboard.firebaseapp.com",
  projectId: "ubytes-dashboard",
  storageBucket: "ubytes-dashboard.appspot.com",
  messagingSenderId: "774065251125",
  appId: "1:774065251125:web:b22a1161130bc36cc7627c",
  measurementId: "G-RH8QZ73EVQ",
}; */
 const firebaseConfig = {
  apiKey: "AIzaSyAko2gWSHPupgr6d0ilTuro-WE1ttoM-Nw",
  authDomain: "dashboard-ubytes.firebaseapp.com",
  databaseURL: "https://dashboard-ubytes-default-rtdb.firebaseio.com",
  projectId: "dashboard-ubytes",
  storageBucket: "dashboard-ubytes.appspot.com",
  messagingSenderId: "15791377745",
  appId: "1:15791377745:web:0058568bf275fc4da65770",
}; 
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
const firestore = firebase.firestore();
export const auth = firebase.auth();
export default firestore;
