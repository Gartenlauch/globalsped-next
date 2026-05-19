import { getApp, getApps, initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const functions = getFunctions(firebaseApp, "europe-west3");
console.log("Firebase Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);