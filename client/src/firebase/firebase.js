import firebase from "firebase/app";
import "firebase/auth";

const prodConfig = {
  apiKey: "AIzaSyBIXfaIy3BEqL5SgkJkfcpQCoShPR_jPvo",
  authDomain: "carlog-70850.firebaseapp.com",
  databaseURL: "https://carlog-70850.firebaseio.com",
  projectId: "carlog-70850",
  storageBucket: "carlog-70850.appspot.com",
  messagingSenderId: "101715794551"
};

const devConfig = {
  apiKey: "AIzaSyBIXfaIy3BEqL5SgkJkfcpQCoShPR_jPvo",
  authDomain: "carlog-70850.firebaseapp.com",
  databaseURL: "https://carlog-70850.firebaseio.com",
  projectId: "carlog-70850",
  storageBucket: "carlog-70850.appspot.com",
  messagingSenderId: "101715794551"
};

const config = process.env.NODE_ENV === "production"
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};