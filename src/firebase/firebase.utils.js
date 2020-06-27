import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAaqHyh3yj1rjDCCmFwvsVXgBGs1K8mYdM",
  authDomain: "crown-clothing-eff3a.firebaseapp.com",
  databaseURL: "https://crown-clothing-eff3a.firebaseio.com",
  projectId: "crown-clothing-eff3a",
  storageBucket: "crown-clothing-eff3a.appspot.com",
  messagingSenderId: "1050225262568",
  appId: "1:1050225262568:web:97f0d283729630f766ee5d",
  measurementId: "G-2TMDNMQEPC",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
