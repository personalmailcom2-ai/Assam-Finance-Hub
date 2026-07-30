import { db } from "./firebase.js";

import {
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================================
   DOM
========================================== */

const mobileInput = document.getElementById("statusMobile");
const checkBtn = document.getElementById("checkStatusBtn");
const result = document.getElementById("statusResult");

/* ==========================================
   CHECK STATUS
========================================== */

checkBtn.addEventListener("click", async () => {

const mobile = mobileInput.value.trim();

if(!/^[6-9]\d{9}$/.test(mobile)){

alert("Please enter a valid 10-digit mobile number.");

return;

}

result.innerHTML="<p>Checking application status...</p>";

try{

const q = query(
collection(db,"applications"),
where("mobile","==",mobile)
);

const snapshot = await getDocs(q);

if(snapshot.empty){

result.innerHTML=`
<div class="status-card">
<h3>No Application Found</h3>
<p>No application is registered with this mobile number.</p>
</div>
`;

return;

}

snapshot.forEach(doc=>{

const app=doc.data();

let statusClass="status-pending";

if(app.status==="Approved") statusClass="status-approved";

if(app.status==="Rejected") statusClass="status-rejected";

result.innerHTML=`

<div class="status-card">

<h3>Application Found</h3>

<p><strong>Name:</strong> ${app.name}</p>

<p><strong>Bike:</strong> ${app.bike}</p>

<p><strong>Loan Amount:</strong> ₹${app.amount}</p>

<p>

<strong>Status:</strong>

<span class="${statusClass}">

${app.status}

</span>

</p>

</div>

`;

});

}catch(error){

console.error(error);

result.innerHTML=`
<div class="status-card">
<h3>Error</h3>
<p>Unable to fetch application status. Please try again later.</p>
</div>
`;

}

});

/* ==========================================
   ENTER KEY SUPPORT
========================================== */

mobileInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

checkBtn.click();

}

});

/* ==========================================
   ONLY NUMBERS ALLOWED
========================================== */

mobileInput.addEventListener("input",()=>{

mobileInput.value = mobileInput.value
.replace(/\D/g,"")
.slice(0,10);

});

/* ==========================================
   AUTO FOCUS
========================================== */

window.addEventListener("load",()=>{

mobileInput.focus();

});

/* ==========================================
   CLEAR RESULT WHEN INPUT CHANGES
========================================== */

mobileInput.addEventListener("input",()=>{

result.innerHTML="";

});

/* ==========================================
   VERSION
========================================== */

const STATUS_VERSION="1.0.0";

console.log("Status Page Version:",STATUS_VERSION);

/* ==========================================
   END OF STATUS.JS
========================================== */
