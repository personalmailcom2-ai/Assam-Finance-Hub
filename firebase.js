import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnQPG-tdceOqxxfEzHIYdpr6pBJDcOgbM",
  authDomain: "assam-finance-hub.firebaseapp.com",
  projectId: "assam-finance-hub",
  storageBucket: "assam-finance-hub.firebasestorage.app",
  messagingSenderId: "989678663450",
  appId: "1:989678663450:web:d0499bf58d8dd382325ea3",
  measurementId: "G-H15X3EDQJW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };
