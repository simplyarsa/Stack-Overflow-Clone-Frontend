// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQe5JIh_PAqgeLipdB_WGC1jEHXRQnWCI",
  authDomain: "fir-react-4ca36.firebaseapp.com",
  projectId: "fir-react-4ca36",
  storageBucket: "fir-react-4ca36.appspot.com",
  messagingSenderId: "652782285671",
  appId: "1:652782285671:web:343b724ae3787704cdf5c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;