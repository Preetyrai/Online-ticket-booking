// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const firebaseConfig = {
  apiKey: "AIzaSyBedqhg3rIEWxDwMtvm34QBDBnzsoeWnxQ",
  authDomain: "online-movie-ticket-e3988.firebaseapp.com",
  projectId: "online-movie-ticket-e3988",
  storageBucket: "online-movie-ticket-e3988.appspot.com",
  messagingSenderId: "414219620324",
  appId: "1:414219620324:web:8af0b788001ec5375a01f1",
  measurementId: "G-JBHZXLJJPF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);