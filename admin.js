import { db, auth } from "./firebase.js";

import {
collection,
getDocs,
doc,
updateDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ==========================================
   DOM
========================================== */

const applicationsContainer =
document.getElementById("applicationsContainer");

const totalCount =
document.getElementById("totalCount");

const pendingCount =
document.getElementById("pendingCount");

const approvedCount =
document.getElementById("approvedCount");

const rejectedCount =
document.getElementById("rejectedCount");

const loader =
document.getElementById("adminLoader");

const refreshBtn =
document.getElementById("refreshBtn");

const logoutBtn =
document.getElementById("logoutBtn");

let applications=[];

/* ==========================================
   AUTH CHECK
========================================== */

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";

return;

}

loadApplications();

});

/* ==========================================
   REFRESH
========================================== */

refreshBtn.addEventListener("click",()=>{

loadApplications();

});

/* ==========================================
   LOGOUT
========================================== */

logoutBtn.addEventListener("click",async()=>{

if(confirm("Logout now?")){

await signOut(auth);

window.location.href="login.html";

}

});

/* ==========================================
   LOAD APPLICATIONS
========================================== */

async function loadApplications(){

loader.style.display="flex";

applications=[];

applicationsContainer.innerHTML="";

try{

const snapshot=await getDocs(collection(db,"applications"));

snapshot.forEach((docSnap)=>{

applications.push({

id:docSnap.id,

...docSnap.data()

});

});

updateDashboard();

renderApplications(applications);

}catch(error){

console.error(error);

alert("Failed to load applications.");

}

loader.style.display="none";

}

/* ==========================================
   DASHBOARD COUNTS
========================================== */

function updateDashboard(){

const total=applications.length;

const pending=applications.filter(

app=>app.status==="Pending"

).length;

const approved=applications.filter(

app=>app.status==="Approved"

).length;

const rejected=applications.filter(

app=>app.status==="Rejected"

).length;

totalCount.innerText=total;

pendingCount.innerText=pending;

approvedCount.innerText=approved;

rejectedCount.innerText=rejected;

}

/* ==========================================
   RENDER APPLICATIONS
========================================== */

function renderApplications(data){

applicationsContainer.innerHTML="";

if(data.length===0){

applicationsContainer.innerHTML=`
<div class="card">
<h3>No Applications Found</h3>
<p>No loan applications available.</p>
</div>
`;

return;

}

data.forEach(app=>{

const statusClass=(app.status||"Pending").toLowerCase();

const card=document.createElement("div");

card.className="application-card";

card.innerHTML=`

<h3>${app.name || "-"}</h3>

<p><strong>Mobile:</strong> ${app.mobile || "-"}</p>

<p><strong>Bike:</strong> ${app.bike || "-"}</p>

<p><strong>Loan Amount:</strong> ₹${app.amount || "-"}</p>

<p>
<strong>Status:</strong>
<span class="badge ${statusClass}">
${app.status || "Pending"}
</span>
</p>

<div class="card-actions">

<button class="btn"
onclick="viewApplication('${app.id}')">

View

</button>

<button class="btn"
onclick="changeStatus('${app.id}','Approved')">

Approve

</button>

<button class="btn"
onclick="changeStatus('${app.id}','Rejected')">

Reject

</button>

<button class="btn"
onclick="deleteApplication('${app.id}')">

Delete

</button>

</div>

`;

applicationsContainer.appendChild(card);

});

}

/* ==========================================
   VIEW DETAILS
========================================== */

window.viewApplication=function(id){

const app=applications.find(a=>a.id===id);

if(!app) return;

const modal=document.getElementById("detailsModal");

const body=document.getElementById("modalBody");

body.innerHTML=`

<p><strong>Name:</strong> ${app.name||"-"}</p>

<p><strong>Mobile:</strong> ${app.mobile||"-"}</p>

<p><strong>Email:</strong> ${app.email||"-"}</p>

<p><strong>City:</strong> ${app.city||"-"}</p>

<p><strong>Bike:</strong> ${app.bike||"-"}</p>

<p><strong>Bike Model:</strong> ${app.bikeModel||"-"}</p>

<p><strong>Loan Amount:</strong> ₹${app.amount||"-"}</p>

<p><strong>Income:</strong> ${app.income||"-"}</p>

<p><strong>Aadhaar:</strong> ${app.aadhaar||"-"}</p>

<p><strong>PAN:</strong> ${app.pan||"-"}</p>

<p><strong>Address:</strong> ${app.address||"-"}</p>

<p><strong>Status:</strong> ${app.status||"Pending"}</p>

`;

modal.style.display="flex";

};

