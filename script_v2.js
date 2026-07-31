// ==========================================
// ASSAM FINANCE HUB
// PREMIUM SCRIPT v2.0
// PART 1
// ==========================================

import { db } from "./firebase.js";

import {

collection,
addDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================================
LOADER
========================================== */

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

setTimeout(()=>{

loader.style.display="none";

},1200);

}

});

/* ==========================================
EMI CALCULATOR
========================================== */

const calculateBtn=document.getElementById("calculateBtn");

if(calculateBtn){

calculateBtn.addEventListener("click",()=>{

const amount=parseFloat(document.getElementById("loanAmount").value);

const rate=parseFloat(document.getElementById("interestRate").value)/12/100;

const months=parseFloat(document.getElementById("loanTenure").value);

if(!amount || !rate || !months){

alert("Please fill all EMI fields.");

return;

}

const emi=(amount*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)-1);

document.getElementById("emiResult").innerHTML=

`Monthly EMI : <strong>₹${emi.toFixed(0)}</strong>`;

});

}

/* ==========================================
SCROLL TOP
========================================== */

const scrollBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

scrollBtn.style.display="block";

}else{

scrollBtn.style.display="none";

}

});

scrollBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================================
DARK MODE
========================================== */

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

document.body.classList.add("dark");

}

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark") ? "dark" : "light"

);

});

}

/* ==========================================
SMOOTH MENU
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", function(e) {

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ==========================================
HEADER SHADOW
========================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

header.style.boxShadow="0 10px 30px rgba(0,0,0,.12)";

}else{

header.style.boxShadow="none";

}

});

/* ==========================================
COUNTER ANIMATION
========================================== */

const counters=document.querySelectorAll(".statistics-card h2");

let started=false;

window.addEventListener("scroll",()=>{

if(started) return;

const section=document.querySelector(".statistics");

if(!section) return;

const top=section.offsetTop;

if(window.scrollY>top-400){

started=true;

counters.forEach(counter=>{

const value=parseInt(counter.innerText.replace(/\D/g,""))||0;

let count=0;

const speed=value/100;

const timer=setInterval(()=>{

count+=speed;

if(count>=value){

counter.innerText=counter.innerText.includes("₹")

? "₹"+value+"Cr+"

: counter.innerText.includes("%")
? value+"%"
: value+"+";

clearInterval(timer);

}else{

counter.innerText=Math.floor(count);

}

},20);

});

}

});

/* ==========================================
REVEAL ANIMATION
========================================== */

const revealItems=document.querySelectorAll(

".feature-card,.service-card,.review-card,.document-card,.statistics-card,.why-box"

);

const reveal=()=>{

revealItems.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<window.innerHeight-100){

item.style.opacity="1";

item.style.transform="translateY(0px)";

}

});

};

revealItems.forEach(item=>{

item.style.opacity="0";

item.style.transform="translateY(40px)";

item.style.transition=".6s";

});

window.addEventListener("scroll",reveal);

reveal();

/* ==========================================
LOAN FORM SUBMIT (FIREBASE)
========================================== */

const loanForm = document.getElementById("loanForm");

if (loanForm) {

loanForm.addEventListener("submit", async (e) => {

e.preventDefault();

const submitBtn = loanForm.querySelector(".submit-btn");

submitBtn.disabled = true;
submitBtn.innerHTML = "Submitting...";

try {

const data = {

name: document.getElementById("name").value.trim(),

mobile: document.getElementById("mobile").value.trim(),

email: document.getElementById("email").value.trim(),

city: document.getElementById("city").value.trim(),

bike: document.getElementById("bike").value,

bikeModel: document.getElementById("bikeModel").value.trim(),

amount: document.getElementById("amount").value,

income: document.getElementById("income").value,

aadhaar: document.getElementById("aadhaar").value.trim(),

pan: document.getElementById("pan").value.trim(),

address: document.getElementById("address").value.trim(),

status: "Pending",

createdAt: serverTimestamp()

};

await addDoc(collection(db, "applications"), data);

alert("✅ Loan Application Submitted Successfully!");

loanForm.reset();

document.getElementById("emiResult").innerHTML =
"Monthly EMI will appear here.";

} catch (err) {

console.error(err);

alert("❌ Failed to submit application.");

}

submitBtn.disabled = false;
submitBtn.innerHTML =

'<i class="fa-solid fa-paper-plane"></i> Submit Loan Application';

});

}

/* ==========================================
PHONE VALIDATION
========================================== */

const mobileInput = document.getElementById("mobile");

if (mobileInput) {

mobileInput.addEventListener("input", () => {

mobileInput.value = mobileInput.value.replace(/\D/g, "");

if (mobileInput.value.length > 10) {

mobileInput.value = mobileInput.value.slice(0, 10);

}

});

}

