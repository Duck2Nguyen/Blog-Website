import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "AIzaSyAfASrMic2WnRkq_DnB5kmFESKEUoNXULs",
    authDomain: "blog-website-6a89a.firebaseapp.com",
    projectId: "blog-website-6a89a",
    storageBucket: "blog-website-6a89a.appspot.com",
    messagingSenderId: "31315244773",
    appId: "1:31315244773:web:27681632826942aa2a060c",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;