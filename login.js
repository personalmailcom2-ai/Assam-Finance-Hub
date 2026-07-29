import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnQPG-tdceOqxxfEzHIYdpr6pBJDcOgbM",
  authDomain: "assam-finance-hub.firebaseapp.com",
  projectId: "assam-finance-hub",
  storageBucket: "assam-finance-hub.firebasestorage.app",
  messagingSenderId: "989678663450",
  appId: "1:989678663450:web:d0499bf58d8dd382325ea3",
  measurementId: "G-H1SX3EDQJM"
};
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Successful");

    window.location.href = "admin.html";

  } catch (error) {

    alert(error.message);

  }

});
