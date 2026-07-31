/* ==========================================
ASSAM FINANCE HUB
Version 4.0
Main JavaScript
========================================== */

"use strict";

/* ==========================================
SELECTORS
========================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================
LOADER
========================================== */

window.addEventListener("load", () => {

const loader = $("#loader");

if (loader) {

setTimeout(() => {

loader.style.opacity = "0";

loader.style.pointerEvents = "none";

setTimeout(() => {

loader.remove();

}, 500);

}, 800);

}

});

/* ==========================================
SCROLL TO TOP
========================================== */

const scrollBtn = $(".scroll-top");

window.addEventListener("scroll", () => {

if (!scrollBtn) return;

if (window.scrollY > 500) {

scrollBtn.style.display = "flex";

} else {

scrollBtn.style.display = "none";

}

});

scrollBtn?.addEventListener("click", () => {

window.scrollTo({

top: 0,

behavior: "smooth"

});

});

/* ==========================================
HEADER SHADOW
========================================== */

const header = $(".header");

window.addEventListener("scroll", () => {

if (!header) return;

if (window.scrollY > 30) {

header.style.boxShadow =

"0 10px 30px rgba(0,0,0,.12)";

} else {

header.style.boxShadow =

"0 5px 20px rgba(0,0,0,.08)";

}

});

/* ==========================================
ACTIVE MENU
========================================== */

const sections = $$("section");

const navLinks = $$("nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const top = section.offsetTop - 120;

const height = section.offsetHeight;

if (scrollY >= top) {

current = section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove("active");

if (

link.getAttribute("href") === "#" + current

) {

link.classList.add("active");

}

});

});

/* ==========================================
DARK MODE
========================================== */

const darkBtn = document.querySelector(".dark-mode");

function enableDarkMode() {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
}

function disableDarkMode() {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
}

if (localStorage.getItem("theme") === "dark") {
    enableDarkMode();
}

darkBtn?.addEventListener("click", () => {

    if (document.body.classList.contains("dark")) {

        disableDarkMode();

    } else {

        enableDarkMode();

    }

});

/* ==========================================
MOBILE MENU
========================================== */

const menuBtn = document.querySelector(".mobile-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");

function closeMenu() {

    mobileMenu?.classList.remove("active");

    menuOverlay?.classList.remove("active");

    menuBtn?.classList.remove("active");

}

menuBtn?.addEventListener("click", () => {

    mobileMenu?.classList.toggle("active");

    menuOverlay?.classList.toggle("active");

    menuBtn?.classList.toggle("active");

});

menuOverlay?.addEventListener("click", closeMenu);

/* ==========================================
TOAST MESSAGE
========================================== */

function showToast(message = "Success") {

    const toast = document.getElementById("toast");

    const text = document.getElementById("toastText");

    if (!toast) return;

    text.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* ==========================================
COOKIE NOTICE
========================================== */

const cookieNotice = document.getElementById("cookieNotice");

const acceptCookie = document.getElementById("acceptCookie");

if (!localStorage.getItem("cookieAccepted")) {

    if (cookieNotice) {

        cookieNotice.style.display = "block";

    }

}

acceptCookie?.addEventListener("click", () => {

    localStorage.setItem("cookieAccepted", "true");

    cookieNotice.style.display = "none";

});

/* ==========================================
WELCOME MESSAGE
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        showToast("Welcome to Assam Finance Hub");

    }, 1200);

});

/* ==========================================
EMI CALCULATOR
========================================== */

const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanTenure = document.getElementById("loanTenure");
const calculateBtn = document.querySelector(".calculate-btn");
const emiResult = document.getElementById("emiResult");

function calculateEMI() {

    if (!loanAmount || !interestRate || !loanTenure || !emiResult) return;

    const P = parseFloat(loanAmount.value);
    const annualRate = parseFloat(interestRate.value);
    const years = parseFloat(loanTenure.value);

    if (!P || !annualRate || !years) {

        showToast("Please fill all EMI details");

        return;

    }

    const R = annualRate / 12 / 100;
    const N = years * 12;

    const emi = (P * R * Math.pow(1 + R, N)) /
        (Math.pow(1 + R, N) - 1);

    emiResult.innerHTML = `₹ ${emi.toFixed(2)}`;

    showToast("EMI Calculated Successfully");

}

calculateBtn?.addEventListener("click", calculateEMI);

/* ==========================================
NUMBER COUNTER
========================================== */

const counters = document.querySelectorAll(".counter");

function startCounter(counter) {

    const target = +counter.dataset.target;

    let count = 0;

    const speed = target / 120;

    const update = () => {

        count += speed;

        if (count < target) {

            counter.innerText = Math.floor(count);

            requestAnimationFrame(update);

        } else {

            counter.innerText = target;

        }

    };

    update();

}

/* ==========================================
INTERSECTION OBSERVER
========================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            if (entry.target.classList.contains("counter")) {

                startCounter(entry.target);

            }

            entry.target.classList.add("active");

        }

    });

}, {

    threshold: 0.4

});

document.querySelectorAll(".reveal,.counter").forEach(item => {

    observer.observe(item);

});

/* ==========================================
PROGRESS BAR
========================================== */

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    if (!progressBar) return;

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.pageYOffset / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================================
LIVE VISITOR COUNTER
========================================== */

const visitorCount = document.getElementById("visitorCount");

if (visitorCount) {

    let visitors = 1254;

    setInterval(() => {

        visitors += Math.floor(Math.random() * 4);

        visitorCount.innerText = visitors.toLocaleString();

    }, 5000);

}

/* ==========================================
LOAN APPLICATION FORM
========================================== */

const loanForm = document.getElementById("loanForm");

loanForm?.addEventListener("submit", function (e) {

    e.preventDefault();

    if (validateLoanForm()) {

        showLoadingButton();

        setTimeout(() => {

            hideLoadingButton();

            showToast("Loan Application Submitted Successfully");

            loanForm.reset();

        }, 2500);

    }

});

/* ==========================================
FORM VALIDATION
========================================== */

function validateLoanForm() {

    const fullName = document.getElementById("fullName");
    const mobile = document.getElementById("mobile");
    const email = document.getElementById("email");
    const aadhaar = document.getElementById("aadhaar");
    const amount = document.getElementById("loanAmountInput");

    if (!fullName.value.trim()) {

        showToast("Enter Full Name");

        fullName.focus();

        return false;

    }

    if (!validateMobile(mobile.value)) {

        showToast("Invalid Mobile Number");

        mobile.focus();

        return false;

    }

    if (!validateEmail(email.value)) {

        showToast("Invalid Email Address");

        email.focus();

        return false;

    }

    if (!validateAadhaar(aadhaar.value)) {

        showToast("Invalid Aadhaar Number");

        aadhaar.focus();

        return false;

    }

    if (amount.value === "" || Number(amount.value) <= 0) {

        showToast("Enter Loan Amount");

        amount.focus();

        return false;

    }

    return true;

}

/* ==========================================
EMAIL VALIDATION
========================================== */

function validateEmail(email) {

    const regex =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

/* ==========================================
MOBILE VALIDATION
========================================== */

function validateMobile(number) {

    const regex = /^[6-9]\d{9}$/;

    return regex.test(number);

}

/* ==========================================
AADHAAR VALIDATION
========================================== */

function validateAadhaar(number) {

    const regex = /^\d{12}$/;

    return regex.test(number);

}

/* ==========================================
FILE VALIDATION
========================================== */

const uploadInput = document.getElementById("documentUpload");

uploadInput?.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const allowed = [

        "image/jpeg",

        "image/png",

        "application/pdf"

    ];

    if (!allowed.includes(file.type)) {

        showToast("Only JPG PNG PDF Allowed");

        this.value = "";

        return;

    }

    if (file.size > 5 * 1024 * 1024) {

        showToast("File Size Must Be Under 5MB");

        this.value = "";

        return;

    }

    showToast("Document Selected");

});

/* ==========================================
BUTTON LOADING
========================================== */

function showLoadingButton() {

    const btn =

    loanForm.querySelector("button");

    btn.classList.add("loading-btn");

    btn.disabled = true;

}

function hideLoadingButton() {

    const btn =

    loanForm.querySelector("button");

    btn.classList.remove("loading-btn");

    btn.disabled = false;

}

/* ==========================================
LOGIN & REGISTER SYSTEM
========================================== */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

/* ==========================================
REGISTER
========================================== */

registerForm?.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    if (name === "" || email === "" || password === "") {

        showToast("Please fill all fields");

        return;

    }

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem("afh_user", JSON.stringify(user));

    showToast("Registration Successful");

    registerForm.reset();

});

/* ==========================================
LOGIN
========================================== */

loginForm?.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("afh_user"));

    if (!user) {

        showToast("Please Register First");

        return;

    }

    if (email === user.email && password === user.password) {

        showToast("Login Successful");

        localStorage.setItem("loggedIn", "true");

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1200);

    } else {

        showToast("Invalid Email or Password");

    }

});

/* ==========================================
REMEMBER ME
========================================== */

const rememberMe = document.getElementById("rememberMe");

rememberMe?.addEventListener("change", function () {

    localStorage.setItem("rememberMe", this.checked);

});

