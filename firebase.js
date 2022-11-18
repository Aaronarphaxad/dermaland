import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  // getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
} from "firebase/auth";

import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

export {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const onAuthState = onAuthStateChanged;
export const createUser = createUserWithEmailAndPassword;
export const signIn = signInWithEmailAndPassword;
export const sendResetPassword = sendPasswordResetEmail;
export const sendEmailverification = sendEmailVerification;
export const updateUserProfile = updateProfile;
export const deleteAccount = deleteUser;
