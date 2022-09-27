// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoypLkPmCxDKpYvpJFGMbAhj5oDh1KfzM",
  authDomain: "chat1-d26c0.firebaseapp.com",
  databaseURL: "https://chat1-d26c0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat1-d26c0",
  storageBucket: "chat1-d26c0.appspot.com",
  messagingSenderId: "76212326603",
  appId: "1:76212326603:web:03225ad6fa118d01bacb4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };