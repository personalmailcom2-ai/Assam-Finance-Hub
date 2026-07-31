/* ==========================================
ASSAM FINANCE HUB
app.js
Part 1/20
========================================== */

// ==========================================
// GLOBAL VARIABLES
// ==========================================

const body = document.body;

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

const backToTop = document.querySelector(".back-to-top");

const themeBtn = document.querySelector(".theme-btn");

// ==========================================
// MOBILE MENU
// ==========================================

if(menuBtn){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("active");

});

}

// ==========================================
// CLOSE MENU
// ==========================================

document.addEventListener("click",(e)=>{

if(
mobileMenu &&
menuBtn &&
!mobileMenu.contains(e.target) &&
!menuBtn.contains(e.target)
){

mobileMenu.classList.remove("active");

}

});

// ==========================================
// BACK TO TOP
// ==========================================

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

backToTop?.classList.add("show");

}else{

backToTop?.classList.remove("show");

}

});

backToTop?.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

// ==========================================
// DARK MODE
// ==========================================

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){

body.classList.add("dark-mode");

}

themeBtn?.addEventListener("click",()=>{

body.classList.toggle("dark-mode");

if(body.classList.contains("dark-mode")){

localStorage.setItem("theme","dark");

}else{

localStorage.setItem("theme","light");

}

});

// ==========================================
// PRELOADER
// ==========================================

window.addEventListener("load",()=>{

const loader=document.querySelector(".preloader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.remove();

},500);

}

});

console.log("Assam Finance Hub Loaded Successfully");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 2/20
========================================== */

// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message,type="success"){

const toast=document.querySelector(".toast");

if(!toast) return;

toast.innerText=message;

toast.className="toast show";

if(type==="success"){

toast.style.background="#16a34a";

}else if(type==="error"){

toast.style.background="#dc2626";

}else{

toast.style.background="#2563eb";

}

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

// ==========================================
// MODAL
// ==========================================

const openButtons=document.querySelectorAll("[data-modal]");
const closeButtons=document.querySelectorAll(".modal-close");
const modals=document.querySelectorAll(".modal");

openButtons.forEach(button=>{

button.addEventListener("click",()=>{

const modal=document.getElementById(button.dataset.modal);

if(modal){

modal.classList.add("active");

}

});

});

closeButtons.forEach(button=>{

button.addEventListener("click",()=>{

button.closest(".modal").classList.remove("active");

});

});

window.addEventListener("click",(e)=>{

modals.forEach(modal=>{

if(e.target===modal){

modal.classList.remove("active");

}

});

});

// ==========================================
// TABS
// ==========================================

document.querySelectorAll(".tab-btn").forEach(button=>{

button.addEventListener("click",()=>{

const target=button.dataset.tab;

document.querySelectorAll(".tab-btn").forEach(btn=>{

btn.classList.remove("active");

});

document.querySelectorAll(".tab-content").forEach(content=>{

content.classList.remove("active");

});

button.classList.add("active");

document.getElementById(target)?.classList.add("active");

});

});

// ==========================================
// ACCORDION
// ==========================================

document.querySelectorAll(".accordion-header").forEach(header=>{

header.addEventListener("click",()=>{

const item=header.parentElement;

item.classList.toggle("active");

});

});

// ==========================================
// FADE ANIMATION
// ==========================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

},{

threshold:0.2

});

document.querySelectorAll(".animate").forEach(el=>{

observer.observe(el);

});

// ==========================================
// SAMPLE TOAST
// ==========================================

console.log("App.js Part 2 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 3/20
========================================== */

// ==========================================
// MOBILE DRAWER
// ==========================================

const drawer=document.querySelector(".mobile-drawer");
const drawerBtn=document.querySelector(".drawer-btn");
const drawerOverlay=document.querySelector(".drawer-overlay");

drawerBtn?.addEventListener("click",()=>{

drawer?.classList.add("active");
drawerOverlay?.classList.add("active");

});

drawerOverlay?.addEventListener("click",()=>{

drawer?.classList.remove("active");
drawerOverlay?.classList.remove("active");

});

// ==========================================
// LIVE SEARCH
// ==========================================

const searchInput=document.querySelector("#liveSearch");

searchInput?.addEventListener("keyup",()=>{

const filter=searchInput.value.toLowerCase();

document.querySelectorAll(".search-item").forEach(item=>{

const text=item.innerText.toLowerCase();

item.style.display=text.includes(filter)?"":"none";

});

});

// ==========================================
// SIMPLE PAGINATION
// ==========================================

const rowsPerPage=10;

const table=document.querySelector(".pagination-table");

if(table){

const rows=[...table.querySelectorAll("tbody tr")];

let currentPage=1;

function displayPage(page){

currentPage=page;

rows.forEach((row,index)=>{

row.style.display=(index>=((page-1)*rowsPerPage) &&
index<(page*rowsPerPage))
?"":"none";

});

}

displayPage(1);

}

// ==========================================
// BUTTON LOADING
// ==========================================

document.querySelectorAll(".loading-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const text=btn.innerHTML;

btn.disabled=true;
btn.innerHTML="Loading...";

setTimeout(()=>{

btn.disabled=false;
btn.innerHTML=text;

},2000);

});

});

// ==========================================
// CHARACTER COUNTER
// ==========================================

document.querySelectorAll("[maxlength]").forEach(input=>{

const counter=document.createElement("small");

counter.style.display="block";
counter.style.marginTop="5px";

input.after(counter);

function updateCounter(){

counter.innerText=`${input.value.length}/${input.maxLength}`;

}

updateCounter();

input.addEventListener("input",updateCounter);

});

// ==========================================
// COPY TO CLIPBOARD
// ==========================================

document.querySelectorAll("[data-copy]").forEach(btn=>{

btn.addEventListener("click",()=>{

const value=btn.dataset.copy;

navigator.clipboard.writeText(value);

showToast("Copied Successfully","success");

});

});

console.log("App.js Part 3 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 4/20
========================================== */

// ==========================================
// CHART.JS DASHBOARD
// ==========================================

const incomeChart=document.getElementById("incomeChart");

if(incomeChart){

new Chart(incomeChart,{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{

label:"Monthly Income",

data:[12000,18000,15000,24000,27000,32000],

borderColor:"#0057ff",

backgroundColor:"rgba(0,87,255,.15)",

fill:true,

tension:.4

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:true

}

}

}

});

}

