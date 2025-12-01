import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDRLyoJQrLs9rpDiAsJYLGB4o5DwJd2oa4",
  authDomain: "examensarbete-tilde.firebaseapp.com",
  projectId: "examensarbete-tilde",
  storageBucket: "examensarbete-tilde.firebasestorage.app",
  messagingSenderId: "611602372544",
  appId: "1:611602372544:web:beccd29b17480c3fde9a25"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;
