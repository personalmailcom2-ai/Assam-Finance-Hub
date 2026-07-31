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