// ==========================================
// DASHBOARD COUNTER
// ==========================================

document.querySelectorAll("[data-count]").forEach(counter=>{

const target=Number(counter.dataset.count);

let value=0;

const speed=Math.ceil(target/100);

const update=()=>{

value+=speed;

if(value>=target){

counter.innerText=target.toLocaleString();

}else{

counter.innerText=value.toLocaleString();

requestAnimationFrame(update);

}

};

update();

});

// ==========================================
// EMI CALCULATOR
// ==========================================

const emiForm=document.getElementById("emiForm");

emiForm?.addEventListener("submit",(e)=>{

e.preventDefault();

const amount=Number(document.getElementById("loanAmount").value);

const rate=Number(document.getElementById("interestRate").value)/12/100;

const months=Number(document.getElementById("loanMonths").value);

const emi=(amount*rate*Math.pow(1+rate,months))/(Math.pow(1+rate,months)-1);

document.getElementById("emiResult").innerText=

"₹ "+emi.toFixed(2);

});

// ==========================================
// LOAN ELIGIBILITY
// ==========================================

const eligibilityBtn=document.getElementById("checkEligibility");

eligibilityBtn?.addEventListener("click",()=>{

const income=Number(document.getElementById("monthlyIncome").value);

const expense=Number(document.getElementById("monthlyExpense").value);

const eligible=(income-expense)*60;

document.getElementById("eligibleLoan").innerText=

"₹ "+eligible.toLocaleString();

});

// ==========================================
// LIVE CLOCK
// ==========================================

const clock=document.getElementById("liveClock");

if(clock){

setInterval(()=>{

clock.innerText=new Date().toLocaleTimeString();

},1000);

}

// ==========================================
// RANDOM STATS
// ==========================================

function randomStat(min,max){

return Math.floor(Math.random()*(max-min+1))+min;

}

document.querySelectorAll(".random-stat").forEach(el=>{

el.innerText=randomStat(100,10000);

});

