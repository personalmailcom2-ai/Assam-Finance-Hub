import { app } from "./firebase.js";

import {
getFirestore,
collection,
getDocs,
doc,
updateDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

const list = document.getElementById("list");
const searchBox = document.getElementById("searchBox");

let applications = [];

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="admin-login.html";
return;

}

loadApplications();

});

async function loadApplications(){

const snapshot = await getDocs(collection(db,"applications"));

applications = snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

renderApplications();

}

function renderApplications(){

const search = searchBox.value.toLowerCase();

let total = 0;
let pending = 0;
let approved = 0;
let rejected = 0;

list.innerHTML = "";

applications.forEach((item)=>{

const name = (item.name || "").toLowerCase();
const mobile = (item.mobile || "").toLowerCase();

if(
!name.includes(search) &&
!mobile.includes(search)
){
return;
}

total++;

if(item.status === "Approved"){

approved++;

}else if(item.status === "Rejected"){

rejected++;

}else{

pending++;

}

list.innerHTML += `

<div class="card">

<h3>${item.name || ""}</h3>

<p><b>Mobile:</b> ${item.mobile || ""}</p>

<p><b>Bike:</b> ${item.bike || ""}</p>

<p><b>City:</b> ${item.city || ""}</p>

<p><b>Status:</b> ${item.status || "Pending"}</p>

<button onclick="changeStatus('${item.id}','Approved')">
Approve
</button>

<button onclick="changeStatus('${item.id}','Rejected')">
Reject
</button>

<button onclick="deleteApplication('${item.id}')">
Delete
</button>

</div>

`;

});

document.getElementById("totalCount").innerText = total;
document.getElementById("pendingCount").innerText = pending;
document.getElementById("approvedCount").innerText = approved;
document.getElementById("rejectedCount").innerText = rejected;

if(total === 0){

list.innerHTML = "<h3>No Applications Found</h3>";

}

}

searchBox.addEventListener("input", renderApplications);

window.changeStatus = async(id,status)=>{

try{

await updateDoc(

doc(db,"applications",id),

{

status:status

}

);

await loadApplications();

alert("Status Updated Successfully");

}catch(err){

console.error(err);

alert(err.message);

}

};

window.deleteApplication = async(id)=>{

const ok = confirm("Delete this application?");

if(!ok) return;

try{

await deleteDoc(

doc(db,"applications",id)

);

await loadApplications();

alert("Application Deleted Successfully");

}catch(err){

console.error(err);

alert(err.message);

}

};

/* ==========================
   LOGOUT
========================== */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click", async()=>{

const ok = confirm("Do you want to logout?");

if(!ok) return;

try{

await signOut(auth);

window.location.href = "admin-login.html";

}catch(err){

console.error(err);

alert(err.message);

}

});

}

/* ==========================
   AUTO REFRESH
========================== */

setInterval(()=>{

if(auth.currentUser){

loadApplications();

}

},30000);

/* ==========================
   APP READY
========================== */

console.log("Admin Dashboard Loaded Successfully");
