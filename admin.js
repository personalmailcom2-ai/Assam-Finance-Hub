import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnQFG-tdce0gxxfEhIYdpr6BJDcQgbW",
  authDomain: "assam-finance-hub.firebaseapp.com",
  projectId: "assam-finance-hub",
  storageBucket: "assam-finance-hub.firebasestorage.app",
  messagingSenderId: "989678663450",
  appId: "1:989678663450:web:d0499bf58d8dd382325ea3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const list = document.getElementById("list");
const search = document.getElementById("search");

let applications = [];

async function loadApplications() {
    const snap = await getDocs(collection(db, "applications"));

    applications = [];

    snap.forEach(docSnap => {
        applications.push({
            id: docSnap.id,
            ...docSnap.data()
        });
    });

    render(applications);
}

function render(data) {

    list.innerHTML = "";

    let total = data.length;
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    data.forEach(x => {

        if (x.status === "Pending") pending++;
        if (x.status === "Approved") approved++;
        if (x.status === "Rejected") rejected++;

        list.innerHTML += `
        <div class="card">
            <h3>${x.name || ""}</h3>
            <p><b>Mobile:</b> ${x.mobile}</p>
            <p><b>Bike:</b> ${x.bike}</p>
            <p><b>City:</b> ${x.city}</p>
            <p><b>Status:</b> ${x.status}</p>

            <button class="approve" onclick="approve('${x.id}')">Approve</button>

            <button class="reject" onclick="reject('${x.id}')">Reject</button>

            <button class="delete" onclick="removeApp('${x.id}')">Delete</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("pending").innerText = pending;
    document.getElementById("approved").innerText = approved;
    document.getElementById("rejected").innerText = rejected;
}

window.approve = async(id)=>{
    await updateDoc(doc(db,"applications",id),{
        status:"Approved"
    });
    loadApplications();
}

window.reject = async(id)=>{
    await updateDoc(doc(db,"applications",id),{
        status:"Rejected"
    });
    loadApplications();
}

window.removeApp = async(id)=>{
    if(confirm("Delete this application?")){
        await deleteDoc(doc(db,"applications",id));
        loadApplications();
    }
}

search.onkeyup = ()=>{

    const value = search.value.toLowerCase();

    const result = applications.filter(x =>
        (x.mobile || "").includes(value) ||
        (x.name || "").toLowerCase().includes(value)
    );

    render(result);
}

loadApplications();