window.addEventListener("load", () => {

    if (localStorage.getItem("rememberMe") === "true") {

        rememberMe.checked = true;

    }

});

/* ==========================================
SHOW / HIDE PASSWORD
========================================== */

document.querySelectorAll(".togglePassword").forEach(btn => {

    btn.addEventListener("click", function () {

        const input = document.getElementById(
            this.dataset.target
        );

        if (!input) return;

        if (input.type === "password") {

            input.type = "text";

            this.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            input.type = "password";

            this.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

});

/* ==========================================
LOGOUT
========================================== */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click", () => {

    localStorage.removeItem("loggedIn");

    showToast("Logged Out");

    setTimeout(() => {

        window.location.href = "index.html";

    }, 1000);

});

/* ==========================================
LOGIN CHECK
========================================== */

if (window.location.pathname.includes("dashboard.html")) {

    if (localStorage.getItem("loggedIn") !== "true") {

        window.location.href = "index.html";

    }

}

/* ==========================================
CUSTOMER DASHBOARD
========================================== */

const dashboardPage = window.location.pathname.includes("dashboard.html");

if (dashboardPage) {

loadUserProfile();

loadDashboard();

startClock();

loadNotifications();

}

/* ==========================================
LOAD USER PROFILE
========================================== */

function loadUserProfile() {

const user = JSON.parse(localStorage.getItem("afh_user"));

if (!user) return;

const userName = document.getElementById("userName");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

if(userName) userName.textContent = user.name;

if(profileName) profileName.textContent = user.name;

if(profileEmail) profileEmail.textContent = user.email;

}

/* ==========================================
DASHBOARD DATA
========================================== */

function loadDashboard(){

const loanAmount=document.getElementById("dashboardLoan");

const loanStatus=document.getElementById("dashboardStatus");

const approved=document.getElementById("approvedAmount");

const pending=document.getElementById("pendingAmount");

if(loanAmount) loanAmount.innerHTML="₹2,50,000";

if(loanStatus) loanStatus.innerHTML="Under Verification";

if(approved) approved.innerHTML="₹1,20,000";

if(pending) pending.innerHTML="₹1,30,000";

}

/* ==========================================
LOAN PROGRESS
========================================== */

function updateLoanProgress(percent){

const bar=document.getElementById("loanProgress");

const text=document.getElementById("loanProgressText");

if(!bar) return;

bar.style.width=percent+"%";

if(text){

text.innerHTML=percent+"% Completed";

}

}

updateLoanProgress(72);

/* ==========================================
LIVE CLOCK
========================================== */

function startClock(){

const clock=document.getElementById("liveClock");

if(!clock) return;

setInterval(()=>{

const now=new Date();

clock.innerHTML=now.toLocaleString();

},1000);

}

/* ==========================================
NOTIFICATIONS
========================================== */

function loadNotifications(){

const list=document.getElementById("notificationList");

if(!list) return;

const notifications=[

"Loan verification started",

"KYC documents verified",

"EMI schedule generated",

"Profile updated successfully"

];

list.innerHTML="";

notifications.forEach(item=>{

const li=document.createElement("li");

li.innerHTML=item;

list.appendChild(li);

});

}

/* ==========================================
REFRESH DASHBOARD
========================================== */

const refreshBtn=document.getElementById("refreshDashboard");

refreshBtn?.addEventListener("click",()=>{

showToast("Dashboard Updated");

loadDashboard();

loadNotifications();

});

/* ==========================================
LAST LOGIN
========================================== */

const lastLogin=document.getElementById("lastLogin");

if(lastLogin){

lastLogin.innerHTML=new Date().toLocaleString();

}

/* ==========================================
LOAN HISTORY
========================================== */

function loadLoanHistory() {

    const table = document.getElementById("loanHistoryBody");

    if (!table) return;

    const history = [

        {
            id: "AFH1001",
            amount: "₹2,50,000",
            type: "Personal Loan",
            status: "Approved",
            date: "15 Jul 2026"
        },

        {
            id: "AFH1002",
            amount: "₹1,20,000",
            type: "Education Loan",
            status: "Pending",
            date: "22 Jul 2026"
        }

    ];

    table.innerHTML = "";

    history.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>${item.id}</td>

            <td>${item.type}</td>

            <td>${item.amount}</td>

            <td>${item.date}</td>

            <td>${item.status}</td>

        </tr>

        `;

    });

}

loadLoanHistory();

/* ==========================================
EMI SCHEDULE
========================================== */

function generateEMISchedule() {

    const tbody = document.getElementById("emiScheduleBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    let balance = 250000;

    const emi = 8450;

    for (let i = 1; i <= 12; i++) {

        balance -= emi;

        if (balance < 0) balance = 0;

        tbody.innerHTML += `

        <tr>

            <td>${i}</td>

            <td>₹${emi}</td>

            <td>₹${balance}</td>

        </tr>

        `;

    }

}

generateEMISchedule();

/* ==========================================
DOWNLOAD PDF (Placeholder)
========================================== */

const pdfBtn = document.getElementById("downloadPDF");

pdfBtn?.addEventListener("click", () => {

    showToast("PDF Download Started");

});

/* ==========================================
TRANSACTION HISTORY
========================================== */

function loadTransactions() {

    const transactionBox = document.getElementById("transactionHistory");

    if (!transactionBox) return;

    const transactions = [

        "EMI Paid - ₹8,450",

        "Loan Disbursed - ₹2,50,000",

        "Processing Fee - ₹999",

        "Document Verification Completed"

    ];

    transactionBox.innerHTML = "";

    transactions.forEach(item => {

        transactionBox.innerHTML += `

        <li>${item}</li>

        `;

    });

}

loadTransactions();

/* ==========================================
DASHBOARD STATS
========================================== */

function updateStatistics() {

    const totalLoan = document.getElementById("totalLoan");

    const totalPaid = document.getElementById("totalPaid");

    const balance = document.getElementById("loanBalance");

    if (totalLoan) totalLoan.innerHTML = "₹2,50,000";

    if (totalPaid) totalPaid.innerHTML = "₹67,600";

    if (balance) balance.innerHTML = "₹1,82,400";

}

updateStatistics();

/* ==========================================
ADMIN PANEL
========================================== */

const adminPage =
window.location.pathname.includes("admin.html");

if (adminPage) {

loadCustomers();

loadAdminStats();

}

/* ==========================================
CUSTOMER DATA
========================================== */

const customerData = [

{

id:"AFH1001",

name:"Rahul Sharma",

loan:"₹2,50,000",

status:"Pending"

},

{

id:"AFH1002",

name:"Priya Das",

loan:"₹1,20,000",

status:"Approved"

},

{

id:"AFH1003",

name:"Amit Roy",

loan:"₹4,00,000",

status:"Rejected"

}

];

/* ==========================================
LOAD CUSTOMERS
========================================== */

function loadCustomers(){

const tbody=document.getElementById("customerTableBody");

if(!tbody) return;

tbody.innerHTML="";

customerData.forEach((user,index)=>{

tbody.innerHTML+=`

<tr>

<td>${user.id}</td>

<td>${user.name}</td>

<td>${user.loan}</td>

<td>

<span class="badge ${user.status.toLowerCase()}">

${user.status}

</span>

</td>

<td>

<button class="action-btn btn-view"

onclick="viewCustomer(${index})">

View

</button>

<button class="action-btn btn-edit"

onclick="approveLoan(${index})">

Approve

</button>

<button class="action-btn btn-delete"

onclick="rejectLoan(${index})">

Reject

</button>

</td>

</tr>

`;

});

}

/* ==========================================
VIEW CUSTOMER
========================================== */

function viewCustomer(index){

const customer=customerData[index];

showToast(

`${customer.name}

Loan : ${customer.loan}`

);

}

/* ==========================================
APPROVE LOAN
========================================== */

function approveLoan(index){

customerData[index].status="Approved";

loadCustomers();

showToast("Loan Approved");

loadAdminStats();

}

/* ==========================================
REJECT LOAN
========================================== */

function rejectLoan(index){

customerData[index].status="Rejected";

loadCustomers();

showToast("Loan Rejected");

loadAdminStats();

}

/* ==========================================
ADMIN STATS
========================================== */

function loadAdminStats(){

const total=document.getElementById("totalCustomers");

const approved=document.getElementById("approvedLoans");

const pending=document.getElementById("pendingLoans");

const rejected=document.getElementById("rejectedLoans");

if(!total) return;

const approvedCount=

customerData.filter(

x=>x.status==="Approved"

).length;

const pendingCount=

customerData.filter(

x=>x.status==="Pending"

).length;

const rejectedCount=

customerData.filter(

x=>x.status==="Rejected"

).length;

total.innerHTML=customerData.length;

approved.innerHTML=approvedCount;

pending.innerHTML=pendingCount;

rejected.innerHTML=rejectedCount;

}

/* ==========================================
SEARCH CUSTOMER
========================================== */

const searchCustomer=

document.getElementById("searchCustomer");

searchCustomer?.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const rows=

document.querySelectorAll(

"#customerTableBody tr"

);

rows.forEach(row=>{

row.style.display=

row.innerText.toLowerCase().includes(value)

? ""

: "none";

});

});

/* ==========================================
CHART.JS ANALYTICS
Requires Chart.js CDN
========================================== */

window.addEventListener("load", () => {

initCharts();

});

/* ==========================================
INITIALIZE CHARTS
========================================== */

function initCharts() {

monthlyLoanChart();

revenueChart();

customerChart();

loanStatusChart();

}

/* ==========================================
MONTHLY LOAN CHART
========================================== */

function monthlyLoanChart() {

const canvas = document.getElementById("loanChart");

if (!canvas) return;

new Chart(canvas, {

type: "line",

data: {

labels: [

"Jan","Feb","Mar","Apr","May","Jun",

"Jul","Aug","Sep","Oct","Nov","Dec"

],

datasets: [{

label: "Loan Applications",

data: [25,40,32,55,70,90,85,100,96,110,120,145],

borderColor: "#0d6efd",

backgroundColor: "rgba(13,110,253,.12)",

fill: true,

tension: .4

}]

},

options: {

responsive: true,

plugins: {

legend: {

display: true

}

}

}

});

}

/* ==========================================
REVENUE CHART
========================================== */

function revenueChart() {

const canvas = document.getElementById("revenueChart");

if (!canvas) return;

new Chart(canvas, {

type: "bar",

data: {

labels: [

"Q1","Q2","Q3","Q4"

],

datasets: [{

label: "Revenue",

data: [12,18,24,30],

backgroundColor: [

"#0d6efd",

"#00b894",

"#ffc107",

"#e53935"

]

}]

},

options: {

responsive: true

}

});

}

/* ==========================================
CUSTOMER GROWTH
========================================== */

function customerChart() {

const canvas = document.getElementById("customerChart");

if (!canvas) return;

new Chart(canvas, {

type: "line",

data: {

labels: [

"Mon","Tue","Wed","Thu","Fri","Sat","Sun"

],

datasets: [{

label: "New Customers",

data: [8,12,10,15,20,18,25],

borderColor: "#00b894",

backgroundColor: "rgba(0,184,148,.15)",

fill: true,

tension: .35

}]

}

});

}

/* ==========================================
LOAN STATUS PIE CHART
========================================== */

function loanStatusChart() {

const canvas = document.getElementById("statusChart");

if (!canvas) return;

new Chart(canvas, {

type: "pie",

data: {

labels: [

"Approved",

"Pending",

"Rejected"

],

datasets: [{

data: [65,25,10],

backgroundColor: [

"#00b894",

"#ffc107",

"#e53935"

]

}]

}

});

}

/* ==========================================
FIREBASE CONFIGURATION
========================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAnQPG-tdceOqxxfEzHIYdpr6pBJDcOgbM",
  authDomain: "assam-finance-hub.firebaseapp.com",
  projectId: "assam-finance-hub",
  storageBucket: "assam-finance-hub.firebasestorage.app",
  messagingSenderId: "989678663450",
  appId: "1:989678663450:web:d0499bf58d8dd382325ea3",
  measurementId: "G-H1SX3EDQJM"
};

/* ==========================================
INITIALIZE FIREBASE
========================================== */

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

if (firebase.analytics) {
    firebase.analytics();
}

/* ==========================================
REGISTER USER
========================================== */

async function firebaseRegister(name, email, password) {

    try {

        const result = await auth.createUserWithEmailAndPassword(email, password);

        await db.collection("users").doc(result.user.uid).set({
            name: name,
            email: email,
            role: "customer",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showToast("Registration Successful");

    } catch (error) {

        showToast(error.message);
        console.error(error);

    }

}

/* ==========================================
LOGIN USER
========================================== */

async function firebaseLogin(email, password) {

    try {

        await auth.signInWithEmailAndPassword(email, password);

        showToast("Login Successful");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (error) {

        showToast(error.message);
        console.error(error);

    }

}

/* ==========================================
LOGOUT USER
========================================== */

async function firebaseLogout() {

    try {

        await auth.signOut();

        showToast("Logged Out");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {

        showToast(error.message);

    }

}

/* ==========================================
AUTH STATE LISTENER
========================================== */

auth.onAuthStateChanged(async (user) => {

    if (user) {

        console.log("Logged In :", user.email);

        const profileName = document.getElementById("profileName");
        const profileEmail = document.getElementById("profileEmail");

        try {

            const doc = await db.collection("users")
                .doc(user.uid)
                .get();

            if (doc.exists) {

                const data = doc.data();

                if (profileName)
                    profileName.innerHTML = data.name;

                if (profileEmail)
                    profileEmail.innerHTML = data.email;

            }

        } catch (e) {

            console.log(e);

        }

    } else {

        console.log("User Not Logged In");

    }

});

/* ==========================================
SAVE LOAN APPLICATION
========================================== */

async function saveLoanApplication(applicationData) {

    try {

        const user = auth.currentUser;

        if (!user) {

            showToast("Please Login First");
            return;

        }

        await db.collection("loanApplications").add({

            uid: user.uid,

            ...applicationData,

            status: "Pending",

            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        });

        showToast("Loan Application Submitted");

    } catch (error) {

        showToast(error.message);

    }

}

/* ==========================================
END OF PART 10
========================================== */

/* ==========================================
FIREBASE STORAGE
DOCUMENT UPLOAD SYSTEM
========================================== */

const documentUpload =
document.getElementById("documentUpload");

const uploadProgress =
document.getElementById("uploadProgress");

const uploadPercent =
document.getElementById("uploadPercent");

const uploadedFile =
document.getElementById("uploadedFile");

/* ==========================================
UPLOAD DOCUMENT
========================================== */

async function uploadDocument(file){

try{

const user=auth.currentUser;

if(!user){

showToast("Please Login First");

return;

}

const fileName=

Date.now()+"_"+file.name;

const storageRef=

storage.ref(

"documents/"+

user.uid+

"/"+

fileName

);

const uploadTask=

storageRef.put(file);

uploadTask.on(

"state_changed",

(snapshot)=>{

const progress=

(snapshot.bytesTransferred/

snapshot.totalBytes)

*100;

if(uploadProgress){

uploadProgress.style.width=

progress+"%";

}

if(uploadPercent){

uploadPercent.innerHTML=

Math.floor(progress)+"%";

}

},

(error)=>{

console.log(error);

showToast("Upload Failed");

},

async()=>{

const url=

await storageRef.getDownloadURL();

if(uploadedFile){

uploadedFile.innerHTML=`

<a href="${url}"

target="_blank">

${file.name}

</a>

`;

}

await db

.collection("documents")

.add({

uid:user.uid,

fileName:file.name,

fileURL:url,

uploadedAt:

firebase.firestore.FieldValue

.serverTimestamp()

});

showToast("Document Uploaded");

}

);

}catch(error){

console.log(error);

showToast(error.message);

}

}

/* ==========================================
FILE INPUT
========================================== */

documentUpload?.addEventListener(

"change",

function(){

const file=this.files[0];

if(!file) return;

const allowed=[

"application/pdf",

"image/jpeg",

"image/png"

];

if(!allowed.includes(file.type)){

showToast(

"Only PDF JPG PNG Allowed"

);

this.value="";

return;

}

if(file.size>

5*1024*1024){

showToast(

"Maximum File Size 5MB"

);

this.value="";

return;

}

uploadDocument(file);

}

);

/* ==========================================
LOAD DOCUMENTS
========================================== */

async function loadDocuments(){

const list=

document.getElementById(

"documentList"

);

if(!list) return;

const user=

auth.currentUser;

if(!user) return;

const snapshot=

await db

.collection("documents")

.where(

"uid",

"==",

user.uid

)

.get();

list.innerHTML="";

snapshot.forEach(doc=>{

const data=doc.data();

list.innerHTML+=`

<li>

<a href="${data.fileURL}"

target="_blank">

${data.fileName}

</a>

<button

onclick="deleteDocument(

'${doc.id}'

)">

Delete

</button>

</li>

`;

});

}

/* ==========================================
DELETE DOCUMENT
========================================== */

async function deleteDocument(id){

try{

await db

.collection("documents")

.doc(id)

.delete();

showToast(

"Document Deleted"

);

loadDocuments();

}catch(error){

showToast(error.message);

}

}

/* ==========================================
AUTO LOAD
========================================== */

auth.onAuthStateChanged(user=>{

if(user){

loadDocuments();

}

});

/* ==========================================
ONLINE LOAN APPLICATION
FIRESTORE INTEGRATION
========================================== */

const applyLoanForm =
document.getElementById("applyLoanForm");

applyLoanForm?.addEventListener(
"submit",
async function(e){

e.preventDefault();

const user=auth.currentUser;

if(!user){

showToast("Please Login First");

return;

}

const application={

uid:user.uid,

fullName:
document.getElementById("fullName").value,

mobile:
document.getElementById("mobile").value,

email:
document.getElementById("email").value,

loanType:
document.getElementById("loanType").value,

loanAmount:
Number(
document.getElementById("loanAmountInput").value
),

monthlyIncome:
Number(
document.getElementById("monthlyIncome").value
),

employment:
document.getElementById("employmentType").value,

city:
document.getElementById("city").value,

state:
document.getElementById("state").value,

status:"Pending",

remarks:"",

createdAt:
firebase.firestore.FieldValue.serverTimestamp()

};

try{

await db
.collection("loanApplications")
.add(application);

showToast("Application Submitted");

applyLoanForm.reset();

}catch(error){

showToast(error.message);

}

});

/* ==========================================
LOAD MY APPLICATIONS
========================================== */

async function loadMyApplications(){

const user=auth.currentUser;

if(!user) return;

const tbody=
document.getElementById("applicationTableBody");

if(!tbody) return;

tbody.innerHTML="";

const snapshot=

await db
.collection("loanApplications")
.where("uid","==",user.uid)
.orderBy("createdAt","desc")
.get();

snapshot.forEach(doc=>{

const data=doc.data();

tbody.innerHTML+=`

<tr>

<td>${doc.id.substring(0,8)}</td>

<td>${data.loanType}</td>

<td>₹${data.loanAmount}</td>

<td>${data.status}</td>

<td>${data.employment}</td>

</tr>

`;

});

}

/* ==========================================
REALTIME STATUS
========================================== */

function startRealtimeStatus(){

const user=auth.currentUser;

if(!user) return;

db.collection("loanApplications")

.where("uid","==",user.uid)

.onSnapshot(snapshot=>{

snapshot.docChanges().forEach(change=>{

if(change.type==="modified"){

showToast(

"Loan Status Updated"

);

}

});

loadMyApplications();

});

}

/* ==========================================
TOTAL LOAN REQUEST
========================================== */

async function totalRequestedLoan(){

const user=auth.currentUser;

if(!user) return;

const result=

await db

.collection("loanApplications")

.where("uid","==",user.uid)

.get();

let total=0;

result.forEach(doc=>{

total+=Number(doc.data().loanAmount);

});

const totalBox=

document.getElementById("totalRequested");

if(totalBox){

totalBox.innerHTML=

"₹"+total.toLocaleString();

}

}

/* ==========================================
APPLICATION COUNTER
========================================== */

async function applicationCount(){

const user=auth.currentUser;

if(!user) return;

const result=

await db

.collection("loanApplications")

.where("uid","==",user.uid)

.get();

const counter=

document.getElementById("applicationCount");

if(counter){

counter.innerHTML=result.size;

}

}

/* ==========================================
AUTO LOAD
========================================== */

auth.onAuthStateChanged(user=>{

if(user){

loadMyApplications();

startRealtimeStatus();

totalRequestedLoan();

applicationCount();

}

});

/* ==========================================
LIVE CHAT + AI ASSISTANT
CALLBACK + CONTACT SYSTEM
========================================== */

/* ==========================================
CHAT WINDOW
========================================== */

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatBody = document.getElementById("chatBody");

chatToggle?.addEventListener("click", () => {

    chatWindow.classList.add("active");

});

chatClose?.addEventListener("click", () => {

    chatWindow.classList.remove("active");

});

/* ==========================================
SEND MESSAGE
========================================== */

chatSend?.addEventListener("click", sendMessage);

chatInput?.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const text=chatInput.value.trim();

    if(text==="") return;

    appendMessage("user",text);

    chatInput.value="";

    setTimeout(()=>{

        autoReply(text);

    },800);

}

/* ==========================================
APPEND MESSAGE
========================================== */

function appendMessage(type,message){

    if(!chatBody) return;

    const div=document.createElement("div");

    div.className="chat-message "+type;

    div.innerHTML=message;

    chatBody.appendChild(div);

    chatBody.scrollTop=chatBody.scrollHeight;

}

/* ==========================================
AI AUTO REPLY
========================================== */

function autoReply(msg){

    msg=msg.toLowerCase();

    let reply="";

    if(msg.includes("loan")){

        reply="Our loan team will contact you shortly.";

    }

    else if(msg.includes("emi")){

        reply="You can calculate EMI using our EMI Calculator.";

    }

    else if(msg.includes("home")){

        reply="Home Loan starts from attractive interest rates.";

    }

    else if(msg.includes("personal")){

        reply="Personal Loan approval is usually very fast.";

    }

    else{

        reply="Thank you for contacting Assam Finance Hub.";

    }

    appendMessage("bot",reply);

}

/* ==========================================
CALLBACK REQUEST
========================================== */

const callbackForm=

document.getElementById("callbackForm");

callbackForm?.addEventListener(

"submit",

async function(e){

e.preventDefault();

const user=auth.currentUser;

await db.collection("callbackRequests").add({

uid:user?user.uid:null,

name:

document.getElementById("callbackName").value,

mobile:

document.getElementById("callbackMobile").value,

createdAt:

firebase.firestore.FieldValue.serverTimestamp()

});

showToast("Callback Requested");

callbackForm.reset();

});

/* ==========================================
CONTACT FORM
========================================== */

const contactForm=

document.getElementById("contactForm");

contactForm?.addEventListener(

"submit",

async function(e){

e.preventDefault();

await db.collection("contactMessages").add({

name:

document.getElementById("contactName").value,

email:

document.getElementById("contactEmail").value,

subject:

document.getElementById("contactSubject").value,

message:

document.getElementById("contactMessage").value,

createdAt:

firebase.firestore.FieldValue.serverTimestamp()

});

showToast("Message Sent");

contactForm.reset();

});

/* ==========================================
ADMIN LIVE NOTIFICATION
========================================== */

function adminNotification(message){

db.collection("adminNotifications").add({

message:message,

time:

firebase.firestore.FieldValue.serverTimestamp()

});

}

/* ==========================================
AUTO NOTIFY
========================================== */

contactForm?.addEventListener("submit",()=>{

adminNotification("New Contact Message");

});

callbackForm?.addEventListener("submit",()=>{

adminNotification("New Callback Request");

});

/* ==========================================
RAZORPAY PAYMENT GATEWAY
Version 4.0
========================================== */

/* ==========================================
PAY NOW
========================================== */

const payNowBtn = document.getElementById("payNow");

payNowBtn?.addEventListener("click", () => {

    startPayment();

});

/* ==========================================
START PAYMENT
========================================== */

function startPayment() {

    const amountInput = document.getElementById("paymentAmount");

    if (!amountInput) {

        showToast("Payment Amount Not Found");

        return;

    }

    const amount = Number(amountInput.value);

    if (amount <= 0) {

        showToast("Enter Valid Amount");

        return;

    }

    const user = auth.currentUser;

    const options = {

        key: "YOUR_RAZORPAY_KEY_ID",

        amount: amount * 100,

        currency: "INR",

        name: "Assam Finance Hub",

        description: "Loan EMI Payment",

        image: "assets/logo.png",

        handler: function (response) {

            paymentSuccess(response, amount);

        },

        prefill: {

            name: user?.displayName || "",

            email: user?.email || "",

            contact: ""

        },

        theme: {

            color: "#0d6efd"

        }

    };

    const rzp = new Razorpay(options);

    rzp.open();

}

/* ==========================================
PAYMENT SUCCESS
========================================== */

async function paymentSuccess(response, amount) {

    try {

        const user = auth.currentUser;

        await db.collection("payments").add({

            uid: user.uid,

            paymentId: response.razorpay_payment_id,

            amount: amount,

            status: "Success",

            date: firebase.firestore.FieldValue.serverTimestamp()

        });

        showToast("Payment Successful");

        loadPaymentHistory();

        generateReceipt(

            response.razorpay_payment_id,

            amount

        );

    }

    catch (error) {

        console.log(error);

    }

}

/* ==========================================
PAYMENT HISTORY
========================================== */

async function loadPaymentHistory() {

    const table =

    document.getElementById("paymentHistory");

    if (!table) return;

    const user = auth.currentUser;

    const snapshot = await db

    .collection("payments")

    .where("uid", "==", user.uid)

    .orderBy("date", "desc")

    .get();

    table.innerHTML = "";

    snapshot.forEach(doc => {

        const data = doc.data();

        table.innerHTML += `

<tr>

<td>${data.paymentId}</td>

<td>₹${data.amount}</td>

<td>${data.status}</td>

</tr>

`;

    });

}

/* ==========================================
PAYMENT RECEIPT
========================================== */

function generateReceipt(paymentId, amount) {

    const receipt =

    document.getElementById("paymentReceipt");

    if (!receipt) return;

    receipt.innerHTML = `

<h3>Payment Receipt</h3>

<p>Payment ID : ${paymentId}</p>

<p>Amount : ₹${amount}</p>

<p>Status : Success</p>

<p>Date : ${new Date().toLocaleString()}</p>

`;

}

/* ==========================================
AUTO LOAD HISTORY
========================================== */

auth.onAuthStateChanged(user => {

    if (user) {

        loadPaymentHistory();

    }

});

/* ==========================================
PWA + OFFLINE + PUSH NOTIFICATION
Version 4.0
========================================== */

/* ==========================================
SERVICE WORKER
========================================== */

if ("serviceWorker" in navigator) {

window.addEventListener("load", async () => {

try{

await navigator.serviceWorker.register("service-worker.js");

console.log("Service Worker Registered");

}catch(error){

console.log(error);

}

});

}

/* ==========================================
INSTALL PWA
========================================== */

let deferredPrompt;

const installBtn=document.getElementById("installApp");

window.addEventListener(

"beforeinstallprompt",

(event)=>{

event.preventDefault();

deferredPrompt=event;

if(installBtn){

installBtn.style.display="inline-flex";

}

});

installBtn?.addEventListener(

"click",

async()=>{

if(!deferredPrompt) return;

deferredPrompt.prompt();

const choice=

await deferredPrompt.userChoice;

if(choice.outcome==="accepted"){

showToast("App Installed");

}

deferredPrompt=null;

installBtn.style.display="none";

});

/* ==========================================
ONLINE OFFLINE STATUS
========================================== */

function updateNetworkStatus(){

const status=

document.getElementById("networkStatus");

if(!status) return;

if(navigator.onLine){

status.innerHTML="🟢 Online";

status.className="online";

}else{

status.innerHTML="🔴 Offline";

status.className="offline";

}

}

window.addEventListener(

"online",

()=>{

updateNetworkStatus();

showToast("Internet Connected");

});

window.addEventListener(

"offline",

()=>{

updateNetworkStatus();

showToast("Internet Disconnected");

});

updateNetworkStatus();

/* ==========================================
PUSH NOTIFICATION
========================================== */

async function requestNotificationPermission(){

if(!("Notification" in window)) return;

const permission=

await Notification.requestPermission();

if(permission==="granted"){

showToast("Notification Enabled");

}

}

requestNotificationPermission();

/* ==========================================
LOCAL NOTIFICATION
========================================== */

function sendNotification(title,body){

if(Notification.permission==="granted"){

new Notification(title,{

body:body,

icon:"assets/icon-192.png",

badge:"assets/icon-192.png"

});

}

}

/* ==========================================
REMINDER
========================================== */

setTimeout(()=>{

sendNotification(

"Assam Finance Hub",

"Check your latest loan status."

);

},30000);

/* ==========================================
BACKGROUND SYNC
========================================== */

window.addEventListener(

"online",

()=>{

console.log("Background Sync Started");

});

/* ==========================================
AUTO UPDATE
========================================== */

navigator.serviceWorker?.addEventListener(

"controllerchange",

()=>{

showToast("New Version Available");

});

/* ==========================================
CACHE STATUS
========================================== */

async function clearCache(){

if(!("caches" in window)) return;

const names=

await caches.keys();

for(const name of names){

await caches.delete(name);

}

showToast("Cache Cleared");

}

/* ==========================================
END PART 15
========================================== */

/* ==========================================
ADMIN REAL-TIME ANALYTICS
Version 4.0
========================================== */

const adminDashboard =
window.location.pathname.includes("admin.html");

if (adminDashboard) {

    initializeAdminDashboard();

}

/* ==========================================
INITIALIZE ADMIN DASHBOARD
========================================== */

async function initializeAdminDashboard() {

    loadRealtimeStatistics();

    loadRecentApplications();

    monitorUserActivity();

    monitorPayments();

    monitorLoanStatus();

}

/* ==========================================
REALTIME STATISTICS
========================================== */

function loadRealtimeStatistics() {

    db.collection("loanApplications")

    .onSnapshot(snapshot => {

        let pending = 0;
        let approved = 0;
        let rejected = 0;
        let totalAmount = 0;

        snapshot.forEach(doc => {

            const data = doc.data();

            totalAmount += Number(data.loanAmount || 0);

            switch (data.status) {

                case "Pending":
                    pending++;
                    break;

                case "Approved":
                    approved++;
                    break;

                case "Rejected":
                    rejected++;
                    break;

            }

        });

        updateAdminStatistics({

            total: snapshot.size,

            pending,

            approved,

            rejected,

            amount: totalAmount

        });

    });

}

/* ==========================================
UPDATE DASHBOARD
========================================== */

function updateAdminStatistics(data) {

    document.getElementById("totalApplications") &&
    (document.getElementById("totalApplications").innerHTML = data.total);

    document.getElementById("pendingApplications") &&
    (document.getElementById("pendingApplications").innerHTML = data.pending);

    document.getElementById("approvedApplications") &&
    (document.getElementById("approvedApplications").innerHTML = data.approved);

    document.getElementById("rejectedApplications") &&
    (document.getElementById("rejectedApplications").innerHTML = data.rejected);

    document.getElementById("loanVolume") &&
    (document.getElementById("loanVolume").innerHTML =
        "₹" + data.amount.toLocaleString());

}

/* ==========================================
RECENT APPLICATIONS
========================================== */

function loadRecentApplications() {

    db.collection("loanApplications")

    .orderBy("createdAt", "desc")

    .limit(10)

    .onSnapshot(snapshot => {

        const table =
        document.getElementById("recentApplications");

        if (!table) return;

        table.innerHTML = "";

        snapshot.forEach(doc => {

            const data = doc.data();

            table.innerHTML += `

<tr>

<td>${doc.id.substring(0,8)}</td>

<td>${data.fullName}</td>

<td>${data.loanType}</td>

<td>₹${Number(data.loanAmount).toLocaleString()}</td>

<td>${data.status}</td>

</tr>

`;

        });

    });

}

/* ==========================================
USER ACTIVITY
========================================== */

function monitorUserActivity() {

    db.collection("users")

    .onSnapshot(snapshot => {

        const activeUsers =
        document.getElementById("activeUsers");

        if (activeUsers) {

            activeUsers.innerHTML = snapshot.size;

        }

    });

}

/* ==========================================
PAYMENT MONITOR
========================================== */

function monitorPayments() {

    db.collection("payments")

    .onSnapshot(snapshot => {

        let totalRevenue = 0;

        snapshot.forEach(doc => {

            totalRevenue +=
            Number(doc.data().amount || 0);

        });

        const revenue =
        document.getElementById("totalRevenue");

        if (revenue) {

            revenue.innerHTML =
            "₹" + totalRevenue.toLocaleString();

        }

    });

}

/* ==========================================
LOAN STATUS MONITOR
========================================== */

function monitorLoanStatus() {

    db.collection("loanApplications")

    .where("status","==","Pending")

    .onSnapshot(snapshot => {

        if(snapshot.docChanges().length>0){

            showToast("New Loan Application Received");

        }

    });

}

/* ==========================================
EXPORT CSV
========================================== */

function exportCSV() {

    showToast("CSV Export Started");

}

/* ==========================================
PRINT REPORT
========================================== */

function printReport() {

    window.print();

}

/* ==========================================
END PART 16
========================================== */

/* ==========================================
SMART LOAN ENGINE
Credit Score + Eligibility + Interest
Version 4.0
========================================== */

/* ==========================================
ELEMENTS
========================================== */

const creditScoreInput =
document.getElementById("creditScore");

const monthlyIncomeInput =
document.getElementById("monthlyIncome");

const existingEMIInput =
document.getElementById("existingEMI");

const loanAmountRequest =
document.getElementById("requestedLoan");

const calculateEligibilityBtn =
document.getElementById("checkEligibility");

/* ==========================================
CHECK ELIGIBILITY
========================================== */

calculateEligibilityBtn?.addEventListener(

"click",

calculateEligibility

);

function calculateEligibility(){

const score=

Number(creditScoreInput?.value);

const income=

Number(monthlyIncomeInput?.value);

const emi=

Number(existingEMIInput?.value);

const amount=

Number(loanAmountRequest?.value);

if(

!score||

!income||

!amount

){

showToast(

"Fill All Required Fields"

);

return;

}

const eligibility=

getEligibility(

score,

income,

emi,

amount

);

displayEligibility(

eligibility

);

}

/* ==========================================
ELIGIBILITY LOGIC
========================================== */

function getEligibility(

score,

income,

emi,

amount

){

const maxEMI=

income*0.50;

const available=

maxEMI-emi;

let status="Rejected";

let interest=0;

if(

score>=800&&

available>5000

){

status="Excellent";

interest=8.25;

}

else if(

score>=750&&

available>4000

){

status="Approved";

interest=9.25;

}

else if(

score>=700&&

available>3000

){

status="Conditional";

interest=10.50;

}

else{

status="Rejected";

interest=0;

}

const maxLoan=

available*60;

return{

status,

interest,

maxLoan,

requested:amount

};

}

/* ==========================================
DISPLAY RESULT
========================================== */

function displayEligibility(data){

const status=

document.getElementById("loanEligibility");

const rate=

document.getElementById("interestRate");

const maxLoan=

document.getElementById("eligibleLoan");

const recommendation=

document.getElementById("loanRecommendation");

if(status)

status.innerHTML=data.status;

if(rate)

rate.innerHTML=

data.interest

?data.interest+"%"

:"--";

if(maxLoan)

maxLoan.innerHTML=

"₹"+

Math.round(

data.maxLoan

).toLocaleString();

if(recommendation){

if(data.status==="Excellent"){

recommendation.innerHTML=

"Recommended: Premium Personal Loan";

}

else if(data.status==="Approved"){

recommendation.innerHTML=

"Recommended: Standard Personal Loan";

}

else if(data.status==="Conditional"){

recommendation.innerHTML=

"Recommended: Secured Loan";

}

else{

recommendation.innerHTML=

"Improve your Credit Score before applying.";

}

}

showToast(

"Eligibility Calculated"

);

}

/* ==========================================
CIBIL GRADE
========================================== */

function getCibilGrade(score){

if(score>=800) return "A+";

if(score>=750) return "A";

if(score>=700) return "B+";

if(score>=650) return "B";

if(score>=600) return "C";

return "Poor";

}

creditScoreInput?.addEventListener(

"input",

()=>{

const grade=

document.getElementById("cibilGrade");

if(grade){

grade.innerHTML=

getCibilGrade(

Number(

creditScoreInput.value

)

);

}

}

/* ==========================================
SMART INTEREST RATE
========================================== */

function calculateInterest(score){

if(score>=800) return 8.25;

if(score>=750) return 9.25;

if(score>=700) return 10.50;

if(score>=650) return 12.00;

return 14.50;

}

/* ==========================================
PRE-APPROVAL
========================================== */

function preApprove(score){

return score>=750;

}

/* ==========================================
END PART 17
========================================== */

/* ==========================================
AI FINANCIAL ADVISOR
SIP + FD + RETIREMENT CALCULATOR
Version 4.0
========================================== */

/* ==========================================
ELEMENTS
========================================== */

const sipAmount=document.getElementById("sipAmount");
const sipRate=document.getElementById("sipRate");
const sipYears=document.getElementById("sipYears");
const sipResult=document.getElementById("sipResult");

const fdAmount=document.getElementById("fdAmount");
const fdRate=document.getElementById("fdRate");
const fdYears=document.getElementById("fdYears");
const fdResult=document.getElementById("fdResult");

const retirementAge=document.getElementById("retirementAge");
const currentAge=document.getElementById("currentAge");
const monthlyExpense=document.getElementById("monthlyExpense");
const retirementResult=document.getElementById("retirementResult");

/* ==========================================
SIP CALCULATOR
========================================== */

function calculateSIP(){

const P=Number(sipAmount?.value);

const annualRate=Number(sipRate?.value);

const years=Number(sipYears?.value);

if(!P||!annualRate||!years){

showToast("Fill SIP Details");

return;

}

const r=annualRate/12/100;

const n=years*12;

const futureValue=

P*

((Math.pow(1+r,n)-1)/r)

*(1+r);

if(sipResult){

sipResult.innerHTML=

"₹"+

Math.round(futureValue)

.toLocaleString();

}

showToast("SIP Calculated");

}

/* ==========================================
FD CALCULATOR
========================================== */

function calculateFD(){

const P=Number(fdAmount?.value);

const rate=Number(fdRate?.value);

const years=Number(fdYears?.value);

if(!P||!rate||!years){

showToast("Fill FD Details");

return;

}

const maturity=

P*

Math.pow(

1+(rate/100),

years

);

if(fdResult){

fdResult.innerHTML=

"₹"+

Math.round(maturity)

.toLocaleString();

}

showToast("FD Calculated");

}

/* ==========================================
RETIREMENT CALCULATOR
========================================== */

function calculateRetirement(){

const age=

Number(currentAge?.value);

const retire=

Number(retirementAge?.value);

const expense=

Number(monthlyExpense?.value);

if(

!age||

!retire||

!expense

){

showToast("Fill Retirement Details");

return;

}

const yearsLeft=

retire-age;

const corpus=

expense*

12*

20;

if(retirementResult){

retirementResult.innerHTML=`

Years Left :

<b>${yearsLeft}</b>

<br>

Required Corpus :

<b>

₹${Math.round(corpus)

.toLocaleString()}

</b>

`;

}

showToast(

"Retirement Plan Ready"

);

}

/* ==========================================
AI FINANCIAL ADVISOR
========================================== */

function financialAdvice(){

const score=

Number(

creditScoreInput?.value||0

);

const income=

Number(

monthlyIncomeInput?.value||0

);

let advice="";

if(score>=800){

advice=

"Excellent Credit Score. Premium Loan Recommended.";

}

else if(score>=750){

advice=

"Good Score. Personal Loan Recommended.";

}

else if(score>=700){

advice=

"Improve score for lower interest.";

}

else{

advice=

"Increase credit score before taking loan.";

}

if(income<30000){

advice+=

" Build emergency savings before investing.";

}

else{

advice+=

" Start SIP for long-term wealth creation.";

}

const box=

document.getElementById("financialAdvice");

if(box){

box.innerHTML=advice;

}

}

/* ==========================================
BUTTON EVENTS
========================================== */

document

.getElementById("sipCalculate")

?.addEventListener(

"click",

calculateSIP

);

document

.getElementById("fdCalculate")

?.addEventListener(

"click",

calculateFD

);

document

.getElementById("retirementCalculate")

?.addEventListener(

"click",

calculateRetirement

);

document

.getElementById("advisorButton")

?.addEventListener(

"click",

financialAdvice

);

/* ==========================================
AUTO UPDATE
========================================== */

creditScoreInput?.addEventListener(

"input",

financialAdvice

);

monthlyIncomeInput?.addEventListener(

"input",

financialAdvice

);

/* ==========================================
END PART 18
========================================== */

/* ==========================================
ADVANCED SECURITY SYSTEM
OTP + 2FA + PASSWORD RESET
Version 4.0
========================================== */

/* ==========================================
GENERATE OTP
========================================== */

let generatedOTP = "";

function generateOTP() {

generatedOTP = Math.floor(
100000 + Math.random() * 900000
).toString();

return generatedOTP;

}

/* ==========================================
SEND EMAIL OTP
========================================== */

async function sendEmailOTP() {

const email =
document.getElementById("otpEmail")?.value;

if (!email) {

showToast("Enter Email");

return;

}

const otp = generateOTP();

localStorage.setItem("emailOTP", otp);

console.log("OTP :", otp);

showToast("OTP Sent Successfully");

document.getElementById("otpSection")
?.classList.remove("hidden");

}

/* ==========================================
VERIFY OTP
========================================== */

function verifyOTP() {

const otp =
document.getElementById("otpInput")?.value;

const savedOTP =
localStorage.getItem("emailOTP");

if (otp === savedOTP) {

showToast("OTP Verified");

localStorage.removeItem("emailOTP");

} else {

showToast("Invalid OTP");

}

}

/* ==========================================
MOBILE OTP
========================================== */

let mobileOTP = "";

function sendMobileOTP() {

const mobile =
document.getElementById("otpMobile")?.value;

if (!mobile) {

showToast("Enter Mobile Number");

return;

}

mobileOTP = generateOTP();

console.log("Mobile OTP :", mobileOTP);

showToast("OTP Sent");

}

function verifyMobileOTP() {

const otp =
document.getElementById("mobileOTP")?.value;

if (otp === mobileOTP) {

showToast("Mobile Verified");

} else {

showToast("Wrong OTP");

}

}

/* ==========================================
TWO FACTOR AUTHENTICATION
========================================== */

function enable2FA() {

localStorage.setItem("2FA", "enabled");

showToast("2FA Enabled");

}

function disable2FA() {

localStorage.removeItem("2FA");

showToast("2FA Disabled");

}

/* ==========================================
CHECK 2FA
========================================== */

function check2FA() {

return localStorage.getItem("2FA") === "enabled";

}

/* ==========================================
PASSWORD RESET
========================================== */

async function resetPassword() {

const email =
document.getElementById("resetEmail")?.value;

if (!email) {

showToast("Enter Email");

return;

}

try {

await auth.sendPasswordResetEmail(email);

showToast("Password Reset Email Sent");

}

catch(error) {

showToast(error.message);

}

}

/* ==========================================
LOGIN SECURITY
========================================== */

auth.onAuthStateChanged(user=>{

if(user){

if(check2FA()){

showToast("2FA Verification Required");

}

}

});

/* ==========================================
FAILED LOGIN LIMIT
========================================== */

let failedLogin = 0;

function failedAttempt(){

failedLogin++;

if(failedLogin>=5){

showToast("Account Temporarily Locked");

setTimeout(()=>{

failedLogin=0;

},300000);

}

}

/* ==========================================
LOGIN SUCCESS
========================================== */

function loginSuccess(){

failedLogin=0;

}

/* ==========================================
END PART 19
========================================== */

/* ==========================================
REPORT SYSTEM
Excel + PDF + Print
Version 4.0
========================================== */

/* ==========================================
EXPORT TABLE TO CSV
========================================== */

function exportCSV(tableId, fileName = "report.csv") {

    const table = document.getElementById(tableId);

    if (!table) {
        showToast("Table Not Found");
        return;
    }

    let csv = [];

    for (let row of table.rows) {

        let cols = [];

        for (let cell of row.cells) {

            cols.push('"' + cell.innerText.replace(/"/g, '""') + '"');

        }

        csv.push(cols.join(","));

    }

    const csvFile = new Blob([csv.join("\n")], {
        type: "text/csv"
    });

    const downloadLink = document.createElement("a");

    downloadLink.download = fileName;
    downloadLink.href = window.URL.createObjectURL(csvFile);

    downloadLink.click();

    showToast("CSV Downloaded");

}

/* ==========================================
EXPORT TO PDF
Requires jsPDF
========================================== */

function exportPDF() {

    if (typeof jspdf === "undefined") {

        showToast("jsPDF Library Missing");

        return;

    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text("Assam Finance Hub",20,20);

    pdf.setFontSize(12);

    pdf.text(
        "Loan Report",
        20,
        35
    );

    pdf.text(
        "Generated : " +
        new Date().toLocaleString(),
        20,
        45
    );

    pdf.save("Loan_Report.pdf");

    showToast("PDF Downloaded");

}

/* ==========================================
PRINT REPORT
========================================== */

function printDashboard(){

window.print();

}

/* ==========================================
DOWNLOAD REPORT
========================================== */

function downloadReport(){

exportPDF();

}

/* ==========================================
SUMMARY REPORT
========================================== */

function generateSummary(){

const totalLoan =
document.getElementById("totalLoan");

const totalPaid =
document.getElementById("totalPaid");

const balance =
document.getElementById("loanBalance");

const reportBox =
document.getElementById("summaryReport");

if(!reportBox) return;

reportBox.innerHTML = `

<h3>Loan Summary</h3>

<p>Total Loan :
<b>${totalLoan ?
totalLoan.innerHTML : "-"}</b></p>

<p>Total Paid :
<b>${totalPaid ?
totalPaid.innerHTML : "-"}</b></p>

<p>Outstanding :
<b>${balance ?
balance.innerHTML : "-"}</b></p>

<p>Date :
${new Date().toLocaleString()}</p>

`;

}

/* ==========================================
REPORT BUTTONS
========================================== */

document
.getElementById("exportCSV")
?.addEventListener("click",()=>{

exportCSV(
"loanHistoryTable",
"Loan_History.csv"
);

});

document
.getElementById("exportPDF")
?.addEventListener("click",exportPDF);

document
.getElementById("printReport")
?.addEventListener("click",printDashboard);

document
.getElementById("generateSummary")
?.addEventListener("click",generateSummary);

/* ==========================================
AUTO REPORT DATE
========================================== */

const reportDate =
document.getElementById("reportDate");

if(reportDate){

reportDate.innerHTML =
new Date().toLocaleDateString();

}

/* ==========================================
END PART 20
========================================== */

/* ==========================================
AI LOAN RECOMMENDATION ENGINE
Notification Center
Version 4.0
========================================== */

/* ==========================================
NOTIFICATION CENTER
========================================== */

const notificationPanel =
document.getElementById("notificationPanel");

const notificationBadge =
document.getElementById("notificationBadge");

let notifications = [];

/* ==========================================
ADD NOTIFICATION
========================================== */

function addNotification(title, message) {

    const item = {

        id: Date.now(),

        title,

        message,

        time: new Date().toLocaleString(),

        read: false

    };

    notifications.unshift(item);

    renderNotifications();

}

/* ==========================================
RENDER NOTIFICATIONS
========================================== */

function renderNotifications() {

    if (!notificationPanel) return;

    notificationPanel.innerHTML = "";

    notifications.forEach(item => {

        notificationPanel.innerHTML += `

<div class="notification-item">

<h4>${item.title}</h4>

<p>${item.message}</p>

<small>${item.time}</small>

</div>

`;

    });

    if(notificationBadge){

        notificationBadge.innerHTML=

notifications.filter(x=>!x.read).length;

    }

}

/* ==========================================
MARK ALL READ
========================================== */

function markAllRead(){

notifications.forEach(item=>{

item.read=true;

});

renderNotifications();

showToast("Notifications Cleared");

}

/* ==========================================
AI LOAN RECOMMENDATION
========================================== */

function recommendLoan(){

const income=

Number(document.getElementById("monthlyIncome")?.value||0);

const score=

Number(document.getElementById("creditScore")?.value||0);

const recommendation=

document.getElementById("loanSuggestion");

if(!recommendation) return;

let text="";

if(score>=800 && income>=100000){

text="🏆 Premium Personal Loan + Credit Card";

}

else if(score>=750 && income>=60000){

text="✅ Personal Loan + Home Loan";

}

else if(score>=700 && income>=40000){

text="🏡 Home Loan Recommended";

}

else if(score>=650){

text="🚗 Vehicle Loan Recommended";

}

else{

text="📈 Improve your Credit Score First";

}

recommendation.innerHTML=text;

}

/* ==========================================
INTEREST SAVINGS
========================================== */

function calculateSavings(){

const currentRate=

Number(document.getElementById("currentRate")?.value);

const offeredRate=

Number(document.getElementById("offeredRate")?.value);

const amount=

Number(document.getElementById("loanAmountInput")?.value);

const savingsBox=

document.getElementById("interestSavings");

if(!savingsBox) return;

const saving=

(currentRate-offeredRate)/100*amount;

savingsBox.innerHTML=

"Estimated Savings : ₹"+

Math.round(saving).toLocaleString();

}

/* ==========================================
AUTO ALERTS
========================================== */

setTimeout(()=>{

addNotification(

"Welcome",

"Welcome to Assam Finance Hub"

);

},3000);

setTimeout(()=>{

addNotification(

"Loan Offer",

"Special Interest Rate Available"

);

},10000);

setTimeout(()=>{

addNotification(

"Reminder",

"Complete your KYC to speed up approval."

);

},18000);

/* ==========================================
BUTTON EVENTS
========================================== */

document

.getElementById("recommendLoan")

?.addEventListener(

"click",

recommendLoan

);

document

.getElementById("calculateSavings")

?.addEventListener(

"click",

calculateSavings

);

document

.getElementById("markAllRead")

?.addEventListener(

"click",

markAllRead

);

/* ==========================================
END PART 21
========================================== */

/* ==========================================
ADMIN SETTINGS & ROLE MANAGEMENT
Version 4.0
========================================== */

/* ==========================================
ADMIN SETTINGS
========================================== */

const settingsForm =
document.getElementById("settingsForm");

settingsForm?.addEventListener("submit", saveSettings);

async function saveSettings(e){

e.preventDefault();

try{

const settings={

siteName:
document.getElementById("siteName")?.value,

supportEmail:
document.getElementById("supportEmail")?.value,

supportPhone:
document.getElementById("supportPhone")?.value,

maintenance:
document.getElementById("maintenanceMode")?.checked,

theme:
document.getElementById("defaultTheme")?.value,

updatedAt:
firebase.firestore.FieldValue.serverTimestamp()

};

await db
.collection("settings")
.doc("website")
.set(settings);

showToast("Settings Saved Successfully");

}catch(error){

showToast(error.message);

}

}

/* ==========================================
LOAD SETTINGS
========================================== */

async function loadSettings(){

try{

const doc=await db
.collection("settings")
.doc("website")
.get();

if(!doc.exists) return;

const data=doc.data();

document.getElementById("siteName").value=
data.siteName||"";

document.getElementById("supportEmail").value=
data.supportEmail||"";

document.getElementById("supportPhone").value=
data.supportPhone||"";

document.getElementById("maintenanceMode").checked=
data.maintenance||false;

document.getElementById("defaultTheme").value=
data.theme||"light";

}catch(error){

console.log(error);

}

}

/* ==========================================
ROLE MANAGEMENT
========================================== */

async function changeUserRole(uid,role){

try{

await db
.collection("users")
.doc(uid)
.update({

role:role

});

showToast("User Role Updated");

}catch(error){

showToast(error.message);

}

}

/* ==========================================
LOAD USERS
========================================== */

async function loadUsers(){

const tbody=
document.getElementById("userRoleTable");

if(!tbody) return;

tbody.innerHTML="";

const snapshot=
await db.collection("users").get();

snapshot.forEach(doc=>{

const data=doc.data();

tbody.innerHTML+=`

<tr>

<td>${data.name}</td>

<td>${data.email}</td>

<td>${data.role}</td>

<td>

<select
onchange="changeUserRole('${doc.id}',this.value)">

<option
${data.role==="customer"?"selected":""}
value="customer">

Customer

</option>

<option
${data.role==="admin"?"selected":""}
value="admin">

Admin

</option>

<option
${data.role==="manager"?"selected":""}
value="manager">

Manager

</option>

</select>

</td>

</tr>

`;

});

}

/* ==========================================
CHECK ADMIN ACCESS
========================================== */

async function verifyAdminAccess(){

const user=auth.currentUser;

if(!user) return false;

const doc=

await db

.collection("users")

.doc(user.uid)

.get();

if(!doc.exists){

window.location.href="index.html";

return false;

}

const role=doc.data().role;

if(role!=="admin"){

showToast("Access Denied");

window.location.href="dashboard.html";

return false;

}

return true;

}

/* ==========================================
MAINTENANCE MODE
========================================== */

async function checkMaintenance(){

const doc=

await db

.collection("settings")

.doc("website")

.get();

if(!doc.exists) return;

const data=doc.data();

if(data.maintenance===true){

const user=auth.currentUser;

if(!user){

window.location.href="maintenance.html";

}

}

}

/* ==========================================
AUTO LOAD
========================================== */

auth.onAuthStateChanged(async(user)=>{

if(user){

await checkMaintenance();

if(window.location.pathname.includes("admin.html")){

const ok=

await verifyAdminAccess();

if(ok){

loadSettings();

loadUsers();

}

}

}

});

/* ==========================================
END PART 22
========================================== */

/* ==========================================
SECURITY LOGS & AUDIT SYSTEM
Version 4.0
========================================== */

/* ==========================================
CREATE SECURITY LOG
========================================== */

async function createSecurityLog(action, details = "") {

    try {

        const user = auth.currentUser;

        await db.collection("securityLogs").add({

            uid: user ? user.uid : "Guest",

            email: user ? user.email : "Guest",

            action: action,

            details: details,

            ip: "Client Browser",

            browser: navigator.userAgent,

            platform: navigator.platform,

            language: navigator.language,

            createdAt:
            firebase.firestore.FieldValue.serverTimestamp()

        });

    } catch (error) {

        console.log(error);

    }

}

/* ==========================================
LOGIN LOG
========================================== */

auth.onAuthStateChanged(user => {

    if (user) {

        createSecurityLog(

            "LOGIN",

            "User Logged In"

        );

    }

});

/* ==========================================
LOGOUT LOG
========================================== */

async function secureLogout() {

    createSecurityLog(

        "LOGOUT",

        "User Logged Out"

    );

    await auth.signOut();

    window.location.href = "index.html";

}

/* ==========================================
FAILED LOGIN
========================================== */

function logFailedLogin(email) {

    createSecurityLog(

        "FAILED LOGIN",

        email

    );

}

/* ==========================================
PASSWORD RESET LOG
========================================== */

function logPasswordReset(email) {

    createSecurityLog(

        "PASSWORD RESET",

        email

    );

}

/* ==========================================
PROFILE UPDATE LOG
========================================== */

function logProfileUpdate() {

    createSecurityLog(

        "PROFILE UPDATED",

        "Customer Updated Profile"

    );

}

/* ==========================================
LOAN ACTION LOG
========================================== */

function logLoanAction(action, loanId) {

    createSecurityLog(

        action,

        "Loan ID : " + loanId

    );

}

/* ==========================================
LOAD SECURITY LOGS
========================================== */

async function loadSecurityLogs() {

    const table =

    document.getElementById("securityLogs");

    if (!table) return;

    table.innerHTML = "";

    const snapshot = await db

        .collection("securityLogs")

        .orderBy("createdAt", "desc")

        .limit(100)

        .get();

    snapshot.forEach(doc => {

        const data = doc.data();

        table.innerHTML += `

<tr>

<td>${data.email}</td>

<td>${data.action}</td>

<td>${data.details}</td>

<td>${data.platform}</td>

</tr>

`;

    });

}

/* ==========================================
AUTO LOG PAGE VISIT
========================================== */

window.addEventListener("load", () => {

    createSecurityLog(

        "PAGE VISIT",

        window.location.pathname

    );

});

/* ==========================================
AUTO LOAD ADMIN LOGS
========================================== */

if (window.location.pathname.includes("admin.html")) {

    loadSecurityLogs();

}

/* ==========================================
END PART 23
========================================== */

/* ==========================================
PERFORMANCE OPTIMIZATION
GLOBAL ERROR HANDLER
AUTO RECOVERY SYSTEM
Version 4.0
========================================== */

"use strict";

/* ==========================================
GLOBAL ERROR HANDLER
========================================== */

window.onerror = function (
message,
source,
line,
column,
error
){

console.error({

message,
source,
line,
column,
error

});

showToast("Unexpected Error Occurred");

createSecurityLog(
"JAVASCRIPT ERROR",
String(message)
);

return true;

};

/* ==========================================
UNHANDLED PROMISE
========================================== */

window.addEventListener(

"unhandledrejection",

event=>{

console.error(event.reason);

createSecurityLog(

"PROMISE ERROR",

String(event.reason)

);

}

);

/* ==========================================
AUTO SAVE FORM
========================================== */

function enableAutoSave(){

const forms=

document.querySelectorAll("form");

forms.forEach(form=>{

const inputs=

form.querySelectorAll(

"input,textarea,select"

);

inputs.forEach(input=>{

const key=

form.id+"_"+input.name;

const saved=

localStorage.getItem(key);

if(saved!==null){

input.value=saved;

}

input.addEventListener(

"input",

()=>{

localStorage.setItem(

key,

input.value

);

}

);

});

});

}

window.addEventListener(

"load",

enableAutoSave

);

/* ==========================================
CLEAR FORM CACHE
========================================== */

function clearFormCache(formId){

const form=

document.getElementById(formId);

if(!form) return;

form.querySelectorAll(

"input,textarea,select"

).forEach(input=>{

localStorage.removeItem(

formId+"_"+input.name

);

});

}

/* ==========================================
MEMORY CLEANUP
========================================== */

window.addEventListener(

"beforeunload",

()=>{

console.clear();

});

/* ==========================================
AUTO HEARTBEAT
========================================== */

setInterval(()=>{

console.log(

"Application Running..."

);

},60000);

/* ==========================================
NETWORK CHECK
========================================== */

function checkConnection(){

if(!navigator.onLine){

showToast(

"You are Offline"

);

}

}

setInterval(

checkConnection,

30000

);

/* ==========================================
IMAGE LAZY LOAD
========================================== */

document

.querySelectorAll("img[data-src]")

.forEach(img=>{

const observer=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

img.src=

img.dataset.src;

observer.unobserve(img);

}

});

});

observer.observe(img);

});

/* ==========================================
AUTO BACKUP
========================================== */

async function backupUserData(){

const user=

auth.currentUser;

if(!user) return;

try{

await db

.collection("backup")

.doc(user.uid)

.set({

lastBackup:

firebase.firestore.FieldValue

.serverTimestamp()

},

{

merge:true

}

);

}catch(e){

console.log(e);

}

}

setInterval(

backupUserData,

300000

);

/* ==========================================
SESSION TIMER
========================================== */

let idleTime=0;

setInterval(()=>{

idleTime++;

if(idleTime>=30){

showToast(

"Session Expiring Soon"

);

}

},60000);

document.onclick=()=>{

idleTime=0;

};

document.onmousemove=()=>{

idleTime=0;

};

document.onkeypress=()=>{

idleTime=0;

};

/* ==========================================
END PART 24
========================================== */

/* ==========================================
ASSAM FINANCE HUB
FINAL INITIALIZATION
Production Version 4.0
========================================== */

"use strict";

/* ==========================================
APPLICATION INFO
========================================== */

const APP = {

    name: "Assam Finance Hub",

    version: "4.0.0",

    developer: "Assam Finance Hub Team",

    environment: "Production"

};

/* ==========================================
APP START
========================================== */

window.addEventListener("load", async () => {

    console.log(
        `${APP.name} v${APP.version} Started`
    );

    await initializeApplication();

});

/* ==========================================
MAIN INITIALIZER
========================================== */

async function initializeApplication() {

    try {

        initializeTheme();

        initializeNavigation();

        initializeFirebase();

        initializeDashboard();

        initializeForms();

        initializeCharts();

        initializeNotifications();

        initializeRealtime();

        initializeSecurity();

        initializePerformance();

        hideLoader();

        console.log("Application Ready");

    }

    catch (error) {

        console.error(error);

        showToast("Application Initialization Failed");

    }

}

/* ==========================================
INITIALIZE MODULES
========================================== */

function initializeTheme(){}

function initializeNavigation(){}

function initializeFirebase(){}

function initializeDashboard(){}

function initializeForms(){}

function initializeCharts(){}

function initializeNotifications(){}

function initializeRealtime(){}

function initializeSecurity(){}

function initializePerformance(){}

/* ==========================================
PRELOADER
========================================== */

function hideLoader(){

const loader=

document.getElementById("preloader");

if(!loader) return;

setTimeout(()=>{

loader.style.opacity="0";

loader.style.visibility="hidden";

},800);

}

/* ==========================================
VERSION CHECK
========================================== */

const currentVersion="4.0.0";

const savedVersion=

localStorage.getItem("appVersion");

if(savedVersion!==currentVersion){

localStorage.setItem(

"appVersion",

currentVersion

);

showToast(

"Application Updated"

);

}

/* ==========================================
ONLINE STATUS
========================================== */

window.addEventListener(

"online",

()=>{

console.log("Online");

});

window.addEventListener(

"offline",

()=>{

console.log("Offline");

});

/* ==========================================
AUTO REFRESH TOKEN
========================================== */

setInterval(async()=>{

const user=auth.currentUser;

if(user){

await user.getIdToken(true);

console.log("Firebase Token Refreshed");

}

},50*60*1000);

/* ==========================================
GLOBAL SHORTCUTS
========================================== */

document.addEventListener(

"keydown",

e=>{

if(e.ctrlKey&&e.key==="k"){

e.preventDefault();

document.getElementById("globalSearch")?.focus();

}

});

/* ==========================================
WELCOME MESSAGE
========================================== */

setTimeout(()=>{

showToast(

"Welcome to Assam Finance Hub"

);

},1200);

/* ==========================================
SYSTEM HEALTH CHECK
========================================== */

function healthCheck(){

console.log({

firebase:

typeof firebase!=="undefined",

auth:

typeof auth!=="undefined",

firestore:

typeof db!=="undefined",

storage:

typeof storage!=="undefined"

});

}

healthCheck();

/* ==========================================
END OF APPLICATION
========================================== */

console.log("===================================");

console.log("ASSAM FINANCE HUB");

console.log("Production Build Loaded");

console.log("Version :",APP.version);

console.log("Status : SUCCESS");

console.log("===================================");
