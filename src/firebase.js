import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGEBASKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FB_APPID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENTID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);