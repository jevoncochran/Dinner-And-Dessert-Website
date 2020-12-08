import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgRQbYW484JuW0ku-B2vc93-JIRE2imfs",
  authDomain: "dinneranddessert-6140e.firebaseapp.com",
  projectId: "dinneranddessert-6140e",
  storageBucket: "dinneranddessert-6140e.appspot.com",
  messagingSenderId: "549536603685",
  appId: "1:549536603685:web:a182a3ba15c729f251a9cc",
  measurementId: "G-L2VQD8KFJM"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