document.getElementById("closeModal").onclick=()=>{

document.getElementById("detailsModal").style.display="none";

};

/* ==========================================
   CHANGE APPLICATION STATUS
========================================== */

window.changeStatus = async function(id, status){

const confirmMsg =
status === "Approved"
? "Approve this application?"
: "Reject this application?";

if(!confirm(confirmMsg)) return;

try{

await updateDoc(

doc(db,"applications",id),

{
status: status
}

);

alert("Application " + status + " successfully.");

loadApplications();

}catch(error){

console.error(error);

alert("Failed to update application.");

}

};

/* ==========================================
   DELETE APPLICATION
========================================== */

window.deleteApplication = async function(id){

if(!confirm("Delete this application permanently?")){

return;

}

try{

await deleteDoc(

doc(db,"applications",id)

);

alert("Application deleted successfully.");

loadApplications();

}catch(error){

console.error(error);

alert("Failed to delete application.");

}

};

/* ==========================================
   CLOSE MODAL
========================================== */

window.addEventListener("click",(e)=>{

const modal=document.getElementById("detailsModal");

if(e.target===modal){

modal.style.display="none";

}

});

/* ==========================================
   ESC KEY CLOSE MODAL
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

document.getElementById("detailsModal").style.display="none";

}

});

/* ==========================================
   LIVE SEARCH
========================================== */

const searchInput=document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const keyword=searchInput.value.toLowerCase().trim();

const filtered=applications.filter(app=>{

const name=(app.name||"").toLowerCase();

const mobile=(app.mobile||"").toLowerCase();

return name.includes(keyword)||mobile.includes(keyword);

});

renderApplications(filtered);

});

}

/* ==========================================
   STATUS FILTER
========================================== */

const statusFilter=document.getElementById("statusFilter");

if(statusFilter){

statusFilter.addEventListener("change",()=>{

const value=statusFilter.value;

if(value==="all"){

renderApplications(applications);

return;

}

const filtered=applications.filter(app=>app.status===value);

renderApplications(filtered);

});

}

/* ==========================================
   PRINT APPLICATIONS
========================================== */

const printBtn=document.getElementById("printBtn");

if(printBtn){

printBtn.addEventListener("click",()=>{

window.print();

});

}

/* ==========================================
   EXPORT CSV
========================================== */

const exportBtn=document.getElementById("exportBtn");

if(exportBtn){

exportBtn.addEventListener("click",()=>{

if(applications.length===0){

alert("No applications found.");

return;

}

let csv="Name,Mobile,Email,City,Bike,Loan Amount,Status\n";

applications.forEach(app=>{

csv+=`"${app.name||""}","${app.mobile||""}","${app.email||""}","${app.city||""}","${app.bike||""}","${app.amount||""}","${app.status||""}"\n`;

});

const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});

const url=URL.createObjectURL(blob);

const link=document.createElement("a");

link.href=url;

link.download="Loan_Applications.csv";

link.click();

URL.revokeObjectURL(url);

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
   HIDE LOADER
========================================== */

function hideLoader(){

if(loader){

loader.style.display="none";

}

}

/* ==========================================
   AUTO REFRESH EVERY 60 SECONDS
========================================== */

setInterval(()=>{

loadApplications();

},60000);

/* ==========================================
   WINDOW LOAD
========================================== */

window.addEventListener("load",()=>{

hideLoader();

showToast("Welcome Admin");

});

/* ==========================================
   ERROR HANDLER
========================================== */

window.addEventListener("error",(e)=>{

console.error(e.message);

});

/* ==========================================
   PAGE TITLE
========================================== */

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

document.title="Admin Dashboard";

}else{

document.title="Assam Finance Hub Admin";

}

});

/* ==========================================
   VERSION
========================================== */

const ADMIN_VERSION="1.0.0";

console.log("Admin Dashboard Version:",ADMIN_VERSION);

/* ==========================================
   END OF ADMIN.JS
========================================== */
