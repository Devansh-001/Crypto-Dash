import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFireStore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_ApiKey,
  authDomain: process.env.NEXT_PUBLIC_AuthDomain,
  projectId: process.env.NEXT_PUBLIC_ProjectId,
  storageBucket: process.env.NEXT_PUBLIC_StorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_MessagingSenderId,
  appId: process.env.NEXT_PUBLIC_AppId,
  measurementId: process.env.NEXT_PUBLIC_MeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);
const db = getFireStore(app);