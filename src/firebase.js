// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqiyba_3L9F7HmMrei68qmTl2yMGLZp7s",
  authDomain: "do-trang-suc.firebaseapp.com",
  projectId: "do-trang-suc",
  storageBucket: "do-trang-suc.appspot.com",
  messagingSenderId: "128507391197",
  appId: "1:128507391197:web:32015cb9a2949f48093f34",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