/* ==========================================
AADHAAR VALIDATION
========================================== */

const aadhaarInput = document.getElementById("aadhaar");

if (aadhaarInput) {

aadhaarInput.addEventListener("input", () => {

aadhaarInput.value = aadhaarInput.value.replace(/\D/g, "");

if (aadhaarInput.value.length > 12) {

aadhaarInput.value = aadhaarInput.value.slice(0,12);

}

});

}

/* ==========================================
PAN VALIDATION
========================================== */

const panInput = document.getElementById("pan");

if (panInput) {

panInput.addEventListener("input", () => {

panInput.value = panInput.value.toUpperCase();

});

}

/* ==========================================
TOAST NOTIFICATION
========================================== */

function showToast(message){

const toast=document.getElementById("toastNotification");

const text=document.getElementById("toastMessage");

if(!toast || !text) return;

text.innerText=message;

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},3000);

}

/* ==========================================
WELCOME MESSAGE
========================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

showToast("Welcome to Assam Finance Hub");

},1500);

});

/* ==========================================
WHATSAPP BUTTON
========================================== */

const whatsappBtn=document.querySelector(".floating-whatsapp");

if(whatsappBtn){

whatsappBtn.addEventListener("click",()=>{

console.log("Opening WhatsApp...");

});

}

/* ==========================================
CALL BUTTON
========================================== */

const callBtn=document.querySelector(".floating-call");

if(callBtn){

callBtn.addEventListener("click",()=>{

console.log("Calling Support...");

});

}

/* ==========================================
NEWSLETTER
========================================== */

const newsletter=document.querySelector(".newsletter-form");

if(newsletter){

newsletter.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Thank you for subscribing!");

newsletter.reset();

});

}

/* ==========================================
BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

circle.style.position="absolute";

circle.style.width="20px";

circle.style.height="20px";

circle.style.background="rgba(255,255,255,.5)";

circle.style.borderRadius="50%";

circle.style.left=e.offsetX+"px";

circle.style.top=e.offsetY+"px";

circle.style.transform="translate(-50%,-50%)";

circle.style.animation="ripple .6s linear";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

/* ==========================================
PAGE TITLE
========================================== */

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

document.title="Come Back | Assam Finance Hub";

}else{

document.title="Assam Finance Hub";

}

});

/* ==========================================
VERSION
========================================== */

const APP_VERSION="2.0.0";

console.log("Assam Finance Hub Version:",APP_VERSION);

/* ==========================================
ASSAM FINANCE HUB
SCRIPT.JS PART 5 (FINAL)
========================================== */

/* ==========================================
ONLINE / OFFLINE STATUS
========================================== */

function updateNetworkStatus() {

if (navigator.onLine) {

showToast("🟢 Internet Connected");

} else {

showToast("🔴 No Internet Connection");

}

}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

/* ==========================================
AUTO YEAR
========================================== */

const yearElement = document.getElementById("currentYear");

if (yearElement) {

yearElement.innerText = new Date().getFullYear();

}

/* ==========================================
KEYBOARD SHORTCUT
========================================== */

document.addEventListener("keydown", (e) => {

if (e.ctrlKey && e.key.toLowerCase() === "h") {

window.location.href = "admin.html";

}

});

/* ==========================================
PREVENT DOUBLE SUBMIT
========================================== */

let submitting = false;

const form = document.getElementById("loanForm");

if (form) {

form.addEventListener("submit", (e) => {

if (submitting) {

e.preventDefault();

return;

}

submitting = true;

setTimeout(() => {

submitting = false;

}, 3000);

});

}

/* ==========================================
AUTO HIGHLIGHT MENU
========================================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach((section) => {

const top = section.offsetTop - 120;

if (scrollY >= top) {

current = section.getAttribute("id");

}

});

navLinks.forEach((link) => {

link.classList.remove("active");

if (link.getAttribute("href") === "#" + current) {

link.classList.add("active");

}

});

});

/* ==========================================
GLOBAL ERROR HANDLER
========================================== */

window.addEventListener("error", (e) => {

console.error("JavaScript Error:", e.message);

});

/* ==========================================
UNHANDLED PROMISE
========================================== */

window.addEventListener("unhandledrejection", (e) => {

console.error("Promise Error:", e.reason);

});

/* ==========================================
CONSOLE
========================================== */

console.log("================================");
console.log("ASSAM FINANCE HUB");
console.log("Premium Version 2.0");
console.log("Firebase Connected");
console.log("Script Loaded Successfully");
console.log("================================");

/* ==========================================
END OF SCRIPT.JS
========================================== */
