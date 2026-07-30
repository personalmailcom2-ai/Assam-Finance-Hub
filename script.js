import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const loanForm = document.getElementById("loanForm");

const loader = document.getElementById("loader");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

/* ==========================
   EMI CALCULATOR
========================== */

const calculateBtn = document.getElementById("calculateBtn");

if(calculateBtn){

calculateBtn.onclick = () => {

const amount =
parseFloat(document.getElementById("loanAmount").value);

const rate =
parseFloat(document.getElementById("interestRate").value);

const months =
parseInt(document.getElementById("loanMonths").value);

if(!amount || !rate || !months){

document.getElementById("emiResult").innerHTML =
"Please enter all details.";

return;

}

const r = rate / 12 / 100;

const emi =
(amount * r * Math.pow(1+r,months)) /
(Math.pow(1+r,months)-1);

document.getElementById("emiResult").innerHTML =
"Monthly EMI : ₹ " + emi.toFixed(2);

};

}

/* ==========================
   OTP SETUP
========================== */

import {
getAuth,
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

let confirmationResult = null;

window.onload = () => {

if(document.getElementById("recaptcha-container")){

window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{
size:"normal",
callback:(response)=>{

console.log("reCAPTCHA Verified");

}
}
);

window.recaptchaVerifier.render();

}

};

/* ==========================
   SEND OTP
========================== */

const sendOtpBtn = document.getElementById("sendOtpBtn");

if(sendOtpBtn){

sendOtpBtn.onclick = async () => {

const mobile =
document.getElementById("mobile").value.trim();

if(mobile.length !== 10){

alert("Enter a valid 10 digit mobile number");

return;

}

const phoneNumber = "+91" + mobile;

try{

confirmationResult =
await signInWithPhoneNumber(

auth,
phoneNumber,
window.recaptchaVerifier

);

alert("OTP Sent Successfully");

}catch(err){

console.error(err);

alert(err.message);

}

};

}

/* ==========================
   APPLY FORM SUBMIT
========================== */

if(loanForm){

loanForm.addEventListener("submit", async(e)=>{

e.preventDefault();

if(!confirmationResult){

alert("Please send OTP first.");

return;

}

const otp = document.getElementById("otp").value.trim();

if(otp===""){

alert("Enter OTP");

return;

}

loader.style.display="block";
successMsg.style.display="none";
errorMsg.style.display="none";

try{

await confirmationResult.confirm(otp);

await addDoc(collection(db,"applications"),{

name:document.getElementById("name").value.trim(),

mobile:document.getElementById("mobile").value.trim(),

bike:document.getElementById("bike").value.trim(),

city:document.getElementById("city").value.trim(),

status:"Pending",

createdAt:serverTimestamp()

});

loader.style.display="none";

successMsg.style.display="block";

loanForm.reset();

}catch(err){

console.error(err);

loader.style.display="none";

errorMsg.style.display="block";

}

});

}

/* ==========================
   FINAL CLEANUP
========================== */

function showSuccess(message){

successMsg.innerHTML = message;

successMsg.style.display = "block";

setTimeout(()=>{

successMsg.style.display = "none";

},4000);

}

function showError(message){

errorMsg.innerHTML = message;

errorMsg.style.display = "block";

setTimeout(()=>{

errorMsg.style.display = "none";

},4000);

}

/* Hide Loader */

function hideLoader(){

loader.style.display = "none";

}

/* Reset Form */

function resetApplication(){

loanForm.reset();

confirmationResult = null;

}

/* Auto Hide Messages */

setTimeout(()=>{

if(successMsg){

successMsg.style.display = "none";

}

if(errorMsg){

errorMsg.style.display = "none";

}

},5000);

console.log("Assam Finance Hub V2 Loaded Successfully");
