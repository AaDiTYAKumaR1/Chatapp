// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0N1Nki321XtmdYUPgXfH5KMpWQ6fNXRc",
  authDomain: "chatapp-95305.firebaseapp.com",
  projectId: "chatapp-95305",
  storageBucket: "chatapp-95305.appspot.com",
  messagingSenderId: "426275701589",
  appId: "1:426275701589:web:d973f6e3143679e0ad25dc",
  measurementId: "G-TBME8LQEZK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);