import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBk7T08dLBT-KrBOYNHI0Q90nS9abaARIk",
  authDomain: "payroll-manager-36187.firebaseapp.com",
  projectId: "payroll-manager-36187",
  storageBucket: "payroll-manager-36187.appspot.com",
  messagingSenderId: "270968068969",
  appId: "1:270968068969:web:ff8f4e04b8c9f7e30d3bf8",
};
firebase.initializeApp(firebaseConfig);

// Utils
const auth = firebase.auth();

// Exports
export { auth };
