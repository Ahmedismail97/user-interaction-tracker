import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyByBF-LP2-nUkMdd-EU9wSC2HyON7QXSDQ",
  authDomain: "test-7d7a8.firebaseapp.com",
  databaseURL: "https://test-7d7a8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-7d7a8",
  storageBucket: "test-7d7a8.appspot.com",
  messagingSenderId: "1001951439783",
  appId: "1:1001951439783:web:cb127fb8cc8ebc5b0a6482",
  measurementId: "G-2DRPS45N7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
