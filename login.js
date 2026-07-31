// ==========================================
// ASSAM FINANCE HUB
// login.js
// ==========================================

import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword,
sendPasswordResetEmail,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ==========================================
   DOM
========================================== */

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const forgotPassword = document.getElementById("forgotPassword");
const togglePassword = document.getElementById("togglePassword");

/* ==========================================
   AUTO LOGIN
========================================== */

onAuthStateChanged(auth, (user) => {

if(user){

window.location.href = "admin.html";

}

});

/* ==========================================
   LOGIN
========================================== */

let isLoggingIn = false;

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

if(isLoggingIn) return;

const userEmail = email.value.trim();
const userPassword = password.value;

if(userEmail==="" || userPassword===""){

alert("Please enter email and password.");

return;

}

isLoggingIn=true;

loginBtn.disabled=true;
loginBtn.innerText="Logging in...";

try{

await signInWithEmailAndPassword(
auth,
userEmail,
userPassword
);

alert("Login Successful");

window.location.href="admin.html";

}catch(error){

alert(getFirebaseError(error.code));

}

loginBtn.disabled=false;
loginBtn.innerText="Login";
isLoggingIn=false;

});

/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */

if(togglePassword){

togglePassword.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";
togglePassword.classList.remove("fa-eye");
togglePassword.classList.add("fa-eye-slash");

}else{

password.type="password";
togglePassword.classList.remove("fa-eye-slash");
togglePassword.classList.add("fa-eye");

}

});

}

/* ==========================================
   FORGOT PASSWORD
========================================== */

forgotPassword.addEventListener("click",async(e)=>{

e.preventDefault();

const userEmail=email.value.trim();

if(userEmail===""){

alert("Enter your email first.");

email.focus();

return;

}

try{

await sendPasswordResetEmail(auth,userEmail);

alert("Password reset email sent.");

}catch(error){

alert(getFirebaseError(error.code));

}

});

/* ==========================================
   ENTER KEY
========================================== */

password.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

loginForm.requestSubmit();

}

});

/* ==========================================
   FRIENDLY ERRORS
========================================== */

function getFirebaseError(code){

switch(code){

case "auth/invalid-credential":
return "Invalid email or password.";

case "auth/user-not-found":
return "User not found.";

case "auth/wrong-password":
return "Incorrect password.";

case "auth/invalid-email":
return "Invalid email.";

case "auth/network-request-failed":
return "No internet connection.";

case "auth/too-many-requests":
return "Too many attempts. Try later.";

default:
return "Login failed.";

}

}

/* ==========================================
   VERSION
========================================== */

console.log("Login.js v1.0 Loaded");
