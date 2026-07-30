import { app } from "./firebase.js";

import {
getFirestore,
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
RecaptchaVerifier,
signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

let confirmationResult = null;

/* ==========================
   DOM
========================== */

const loanForm = document.getElementById("loanForm");
const sendOtpBtn = document.getElementById("sendOtpBtn");

const loader = document.getElementById("loader");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanMonths = document.getElementById("loanMonths");
const calculateBtn = document.getElementById("calculateBtn");
const emiResult = document.getElementById("emiResult");

/* ==========================
   RECAPTCHA
========================== */

window.recaptchaVerifier = new RecaptchaVerifier(
auth,
"recaptcha-container",
{
size:"normal"
}
);

/* ==========================
   SEND OTP
========================== */

sendOtpBtn.addEventListener("click", async()=>{

const mobile =
document.getElementById("mobile").value.trim();

if(mobile.length!==10){

alert("Enter Valid Mobile Number");

return;

}

loader.style.display="block";

try{

confirmationResult = await signInWithPhoneNumber(

auth,

"+91"+mobile,

window.recaptchaVerifier

);

loader.style.display="none";

alert("OTP Sent Successfully");

}catch(err){

loader.style.display="none";

console.error(err);

alert(err.message);

}

});

/* ==========================
   VERIFY OTP & SAVE DATA
========================== */

loanForm.addEventListener("submit", async(e)=>{

e.preventDefault();

if(!confirmationResult){

alert("Please send OTP first.");

return;

}

const otp =
document.getElementById("otp").value.trim();

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

confirmationResult=null;

window.recaptchaVerifier=new RecaptchaVerifier(

auth,

"recaptcha-container",

{

size:"normal"

}

);

}catch(err){

loader.style.display="none";

errorMsg.style.display="block";

console.error(err);

}

});

/* ==========================
   EMI CALCULATOR
========================== */

calculateBtn.addEventListener("click",()=>{

const P = parseFloat(loanAmount.value);

const annualRate = parseFloat(interestRate.value);

const N = parseInt(loanMonths.value);

if(isNaN(P) || isNaN(annualRate) || isNaN(N)){

emiResult.innerHTML="Please enter all values.";

return;

}

const R = annualRate / 12 / 100;

const emi = (P * R * Math.pow(1 + R, N)) /
            (Math.pow(1 + R, N) - 1);

const totalPayment = emi * N;

const totalInterest = totalPayment - P;

emiResult.innerHTML = `

<h3>EMI Details</h3>

<p><strong>Monthly EMI:</strong> ₹${emi.toFixed(2)}</p>

<p><strong>Total Interest:</strong> ₹${totalInterest.toFixed(2)}</p>

<p><strong>Total Payment:</strong> ₹${totalPayment.toFixed(2)}</p>

`;

});

/* ==========================
   RESET FORM
========================== */

function resetForm(){

loanForm.reset();

confirmationResult = null;

successMsg.style.display = "none";

errorMsg.style.display = "none";

}

/* ==========================
   SUCCESS MESSAGE
========================== */

function showSuccess(message){

successMsg.innerHTML = message;

successMsg.style.display = "block";

errorMsg.style.display = "none";

setTimeout(()=>{

successMsg.style.display = "none";

},4000);

}

/* ==========================
   ERROR MESSAGE
========================== */

function showError(message){

errorMsg.innerHTML = message;

errorMsg.style.display = "block";

successMsg.style.display = "none";

setTimeout(()=>{

errorMsg.style.display = "none";

},4000);

}

/* ==========================
   HIDE LOADER
========================== */

function hideLoader(){

loader.style.display = "none";

}

/* ==========================
   PAGE READY
========================== */

window.addEventListener("load",()=>{

hideLoader();

console.log("Assam Finance Hub Ready");

});

/* ==========================
   AUTO HIDE MESSAGES
========================== */

setInterval(()=>{

if(successMsg.style.display==="block"){

successMsg.style.display="none";

}

if(errorMsg.style.display==="block"){

errorMsg.style.display="none";

}

},5000);

/* ==========================
   ENTER KEY FOR EMI
========================== */

[loanAmount,interestRate,loanMonths].forEach(input=>{

input.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

calculateBtn.click();

}

});

});

/* ==========================
   END OF FILE
========================== */

console.log("script.js Loaded Successfully");
