import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqQYX01q_oBkDum7T9z6nVbdg0Zv3mhv0",
  authDomain: "clone-7e892.firebaseapp.com",
  projectId: "clone-7e892",
  storageBucket: "clone-7e892.appspot.com",
  messagingSenderId: "869383223881",
  appId: "1:869383223881:web:82536c345953a3e8681d98",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
