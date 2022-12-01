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

const firebaseConfig = {
  apiKey: "AIzaSyCrnM2ffbTs-I5dALUQDn6TAw1tKbkFBxo",
  authDomain: "dermaland-838eb.firebaseapp.com",
  projectId: "dermaland-838eb",
  storageBucket: "dermaland-838eb.appspot.com",
  messagingSenderId: "1041067285352",
  appId: "1:1041067285352:web:b91dfe71da89eaf1ed14dd",
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
