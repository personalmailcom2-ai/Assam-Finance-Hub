/* ==========================================
   FORGOT PASSWORD
========================================== */

forgotPassword.addEventListener("click", async (e) => {

e.preventDefault();

const userEmail = email.value.trim();

if(userEmail===""){

alert("Please enter your email first.");

email.focus();

return;

}

try{

await sendPasswordResetEmail(auth,userEmail);

alert("Password reset email has been sent.");

}catch(error){

alert(error.message);

}

});

/* ==========================================
   ENTER KEY SUPPORT
========================================== */

password.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

loginForm.requestSubmit();

}

});

/* ==========================================
   AUTO LOGIN CHECK
========================================== */

import {

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(user){

window.location.href="admin.html";

}

});

/* ==========================================
   FRIENDLY ERROR MESSAGE
========================================== */

function getFirebaseError(code){

switch(code){

case "auth/invalid-credential":

return "Invalid email or password.";

case "auth/user-not-found":

return "Account not found.";

case "auth/wrong-password":

return "Incorrect password.";

case "auth/invalid-email":

return "Invalid email address.";

case "auth/too-many-requests":

return "Too many attempts. Try again later.";

case "auth/network-request-failed":

return "Check your internet connection.";

default:

return "Login failed. Please try again.";

}

}

/* ==========================================
   SESSION STORAGE
========================================== */

sessionStorage.setItem("appName","Assam Finance Hub");

/* ==========================================
   WINDOW FOCUS
========================================== */

window.addEventListener("focus",()=>{

email.blur();

password.blur();

});

/* ==========================================
   PREVENT MULTIPLE CLICKS
========================================== */

let isLoggingIn=false;

loginForm.addEventListener("submit",async(e)=>{

if(isLoggingIn){

e.preventDefault();

return;

}

isLoggingIn=true;

setTimeout(()=>{

isLoggingIn=false;

},3000);

});

/* ==========================================
   PAGE LOADED
========================================== */

window.addEventListener("load",()=>{

console.log("Login Page Loaded");

});

/* ==========================================
   VERSION
========================================== */

const LOGIN_VERSION="1.0.0";

console.log("Login Version:",LOGIN_VERSION);

/* ==========================================
   END OF LOGIN.JS
========================================== */
