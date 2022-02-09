import firebase from "firebase";
import toast from "react-hot-toast";

// Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj4mP9Yg9rjOYyjCXUKYJzR7i-svmyZm8",
  authDomain: "bianca-pwo.firebaseapp.com",
  projectId: "bianca-pwo",
  storageBucket: "bianca-pwo.appspot.com",
  messagingSenderId: "629095808757",
  appId: "1:629095808757:web:417bacb1bb9f58579fcfbc",
};

// Initialization
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const USERS_COLLECTION = "users";
const ACTIVITIES_SUB_COLLECTION = "activities";

// Authentication Helper Functions
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;

    db.collection(USERS_COLLECTION).doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      auth: "google",
      email: user.email,
    });

    db.collection(USERS_COLLECTION).doc(user.uid).collection('activities');
  } catch (err) {
    console.error(err);
    toast.error(err.message, {
      id: 'global'
    });
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    toast.error(err.message, {
      id: 'global'
    });
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection(USERS_COLLECTION).doc(user.uid).set({
      uid: user.uid,
      name,
      auth: "email",
      email,
    });

    await db.collection(USERS_COLLECTION).doc(user.uid).collection('activities');
  } catch (err) {
    console.error(err);
    toast.error(err.message, {
      id: 'global'
    });
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    toast.error("Password reset link sent!");
  } catch (err) {
    console.error(err);
    toast.error(err.message, {
      id: 'global'
    });
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  USERS_COLLECTION,
  ACTIVITIES_SUB_COLLECTION,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
