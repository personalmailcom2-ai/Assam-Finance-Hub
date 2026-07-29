import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnQFG-tdce0gxxfEhIYdpr6BJDcQgbW",
  authDomain: "assam-finance-hub.firebaseapp.com",
  databaseURL: "https://assam-finance-hub-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assam-finance-hub",
  storageBucket: "assam-finance-hub.firebasestorage.app",
  messagingSenderId: "989678663450",
  appId: "1:989678663450:web:d0499bf58d8dd382325ea3",
  measurementId: "G-H15X3EDQJW"
};

const app = initializeApp(firebaseConfig);
window.app = app;

const db = getFirestore(app);

window.db = db;
window.auth = getAuth(app);
