// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe3h7YrCtm93_zx2PXEaI4UlgpWG2iiQI",
  authDomain: "react-tutorial-935c1.firebaseapp.com",
  projectId: "react-tutorial-935c1",
  storageBucket: "react-tutorial-935c1.appspot.com",
  messagingSenderId: "123882085914",
  appId: "1:123882085914:web:b1c6d6914c04eab534fba3",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
