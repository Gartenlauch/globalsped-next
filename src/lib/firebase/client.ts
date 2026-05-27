import { getApp, getApps, initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: "globalsped-next.firebaseapp.com",
  projectId: "globalsped-next",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  storageBucket: "globalsped-next.firebasestorage.app",
  
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const functions = getFunctions(firebaseApp, "europe-west3");
export const storage = getStorage(
  firebaseApp,
  "gs://globalsped-next.firebasestorage.app"
);
//console.log("Firebase Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);