console.log("App.js Part 4 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 5/20
Firebase Authentication
========================================== */

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
sendPasswordResetEmail,
GoogleAuthProvider,
signInWithPopup,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { app } from "./firebase.js";

// ==========================================
// FIREBASE AUTH
// ==========================================

const auth = getAuth(app);

// ==========================================
// REGISTER
// ==========================================

const registerForm = document.getElementById("registerForm");

registerForm?.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("registerEmail").value.trim();
const password = document.getElementById("registerPassword").value;

try{

await createUserWithEmailAndPassword(auth,email,password);

showToast("Registration Successful","success");

window.location.href="dashboard.html";

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// LOGIN
// ==========================================

const loginForm=document.getElementById("loginForm");

loginForm?.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("loginEmail").value.trim();
const password=document.getElementById("loginPassword").value;

try{

await signInWithEmailAndPassword(auth,email,password);

showToast("Login Successful","success");

window.location.href="dashboard.html";

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// GOOGLE LOGIN
// ==========================================

const googleBtn=document.getElementById("googleLogin");

googleBtn?.addEventListener("click",async()=>{

const provider=new GoogleAuthProvider();

try{

await signInWithPopup(auth,provider);

showToast("Google Login Successful","success");

window.location.href="dashboard.html";

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// PASSWORD RESET
// ==========================================

const resetBtn=document.getElementById("resetPassword");

resetBtn?.addEventListener("click",async()=>{

const email=prompt("Enter your registered email:");

if(!email) return;

try{

await sendPasswordResetEmail(auth,email);

showToast("Password reset email sent","success");

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// LOGOUT
// ==========================================

const logoutBtn=document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click",async()=>{

try{

await signOut(auth);

showToast("Logged out successfully","success");

window.location.href="login.html";

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// SESSION MANAGEMENT
// ==========================================

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged in:",user.email);

}else{

console.log("No active session");

}

});

console.log("App.js Part 5 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 6/20
Cloud Firestore CRUD
========================================== */

import { app } from "./firebase.js";

import {

getFirestore,
collection,
addDoc,
getDocs,
getDoc,
doc,
updateDoc,
deleteDoc,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ==========================================
// FIRESTORE
// ==========================================

const db = getFirestore(app);

// ==========================================
// SAVE USER PROFILE
// ==========================================

const profileForm = document.getElementById("profileForm");

profileForm?.addEventListener("submit", async (e) => {

e.preventDefault();

try{

await addDoc(collection(db,"users"),{

name:document.getElementById("fullName").value.trim(),

email:document.getElementById("email").value.trim(),

phone:document.getElementById("phone").value.trim(),

address:document.getElementById("address").value.trim(),

createdAt:serverTimestamp()

});

showToast("Profile Saved Successfully","success");

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// SAVE LOAN APPLICATION
// ==========================================

const loanForm=document.getElementById("loanForm");

loanForm?.addEventListener("submit",async(e)=>{

e.preventDefault();

try{

await addDoc(collection(db,"loanApplications"),{

applicant:document.getElementById("loanName").value,

amount:Number(document.getElementById("loanAmount").value),

loanType:document.getElementById("loanType").value,

status:"Pending",

createdAt:serverTimestamp()

});

showToast("Loan Application Submitted","success");

}catch(error){

showToast(error.message,"error");

}

});

// ==========================================
// FETCH LOAN APPLICATIONS
// ==========================================

async function loadLoanApplications(){

const table=document.getElementById("loanTableBody");

if(!table) return;

table.innerHTML="";

const snapshot=await getDocs(collection(db,"loanApplications"));

snapshot.forEach((item)=>{

const data=item.data();

table.innerHTML+=`

<tr>

<td>${item.id}</td>
<td>${data.applicant}</td>
<td>₹${data.amount}</td>
<td>${data.loanType}</td>
<td>${data.status}</td>

</tr>

`;

});

}

loadLoanApplications();

// ==========================================
// UPDATE LOAN STATUS
// ==========================================

async function updateLoanStatus(id,status){

try{

await updateDoc(doc(db,"loanApplications",id),{

status:status

});

showToast("Loan Updated","success");

loadLoanApplications();

}catch(error){

showToast(error.message,"error");

}

}

// ==========================================
// DELETE LOAN
// ==========================================

async function deleteLoan(id){

if(!confirm("Delete this application?")) return;

try{

await deleteDoc(doc(db,"loanApplications",id));

showToast("Loan Deleted","success");

loadLoanApplications();

}catch(error){

showToast(error.message,"error");

}

}

// ==========================================
// FETCH SINGLE USER
// ==========================================

async function getUserProfile(id){

try{

const snapshot=await getDoc(doc(db,"users",id));

if(snapshot.exists()){

console.log(snapshot.data());

}

}catch(error){

console.error(error);

}

}

console.log("App.js Part 6 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 7/20
Firebase Storage Upload
========================================== */

import { app } from "./firebase.js";

import {
getStorage,
ref,
uploadBytesResumable,
getDownloadURL,
deleteObject
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// ==========================================
// FIREBASE STORAGE
// ==========================================

const storage = getStorage(app);

// ==========================================
// PROFILE PHOTO UPLOAD
// ==========================================

const profileInput = document.getElementById("profilePhoto");

profileInput?.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

uploadFile(file,"profile");

});

// ==========================================
// KYC DOCUMENT UPLOAD
// ==========================================

const kycInput = document.getElementById("kycFile");

kycInput?.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

uploadFile(file,"kyc");

});

// ==========================================
// FILE UPLOAD FUNCTION
// ==========================================

function uploadFile(file,folder){

const fileName = Date.now()+"_"+file.name;

const storageRef = ref(storage,`${folder}/${fileName}`);

const uploadTask = uploadBytesResumable(storageRef,file);

// ==========================================
// PROGRESS
// ==========================================

uploadTask.on(

"state_changed",

(snapshot)=>{

const progress = Math.round(

(snapshot.bytesTransferred/snapshot.totalBytes)*100

);

const progressBar=document.getElementById("uploadProgress");

if(progressBar){

progressBar.value=progress;

}

const progressText=document.getElementById("uploadPercent");

if(progressText){

progressText.innerText=progress+"%";

}

},

(error)=>{

showToast(error.message,"error");

},

async()=>{

const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

showToast("Upload Successful","success");

previewFile(downloadURL,file.type);

console.log(downloadURL);

}

);

}

// ==========================================
// FILE PREVIEW
// ==========================================

function previewFile(url,type){

const preview=document.getElementById("filePreview");

if(!preview) return;

if(type.startsWith("image")){

preview.innerHTML=`

<img
src="${url}"
style="max-width:220px;border-radius:12px;"
>

`;

}else{

preview.innerHTML=`

<a href="${url}" target="_blank">

View Uploaded Document

</a>

`;

}

}

// ==========================================
// DELETE FILE
// ==========================================

async function deleteUploadedFile(path){

try{

const storageRef=ref(storage,path);

await deleteObject(storageRef);

showToast("File Deleted","success");

}catch(error){

showToast(error.message,"error");

}

}

// ==========================================
// DRAG & DROP
// ==========================================

const dropArea=document.getElementById("dropArea");

dropArea?.addEventListener("dragover",(e)=>{

e.preventDefault();

dropArea.classList.add("active");

});

dropArea?.addEventListener("dragleave",()=>{

dropArea.classList.remove("active");

});

dropArea?.addEventListener("drop",(e)=>{

e.preventDefault();

dropArea.classList.remove("active");

const file=e.dataTransfer.files[0];

if(file){

uploadFile(file,"uploads");

}

});

console.log("App.js Part 7 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 8/20
Firebase Cloud Messaging (FCM)
========================================== */

import { app } from "./firebase.js";

import {
getMessaging,
getToken,
onMessage
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

// ==========================================
// FIREBASE MESSAGING
// ==========================================

const messaging = getMessaging(app);

// ==========================================
// REQUEST NOTIFICATION PERMISSION
// ==========================================

async function requestNotificationPermission(){

try{

const permission = await Notification.requestPermission();

if(permission === "granted"){

showToast("Notification Permission Granted","success");

getFCMToken();

}else{

showToast("Notification Permission Denied","error");

}

}catch(error){

console.error(error);

}

}

// ==========================================
// GET DEVICE TOKEN
// ==========================================

async function getFCMToken(){

try{

const token = await getToken(messaging,{

// Replace with your own Firebase Web Push (VAPID) key
vapidKey:"YOUR_FIREBASE_WEB_PUSH_VAPID_KEY"

});

if(token){

console.log("FCM Token:",token);

// TODO:
// Save this token in Firestore for sending notifications

}else{

console.log("No registration token available.");

}

}catch(error){

console.error(error);

}

}

// ==========================================
// RECEIVE FOREGROUND MESSAGE
// ==========================================

onMessage(messaging,(payload)=>{

console.log("Message Received:",payload);

showToast(

payload.notification?.title || "New Notification",

"info"

);

showBrowserNotification(payload);

});

// ==========================================
// BROWSER NOTIFICATION
// ==========================================

function showBrowserNotification(payload){

if(Notification.permission!=="granted") return;

new Notification(

payload.notification?.title || "Assam Finance Hub",

{

body:payload.notification?.body || "",

icon:"/assets/logo.png"

}

);

}

// ==========================================
// ENABLE NOTIFICATIONS BUTTON
// ==========================================

const enableNotificationBtn=

document.getElementById("enableNotifications");

enableNotificationBtn?.addEventListener("click",()=>{

requestNotificationPermission();

});

// ==========================================
// DISABLE NOTIFICATIONS
// ==========================================

const disableNotificationBtn=

document.getElementById("disableNotifications");

disableNotificationBtn?.addEventListener("click",()=>{

alert(

"Browser notification permissions must be changed from your browser settings."

);

});

// ==========================================
// NOTIFICATION LOG
// ==========================================

function addNotificationLog(title){

const list=document.getElementById("notificationList");

if(!list) return;

const item=document.createElement("li");

item.innerText=title;

list.prepend(item);

}

console.log("App.js Part 8 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 9/20
Razorpay Payment Gateway
========================================== */

import { app } from "./firebase.js";

import {
getFirestore,
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const db = getFirestore(app);

// ==========================================
// START PAYMENT
// ==========================================

const payBtn = document.getElementById("payNow");

payBtn?.addEventListener("click",()=>{

startPayment();

});

// ==========================================
// RAZORPAY PAYMENT
// ==========================================

function startPayment(){

const amount = Number(

document.getElementById("paymentAmount").value

);

if(!amount || amount<=0){

showToast("Enter valid amount","error");

return;

}

const options={

key:"YOUR_RAZORPAY_KEY_ID",

amount:amount*100,

currency:"INR",

name:"Assam Finance Hub",

description:"Loan / Service Payment",

image:"assets/logo.png",

handler:async function(response){

showToast("Payment Successful","success");

await saveTransaction({

paymentId:response.razorpay_payment_id,

amount:amount,

status:"Success"

});

generateReceipt(

response.razorpay_payment_id,

amount

);

},

prefill:{

name:document.getElementById("customerName")?.value || "",

email:document.getElementById("customerEmail")?.value || "",

contact:document.getElementById("customerPhone")?.value || ""

},

theme:{

color:"#0057ff"

}

};

const razorpay = new Razorpay(options);

razorpay.open();

}

// ==========================================
// SAVE TRANSACTION
// ==========================================

async function saveTransaction(data){

try{

await addDoc(collection(db,"transactions"),{

paymentId:data.paymentId,

amount:data.amount,

status:data.status,

createdAt:serverTimestamp()

});

}catch(error){

console.error(error);

}

}

// ==========================================
// PAYMENT RECEIPT
// ==========================================

function generateReceipt(paymentId,amount){

const receipt=document.getElementById("receipt");

if(!receipt) return;

receipt.innerHTML=`

<h3>Payment Receipt</h3>

<p><strong>Payment ID:</strong> ${paymentId}</p>

<p><strong>Amount:</strong> ₹${amount}</p>

<p><strong>Status:</strong> Success</p>

<p><strong>Date:</strong>

${new Date().toLocaleString()}

</p>

`;

}

// ==========================================
// DOWNLOAD RECEIPT
// ==========================================

const downloadBtn=document.getElementById("downloadReceipt");

downloadBtn?.addEventListener("click",()=>{

window.print();

});

// ==========================================
// SIMPLE UPI PAYMENT LINK
// ==========================================

const upiBtn=document.getElementById("upiPayment");

upiBtn?.addEventListener("click",()=>{

const amount=document.getElementById("paymentAmount").value;

const upiId="yourupi@bank";

const url=

`upi://pay?pa=${upiId}&pn=Assam Finance Hub&am=${amount}&cu=INR`;

window.location.href=url;

});

console.log("App.js Part 9 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 10/20
AI Chatbot
========================================== */

// ==========================================
// ELEMENTS
// ==========================================

const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendMessage");

// ==========================================
// SEND MESSAGE
// ==========================================

sendBtn?.addEventListener("click", sendMessage);

chatInput?.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});

// ==========================================
// SEND MESSAGE FUNCTION
// ==========================================

function sendMessage(){

const message = chatInput.value.trim();

if(message==="") return;

addMessage(message,"user");

chatInput.value="";

setTimeout(()=>{

botReply(message);

},700);

}

// ==========================================
// ADD CHAT MESSAGE
// ==========================================

function addMessage(text,type){

if(!chatBody) return;

const message=document.createElement("div");

message.className=`ai-message ai-${type}`;

message.innerHTML=text;

chatBody.appendChild(message);

chatBody.scrollTop=chatBody.scrollHeight;

saveChat(text,type);

}

// ==========================================
// BASIC FAQ BOT
// ==========================================

function botReply(text){

const msg=text.toLowerCase();

let reply="Sorry, I didn't understand your question.";

if(msg.includes("loan")){

reply="We provide Personal, Home, Education and Business Loans.";

}

else if(msg.includes("interest")){

reply="Interest rates generally start from 8.5% per annum depending on eligibility.";

}

else if(msg.includes("emi")){

reply="You can calculate your EMI using the EMI Calculator available in the dashboard.";

}

else if(msg.includes("hello") || msg.includes("hi")){

reply="Hello 👋 Welcome to Assam Finance Hub. How can I help you today?";

}

else if(msg.includes("contact")){

reply="You can contact our customer support from the Contact page or email us.";

}

else if(msg.includes("kyc")){

reply="Upload your Aadhaar, PAN and required documents in the KYC section.";

}

else if(msg.includes("payment")){

reply="Payments can be completed securely using Razorpay or supported UPI methods.";

}

addMessage(reply,"bot");

}

// ==========================================
// SAVE CHAT
// ==========================================

function saveChat(message,type){

let history=

JSON.parse(localStorage.getItem("chatHistory")) || [];

history.push({

message,

type,

time:new Date().toLocaleTimeString()

});

localStorage.setItem(

"chatHistory",

JSON.stringify(history)

);

}

// ==========================================
// LOAD CHAT
// ==========================================

function loadChat(){

const history=

JSON.parse(localStorage.getItem("chatHistory")) || [];

history.forEach(item=>{

addMessage(item.message,item.type);

});

}

loadChat();

// ==========================================
// CLEAR CHAT
// ==========================================

const clearChat=document.getElementById("clearChat");

clearChat?.addEventListener("click",()=>{

localStorage.removeItem("chatHistory");

if(chatBody){

chatBody.innerHTML="";

}

showToast("Chat Cleared","success");

});

console.log("App.js Part 10 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 11/20
Admin Dashboard
========================================== */

import { app } from "./firebase.js";

import {
getFirestore,
collection,
getDocs,
updateDoc,
doc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const db = getFirestore(app);

// ==========================================
// LOAD USERS
// ==========================================

async function loadUsers(){

const table=document.getElementById("userTableBody");

if(!table) return;

table.innerHTML="";

try{

const snapshot=await getDocs(collection(db,"users"));

snapshot.forEach((user)=>{

const data=user.data();

table.innerHTML+=`

<tr>

<td>${user.id}</td>
<td>${data.name || "-"}</td>
<td>${data.email || "-"}</td>
<td>${data.phone || "-"}</td>

<td>

<button onclick="deleteUser('${user.id}')">

Delete

</button>

</td>

</tr>

`;

});

}catch(error){

console.error(error);

}

}

// ==========================================
// LOAD LOANS
// ==========================================

async function loadLoans(){

const table=document.getElementById("adminLoanTable");

if(!table) return;

table.innerHTML="";

const snapshot=await getDocs(

collection(db,"loanApplications")

);

snapshot.forEach((loan)=>{

const data=loan.data();

table.innerHTML+=`

<tr>

<td>${data.applicant}</td>

<td>₹${data.amount}</td>

<td>${data.loanType}</td>

<td>${data.status}</td>

<td>

<button onclick="approveLoan('${loan.id}')">

Approve

</button>

<button onclick="rejectLoan('${loan.id}')">

Reject

</button>

</td>

</tr>

`;

});

}

// ==========================================
// APPROVE LOAN
// ==========================================

window.approveLoan=async(id)=>{

await updateDoc(

doc(db,"loanApplications",id),

{

status:"Approved"

}

);

showToast("Loan Approved","success");

loadLoans();

};

// ==========================================
// REJECT LOAN
// ==========================================

window.rejectLoan=async(id)=>{

await updateDoc(

doc(db,"loanApplications",id),

{

status:"Rejected"

}

);

showToast("Loan Rejected","success");

loadLoans();

};

// ==========================================
// DELETE USER
// ==========================================

window.deleteUser=async(id)=>{

if(!confirm("Delete user?")) return;

await deleteDoc(

doc(db,"users",id)

);

showToast("User Deleted","success");

loadUsers();

};

// ==========================================
// DASHBOARD STATISTICS
// ==========================================

async function dashboardStats(){

const users=

await getDocs(collection(db,"users"));

const loans=

await getDocs(collection(db,"loanApplications"));

const transactions=

await getDocs(collection(db,"transactions"));

document.getElementById("totalUsers")?.innerText=

users.size;

document.getElementById("totalLoans")?.innerText=

loans.size;

document.getElementById("totalTransactions")?.innerText=

transactions.size;

}

// ==========================================
// ACTIVITY LOG
// ==========================================

function addActivity(text){

const list=document.getElementById("activityLog");

if(!list) return;

const item=document.createElement("li");

item.innerHTML=

`${new Date().toLocaleString()} - ${text}`;

list.prepend(item);

}

// ==========================================
// INITIAL LOAD
// ==========================================

loadUsers();

loadLoans();

dashboardStats();

console.log("App.js Part 11 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 12/20
Analytics & Reports
========================================== */

import { app } from "./firebase.js";

import {
getFirestore,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const db = getFirestore(app);

// ==========================================
// LOAD ANALYTICS
// ==========================================

async function loadAnalytics(){

try{

const users = await getDocs(collection(db,"users"));
const loans = await getDocs(collection(db,"loanApplications"));
const transactions = await getDocs(collection(db,"transactions"));

drawAnalyticsChart(
users.size,
loans.size,
transactions.size
);

}catch(error){

console.error(error);

}

}

// ==========================================
// BAR CHART
// ==========================================

function drawAnalyticsChart(users,loans,transactions){

const canvas = document.getElementById("analyticsChart");

if(!canvas) return;

new Chart(canvas,{

type:"bar",

data:{

labels:["Users","Loans","Transactions"],

datasets:[{

label:"Statistics",

data:[users,loans,transactions],

backgroundColor:[

"#0057ff",
"#16a34a",
"#f59e0b"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

});

}

// ==========================================
// MONTHLY REPORT
// ==========================================

function generateMonthlyReport(){

const report={

month:new Date().toLocaleString("default",{

month:"long"

}),

year:new Date().getFullYear(),

generatedAt:new Date().toLocaleString()

};

console.log(report);

showToast("Monthly Report Generated","success");

}

// ==========================================
// EXPORT TABLE TO CSV
// ==========================================

function exportTableToCSV(tableId,fileName){

const table=document.getElementById(tableId);

if(!table) return;

let csv=[];

table.querySelectorAll("tr").forEach(row=>{

const cols=[...row.querySelectorAll("th,td")];

csv.push(

cols.map(col=>`"${col.innerText}"`).join(",")

);

});

const blob=new Blob([csv.join("\n")],{

type:"text/csv"

});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download=fileName;

link.click();

}

// ==========================================
// EXPORT REPORT BUTTON
// ==========================================

document.getElementById("exportCSV")?.addEventListener("click",()=>{

exportTableToCSV(

"reportTable",

"analytics-report.csv"

);

});

// ==========================================
// PRINT PDF
// ==========================================

document.getElementById("exportPDF")?.addEventListener("click",()=>{

window.print();

});

// ==========================================
// ANALYTICS REFRESH
// ==========================================

document.getElementById("refreshAnalytics")?.addEventListener("click",()=>{

loadAnalytics();

showToast("Analytics Updated","success");

});

// ==========================================
// INITIALIZE
// ==========================================

generateMonthlyReport();

loadAnalytics();

console.log("App.js Part 12 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 13/20
Notification Center
========================================== */

// ==========================================
// NOTIFICATION STORAGE
// ==========================================

let notifications = JSON.parse(

localStorage.getItem("notifications")

) || [];

// ==========================================
// ADD NOTIFICATION
// ==========================================

function addNotification(title,message,type="info"){

const item={

id:Date.now(),

title,

message,

type,

time:new Date().toLocaleString(),

read:false

};

notifications.unshift(item);

localStorage.setItem(

"notifications",

JSON.stringify(notifications)

);

renderNotifications();

showToast(title,type);

}

// ==========================================
// RENDER NOTIFICATIONS
// ==========================================

function renderNotifications(){

const list=document.getElementById("notificationCenter");

const badge=document.getElementById("notificationBadge");

if(!list) return;

list.innerHTML="";

notifications.forEach(item=>{

list.innerHTML+=`

<div class="notification-item ${item.read?"read":"unread"}">

<h4>${item.title}</h4>

<p>${item.message}</p>

<small>${item.time}</small>

</div>

`;

});

const unread=

notifications.filter(n=>!n.read).length;

if(badge){

badge.innerText=unread;

}

}

// ==========================================
// MARK ALL AS READ
// ==========================================

document.getElementById("markAllRead")?.addEventListener("click",()=>{

notifications=notifications.map(n=>({

...n,

read:true

}));

localStorage.setItem(

"notifications",

JSON.stringify(notifications)

);

renderNotifications();

});

// ==========================================
// CLEAR NOTIFICATIONS
// ==========================================

document.getElementById("clearNotifications")?.addEventListener("click",()=>{

notifications=[];

localStorage.removeItem("notifications");

renderNotifications();

});

// ==========================================
// REMINDER SYSTEM
// ==========================================

function scheduleReminder(message,delay){

setTimeout(()=>{

addNotification(

"Reminder",

message,

"info"

);

},delay);

}

// Example reminder after 60 seconds
scheduleReminder(

"Don't forget to complete your KYC verification.",

60000

);

// ==========================================
// EMAIL & SMS PLACEHOLDER
// ==========================================

async function sendEmailNotification(data){

console.log("Send email:",data);

// TODO:
// Call your backend API or Cloud Function.

}

async function sendSMSNotification(data){

console.log("Send SMS:",data);

// TODO:
// Integrate Twilio, MSG91, Fast2SMS, etc.
// from a secure backend.

}

// ==========================================
// SAMPLE NOTIFICATION
// ==========================================

addNotification(

"Welcome",

"Welcome to Assam Finance Hub!",

"success"

);

// ==========================================
// INITIAL LOAD
// ==========================================

renderNotifications();

console.log("App.js Part 13 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 14/20
Loan Calendar & EMI Tracker
========================================== */

// ==========================================
// EMI DUE DATE
// ==========================================

const emiDateInput = document.getElementById("emiDueDate");
const saveDateBtn = document.getElementById("saveDueDate");

// ==========================================
// SAVE EMI DATE
// ==========================================

saveDateBtn?.addEventListener("click",()=>{

if(!emiDateInput.value){

showToast("Select EMI Due Date","error");

return;

}

localStorage.setItem(

"emiDueDate",

emiDateInput.value

);

showToast("EMI Due Date Saved","success");

updateCountdown();

});

// ==========================================
// LOAD SAVED DATE
// ==========================================

const savedDate = localStorage.getItem("emiDueDate");

if(savedDate && emiDateInput){

emiDateInput.value = savedDate;

}

// ==========================================
// COUNTDOWN TIMER
// ==========================================

function updateCountdown(){

const target = localStorage.getItem("emiDueDate");

if(!target) return;

const countdown = document.getElementById("countdown");

if(!countdown) return;

const timer = setInterval(()=>{

const now = new Date().getTime();

const due = new Date(target).getTime();

const distance = due - now;

if(distance <= 0){

countdown.innerHTML = "EMI Due Today!";

showToast("Your EMI is due today!","warning");

clearInterval(timer);

return;

}

const days = Math.floor(distance/(1000*60*60*24));
const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

countdown.innerHTML =

`${days} Days ${hours} Hours ${minutes} Minutes`;

},1000);

}

updateCountdown();

// ==========================================
// PAYMENT PROGRESS
// ==========================================

function updatePaymentProgress(paid,total){

const progress=document.getElementById("paymentProgress");
const text=document.getElementById("paymentProgressText");

if(!progress || !text) return;

const percent=Math.round((paid/total)*100);

progress.value=percent;

text.innerHTML=`${percent}% Completed`;

}

// Example
updatePaymentProgress(6,12);

// ==========================================
// AUTO STATUS
// ==========================================

function updateLoanStatus(){

const paid=6;
const total=12;

const status=document.getElementById("loanStatus");

if(!status) return;

if(paid===0){

status.innerHTML="Not Started";

}

else if(paid<total){

status.innerHTML="Running";

}

else{

status.innerHTML="Completed";

}

}

updateLoanStatus();

// ==========================================
// EMI HISTORY
// ==========================================

function addEMIHistory(date,amount,status){

const table=document.getElementById("emiHistory");

if(!table) return;

table.innerHTML += `

<tr>

<td>${date}</td>

<td>₹${amount}</td>

<td>${status}</td>

</tr>

`;

}

// Sample Data
addEMIHistory("01 Aug 2026",5000,"Paid");
addEMIHistory("01 Sep 2026",5000,"Pending");

console.log("App.js Part 14 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 15/20
Location & Maps
========================================== */

// ==========================================
// USER LOCATION
// ==========================================

let userLatitude = null;
let userLongitude = null;

// ==========================================
// GET CURRENT LOCATION
// ==========================================

function getCurrentLocation(){

if(!navigator.geolocation){

showToast("Geolocation is not supported.","error");
return;

}

navigator.geolocation.getCurrentPosition(

(position)=>{

userLatitude = position.coords.latitude;
userLongitude = position.coords.longitude;

document.getElementById("latitude")?.innerText =
userLatitude.toFixed(6);

document.getElementById("longitude")?.innerText =
userLongitude.toFixed(6);

showToast("Location detected","success");

loadGoogleMap();

},

(error)=>{

showToast(error.message,"error");

}

);

}

// ==========================================
// GOOGLE MAP
// ==========================================

function loadGoogleMap(){

const frame=document.getElementById("googleMap");

if(!frame) return;

frame.src=

`https://maps.google.com/maps?q=${userLatitude},${userLongitude}&z=15&output=embed`;

}

// ==========================================
// FIND NEARBY BANK
// ==========================================

function findNearbyBanks(){

if(userLatitude===null){

showToast("Detect location first.","error");

return;

}

window.open(

`https://www.google.com/maps/search/bank/@${userLatitude},${userLongitude},15z`,

"_blank"

);

}

// ==========================================
// FIND NEARBY ATM
// ==========================================

function findNearbyATM(){

if(userLatitude===null){

showToast("Detect location first.","error");

return;

}

window.open(

`https://www.google.com/maps/search/ATM/@${userLatitude},${userLongitude},15z`,

"_blank"

);

}

// ==========================================
// OPEN NAVIGATION
// ==========================================

function navigateTo(lat,lng){

window.open(

`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,

"_blank"

);

}

// ==========================================
// BUTTON EVENTS
// ==========================================

document.getElementById("detectLocation")
?.addEventListener("click",getCurrentLocation);

document.getElementById("findBank")
?.addEventListener("click",findNearbyBanks);

document.getElementById("findATM")
?.addEventListener("click",findNearbyATM);

// ==========================================
// DISTANCE CALCULATOR
// ==========================================

function calculateDistance(lat1,lon1,lat2,lon2){

const R = 6371;

const dLat=(lat2-lat1)*Math.PI/180;
const dLon=(lon2-lon1)*Math.PI/180;

const a =

Math.sin(dLat/2)**2 +

Math.cos(lat1*Math.PI/180) *

Math.cos(lat2*Math.PI/180) *

Math.sin(dLon/2)**2;

const c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

return (R*c).toFixed(2);

}

// Example
console.log(

"Distance:",

calculateDistance(

26.1445,
91.7362,
26.1800,
91.7500

),

"KM"

);

console.log("App.js Part 15 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 16/20
Reports, Backup & Restore
========================================== */

// ==========================================
// EXPORT JSON
// ==========================================

function exportJSON() {

const data = {

users: JSON.parse(localStorage.getItem("users")) || [],
loans: JSON.parse(localStorage.getItem("loans")) || [],
transactions: JSON.parse(localStorage.getItem("transactions")) || [],
settings: JSON.parse(localStorage.getItem("settings")) || {}

};

const blob = new Blob(

[JSON.stringify(data, null, 2)],

{ type: "application/json" }

);

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = "assam-finance-backup.json";

link.click();

showToast("Backup exported successfully","success");

}

// ==========================================
// IMPORT JSON
// ==========================================

const importFile = document.getElementById("importBackup");

importFile?.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(event){

try{

const data = JSON.parse(event.target.result);

if(data.users)
localStorage.setItem("users",JSON.stringify(data.users));

if(data.loans)
localStorage.setItem("loans",JSON.stringify(data.loans));

if(data.transactions)
localStorage.setItem("transactions",JSON.stringify(data.transactions));

if(data.settings)
localStorage.setItem("settings",JSON.stringify(data.settings));

showToast("Backup restored successfully","success");

}catch(error){

showToast("Invalid backup file","error");

}

};

reader.readAsText(file);

});

// ==========================================
// EXPORT TABLE TO EXCEL (CSV)
// ==========================================

function exportExcel(tableId,fileName){

const table = document.getElementById(tableId);

if(!table) return;

let csv = [];

table.querySelectorAll("tr").forEach(row=>{

const cols = [...row.querySelectorAll("th,td")];

csv.push(cols.map(col=>`"${col.innerText}"`).join(","));

});

const blob = new Blob([csv.join("\n")],{

type:"text/csv;charset=utf-8;"

});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download=fileName;

link.click();

showToast("Excel exported","success");

}

// ==========================================
// PRINT REPORT
// ==========================================

function printReport(){

window.print();

}

// ==========================================
// PDF PLACEHOLDER
// ==========================================

function generatePDF(){

showToast(

"Integrate jsPDF or pdf-lib to generate PDFs.",

"info"

);

}

// ==========================================
// BUTTON EVENTS
// ==========================================

document.getElementById("exportJSON")
?.addEventListener("click",exportJSON);

document.getElementById("exportExcel")
?.addEventListener("click",()=>{

exportExcel("reportTable","report.csv");

});

document.getElementById("printReport")
?.addEventListener("click",printReport);

document.getElementById("generatePDF")
?.addEventListener("click",generatePDF);

console.log("App.js Part 16 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 17/20
User Settings
========================================== */

// ==========================================
// DEFAULT SETTINGS
// ==========================================

const defaultSettings = {

theme: "light",
language: "en",
currency: "INR",
notifications: true,
autoSave: true

};

// ==========================================
// LOAD SETTINGS
// ==========================================

let settings = JSON.parse(

localStorage.getItem("settings")

) || defaultSettings;

// ==========================================
// APPLY SETTINGS
// ==========================================

function applySettings(){

// Theme
if(settings.theme === "dark"){

document.body.classList.add("dark-mode");

}else{

document.body.classList.remove("dark-mode");

}

// Language
const language = document.getElementById("language");

if(language){

language.value = settings.language;

}

// Currency
const currency = document.getElementById("currency");

if(currency){

currency.value = settings.currency;

}

// Notifications
const notify = document.getElementById("notifications");

if(notify){

notify.checked = settings.notifications;

}

// Auto Save
const autoSave = document.getElementById("autoSave");

if(autoSave){

autoSave.checked = settings.autoSave;

}

}

// ==========================================
// SAVE SETTINGS
// ==========================================

function saveSettings(){

localStorage.setItem(

"settings",

JSON.stringify(settings)

);

showToast("Settings Saved","success");

}

// ==========================================
// THEME CHANGE
// ==========================================

document.getElementById("theme")
?.addEventListener("change",(e)=>{

settings.theme = e.target.value;

applySettings();

saveSettings();

});

// ==========================================
// LANGUAGE CHANGE
// ==========================================

document.getElementById("language")
?.addEventListener("change",(e)=>{

settings.language = e.target.value;

saveSettings();

});

// ==========================================
// CURRENCY CHANGE
// ==========================================

document.getElementById("currency")
?.addEventListener("change",(e)=>{

settings.currency = e.target.value;

saveSettings();

});

// ==========================================
// NOTIFICATIONS
// ==========================================

document.getElementById("notifications")
?.addEventListener("change",(e)=>{

settings.notifications = e.target.checked;

saveSettings();

});

// ==========================================
// AUTO SAVE
// ==========================================

document.getElementById("autoSave")
?.addEventListener("change",(e)=>{

settings.autoSave = e.target.checked;

saveSettings();

});

// ==========================================
// RESET SETTINGS
// ==========================================

document.getElementById("resetSettings")
?.addEventListener("click",()=>{

if(!confirm("Reset all settings?")) return;

settings = {...defaultSettings};

saveSettings();

applySettings();

});

// ==========================================
// AUTO SAVE FORM
// ==========================================

document.querySelectorAll("input,textarea,select")

.forEach(field=>{

field.addEventListener("change",()=>{

if(settings.autoSave){

saveSettings();

}

});

});

// ==========================================
// INITIALIZE
// ==========================================

applySettings();

console.log("App.js Part 17 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 18/20
PWA & Offline Support
========================================== */

// ==========================================
// NETWORK STATUS
// ==========================================

const offlineBanner = document.getElementById("offlineBanner");

function updateNetworkStatus(){

if(navigator.onLine){

offlineBanner?.classList.remove("show");

showToast("Internet Connected","success");

}else{

offlineBanner?.classList.add("show");

showToast("You are Offline","error");

}

}

window.addEventListener("online",updateNetworkStatus);
window.addEventListener("offline",updateNetworkStatus);

updateNetworkStatus();

// ==========================================
// SERVICE WORKER
// ==========================================

if("serviceWorker" in navigator){

window.addEventListener("load",async()=>{

try{

const registration=

await navigator.serviceWorker.register(

"./service-worker.js"

);

console.log(

"Service Worker Registered",

registration

);

}catch(error){

console.error(

"Service Worker Error",

error

);

}

});

}

// ==========================================
// INSTALL APP
// ==========================================

let deferredPrompt=null;

window.addEventListener(

"beforeinstallprompt",

(event)=>{

event.preventDefault();

deferredPrompt=event;

document.getElementById("installApp")

?.classList.remove("d-none");

}

);

document.getElementById("installApp")

?.addEventListener("click",async()=>{

if(!deferredPrompt) return;

deferredPrompt.prompt();

const choice=

await deferredPrompt.userChoice;

if(choice.outcome==="accepted"){

showToast(

"App Installed Successfully",

"success"

);

}

deferredPrompt=null;

});

// ==========================================
// CLEAR CACHE
// ==========================================

async function clearAppCache(){

if(!("caches" in window)) return;

const keys=await caches.keys();

for(const key of keys){

await caches.delete(key);

}

showToast("Cache Cleared","success");

}

document.getElementById("clearCache")

?.addEventListener("click",clearAppCache);

// ==========================================
// STORAGE INFO
// ==========================================

async function storageInfo(){

if(!navigator.storage?.estimate) return;

const estimate=

await navigator.storage.estimate();

const used=

(estimate.usage/1024/1024).toFixed(2);

const quota=

(estimate.quota/1024/1024).toFixed(2);

document.getElementById("storageInfo")

?.innerHTML=

`Used: ${used} MB / ${quota} MB`;

}

storageInfo();

// ==========================================
// APP VERSION
// ==========================================

const APP_VERSION="1.0.0";

document.getElementById("appVersion")

?.append(APP_VERSION);

console.log(

"App.js Part 18 Loaded"

);

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 19/20
Security & Session Management
========================================== */

// ==========================================
// SESSION TIMEOUT (30 Minutes)
// ==========================================

const SESSION_TIMEOUT = 30 * 60 * 1000;

let lastActivity = Date.now();

// ==========================================
// UPDATE LAST ACTIVITY
// ==========================================

function updateActivity(){

lastActivity = Date.now();

}

["click","mousemove","keydown","scroll","touchstart"]

.forEach(event=>{

document.addEventListener(event,updateActivity);

});

// ==========================================
// AUTO LOGOUT
// ==========================================

setInterval(()=>{

const inactiveTime = Date.now() - lastActivity;

if(inactiveTime > SESSION_TIMEOUT){

showToast("Session Expired","error");

setTimeout(()=>{

window.location.href="login.html";

},1500);

}

},60000);

// ==========================================
// INPUT SANITIZATION
// ==========================================

function sanitizeInput(value){

const div=document.createElement("div");

div.textContent=value;

return div.innerHTML.trim();

}

// ==========================================
// SANITIZE ALL FORMS
// ==========================================

document.querySelectorAll("form").forEach(form=>{

form.addEventListener("submit",()=>{

form.querySelectorAll("input,textarea")

.forEach(field=>{

field.value=sanitizeInput(field.value);

});

});

});

// ==========================================
// AUDIT LOG
// ==========================================

function auditLog(action){

const logs=

JSON.parse(localStorage.getItem("auditLogs")) || [];

logs.unshift({

action,

time:new Date().toLocaleString()

});

localStorage.setItem(

"auditLogs",

JSON.stringify(logs)

);

}

// ==========================================
// LOG COMMON ACTIONS
// ==========================================

document.addEventListener("click",(e)=>{

const element=e.target;

if(element.matches("button")){

auditLog(

`Button Clicked: ${element.innerText}`

);

}

});

// ==========================================
// COPY PROTECTION (Optional)
// ==========================================

document.addEventListener("contextmenu",(e)=>{

// Uncomment if needed
// e.preventDefault();

});

// ==========================================
// DEV TOOLS DETECTION (Basic)
// ==========================================

let devtoolsOpen=false;

setInterval(()=>{

const widthDiff=

window.outerWidth-window.innerWidth;

const heightDiff=

window.outerHeight-window.innerHeight;

if(widthDiff>160 || heightDiff>160){

if(!devtoolsOpen){

devtoolsOpen=true;

console.warn("Developer Tools Detected");

}

}else{

devtoolsOpen=false;

}

},2000);

// ==========================================
// PASSWORD STRENGTH
// ==========================================

const passwordField=document.getElementById("registerPassword");

passwordField?.addEventListener("input",()=>{

const strength=document.getElementById("passwordStrength");

if(!strength) return;

const value=passwordField.value;

let score=0;

if(value.length>=8) score++;
if(/[A-Z]/.test(value)) score++;
if(/[0-9]/.test(value)) score++;
if(/[^A-Za-z0-9]/.test(value)) score++;

const levels=[

"Weak",
"Fair",
"Good",
"Strong",
"Very Strong"

];

strength.innerHTML=

levels[score] || "Weak";

});

// ==========================================
// INITIALIZE
// ==========================================

auditLog("Application Started");

console.log("App.js Part 19 Loaded");

/* ==========================================
ASSAM FINANCE HUB
app.js
Part 20/20
Final Initialization
========================================== */

// ==========================================
// APP INFO
// ==========================================

const APP = {

name: "Assam Finance Hub",
version: "1.0.0",
developer: "Assam Finance Hub Team"

};

// ==========================================
// STARTUP CHECKS
// ==========================================

function startupChecks(){

console.log("Starting application...");

if(!navigator.onLine){

console.warn("Running in Offline Mode");

}

if(!window.localStorage){

alert("LocalStorage is not supported.");

}

}

// ==========================================
// PERFORMANCE TIMER
// ==========================================

const appStart = performance.now();

window.addEventListener("load",()=>{

const appEnd = performance.now();

console.log(

`Application Loaded in ${(appEnd-appStart).toFixed(2)} ms`

);

});

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

window.addEventListener("error",(event)=>{

console.error(

"Global Error:",

event.message

);

});

// ==========================================
// UNHANDLED PROMISES
// ==========================================

window.addEventListener(

"unhandledrejection",

(event)=>{

console.error(

"Unhandled Promise:",

event.reason

);

}

);

// ==========================================
// APP HEALTH CHECK
// ==========================================

function healthCheck(){

return{

status:"OK",

online:navigator.onLine,

version:APP.version,

time:new Date().toLocaleString()

};

}

console.log(healthCheck());

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener("keydown",(e)=>{

// Ctrl + /
if(e.ctrlKey && e.key==="/"){

alert(

`${APP.name}\nVersion: ${APP.version}`

);

}

// ESC closes all modals
if(e.key==="Escape"){

document

.querySelectorAll(".modal.active")

.forEach(modal=>{

modal.classList.remove("active");

});

}

});

// ==========================================
// APP READY
// ==========================================

function initializeApp(){

startupChecks();

console.log(

`${APP.name} v${APP.version} Ready`

);

showToast(

"Application Ready",

"success"

);

}

initializeApp();

// ==========================================
// EXPORT APP
// ==========================================

export default APP;
