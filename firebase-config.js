import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnQFG-tdce0gxxfEhIYdpr6BJDcQgbW",
  authDomain: "assam-finance-hub.firebaseapp.com",
  projectId: "assam-finance-hub",
  storageBucket: "assam-finance-hub.firebasestorage.app",
  messagingSenderId: "989678663450",
  appId: "1:989678663450:web:d0499bf58d8dd382325ea3",
  measurementId: "G-H15X3EDQJW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
