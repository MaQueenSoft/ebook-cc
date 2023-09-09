// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC_8JlxYMnrg9ugaReOzD9t3-bFxOLtGas",
  authDomain: "vuefirewebapp.firebaseapp.com",
  projectId: "vuefirewebapp",
  storageBucket: "vuefirewebapp.appspot.com",
  messagingSenderId: "549683433046",
  appId: "1:549683433046:web:d20c27f520e77ff46975f7",
  measurementId: "G-6384YBWWCJ"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();
export const fbConfig = firebaseConfig;
