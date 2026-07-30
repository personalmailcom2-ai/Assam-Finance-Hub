import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================
   EMI Calculator
========================== */

const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {

calculateBtn.addEventListener("click", () => {

const amount =
parseFloat(document.getElementById("loanAmount").value);

const rate =
parseFloat(document.getElementById("interestRate").value);

const years =
parseFloat(document.getElementById("loanYears").value);

if (!amount || !rate || !years) {

alert("Please fill all EMI fields.");

return;

}

const monthlyRate = rate / 12 / 100;

const months = years * 12;

const emi =

(amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /

(Math.pow(1 + monthlyRate, months) - 1);

document.getElementById("emiResult").innerHTML =
"₹ " + emi.toFixed(2) + " / Month";

});

}

/* ==========================
   User Signup
========================== */

const signupBtn =
document.getElementById("signupBtn");

if (signupBtn) {

signupBtn.addEventListener("click", async () => {

const email =
document.getElementById("signupEmail").value.trim();

const password =
document.getElementById("signupPassword").value;

try {

await createUserWithEmailAndPassword(
auth,
email,
password
);

alert("Account Created Successfully");

}
catch(error){

alert(error.message);

}

});

}

/* ==========================
   User Login
========================== */

const loginBtn =
document.getElementById("loginBtn");

if(loginBtn){

loginBtn.addEventListener("click", async()=>{

const email =
document.getElementById("loginEmail").value.trim();

const password =
document.getElementById("loginPassword").value;

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login Successful");

}
catch(error){

alert(error.message);

}

});

}

/* ==========================
   Loan Application
========================== */

const loanForm = document.getElementById("loanForm");

if (loanForm) {

loanForm.addEventListener("submit", async (e) => {

e.preventDefault();

const data = {

name: document.getElementById("fullName").value.trim(),

email: document.getElementById("email").value.trim(),

mobile: document.getElementById("mobile").value.trim(),

address: document.getElementById("address").value.trim(),

income: Number(document.getElementById("income").value),

loanAmount: Number(document.getElementById("loan").value),

employment: document.getElementById("employment").value,

remarks: document.getElementById("remarks").value.trim(),

status: "Pending",

createdAt: serverTimestamp()

};

try{

await addDoc(

collection(db,"applications"),

data

);

alert("Loan Application Submitted Successfully");

loanForm.reset();

}
catch(error){

alert(error.message);

}

});

}

/* ==========================
   Auth State
========================== */

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged In :",user.email);

}else{

console.log("No User Logged In");

}

});

/* ==========================
   Logout
========================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

logoutBtn.addEventListener("click", async () => {

try {

await signOut(auth);

alert("Logged Out Successfully");

}
catch (error) {

alert(error.message);

}

});

}

/* ==========================
   Auto User Status
========================== */

onAuthStateChanged(auth, (user) => {

const loginModal = document.getElementById("loginModal");

if (user) {

console.log("Current User :", user.email);

if (loginModal) {
loginModal.style.display = "none";
}

} else {

console.log("User Not Logged In");

if (loginModal) {
loginModal.style.display = "flex";
}

}

});

/* ==========================
   Close Modal
========================== */

window.addEventListener("click", (e) => {

const modal = document.getElementById("loginModal");

if (!modal) return;

if (e.target === modal) {

modal.style.display = "none";

}

});

/* ==========================
   Application Loaded
========================== */

console.log("Assam Finance Hub Loaded Successfully");
