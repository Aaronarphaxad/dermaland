import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, onAuthState } from "../../firebase";
// const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthState(auth, (user) => {
      if (user) {
        // User is signed in and verified
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  React.useEffect(() => {
    console.log("Current user id:", auth?.currentUser?.uid);
  }, [auth.currentUser]);

  return {
    user,
  };
}
