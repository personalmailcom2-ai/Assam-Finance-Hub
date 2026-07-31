/* ==========================================
firebase.js
Assam Finance Hub
Part 1/5
========================================== */

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// Firebase Config
const firebaseConfig = {

apiKey: "AIzaSyAnQPG-tdceOqxxfEzHIYdpr6pBJDcOgbM",

authDomain: "assam-finance-hub.firebaseapp.com",

projectId: "assam-finance-hub",

storageBucket: "assam-finance-hub.firebasestorage.app",

messagingSenderId: "989678663450",

appId: "1:989678663450:web:d0499bf58d8dd382325ea3",

measurementId: "G-H1SX3EDQJM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics
const analytics = getAnalytics(app);

// Export
export { app, analytics };

console.log("Firebase Initialized Successfully");

/* ==========================================
firebase.js
Assam Finance Hub
Part 2/5
Firebase Services
========================================== */

import { app } from "./firebase.js";

import {
getAuth,
GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

import {
getMessaging,
isSupported
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

// ==========================================
// AUTHENTICATION
// ==========================================

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

// ==========================================
// FIRESTORE
// ==========================================

const db = getFirestore(app);

// ==========================================
// STORAGE
// ==========================================

const storage = getStorage(app);

// ==========================================
// FIREBASE MESSAGING
// ==========================================

let messaging = null;

(async()=>{

try{

const supported = await isSupported();

if(supported){

messaging = getMessaging(app);

console.log("Firebase Messaging Ready");

}else{

console.log("Messaging not supported.");

}

}catch(error){

console.error(error);

}

})();

// ==========================================
// EXPORT
// ==========================================

export {

auth,

googleProvider,

db,

storage,

messaging

};

console.log("Firebase Services Loaded");

/* ==========================================
firebase.js
Assam Finance Hub
Part 3/5
Firestore Helper Functions
========================================== */

import {

db

} from "./firebase.js";

import {

collection,
doc,
addDoc,
getDoc,
getDocs,
updateDoc,
deleteDoc,
query,
where,
orderBy,
limit,
serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ==========================================
// COLLECTION REFERENCES
// ==========================================

const usersRef = collection(db,"users");
const loansRef = collection(db,"loanApplications");
const transactionsRef = collection(db,"transactions");

// ==========================================
// ADD DOCUMENT
// ==========================================

export async function addDocument(ref,data){

return await addDoc(ref,{

...data,

createdAt:serverTimestamp()

});

}

// ==========================================
// GET DOCUMENT
// ==========================================

export async function getDocument(ref,id){

const snapshot = await getDoc(doc(ref,id));

return snapshot.exists()

?{

id:snapshot.id,

...snapshot.data()

}

:null;

}

// ==========================================
// GET ALL DOCUMENTS
// ==========================================

export async function getAllDocuments(ref){

const snapshot = await getDocs(ref);

return snapshot.docs.map(item=>({

id:item.id,

...item.data()

}));

}

// ==========================================
// UPDATE DOCUMENT
// ==========================================

export async function updateDocument(ref,id,data){

return await updateDoc(

doc(ref,id),

{

...data,

updatedAt:serverTimestamp()

}

);

}

// ==========================================
// DELETE DOCUMENT
// ==========================================

export async function deleteDocument(ref,id){

return await deleteDoc(

doc(ref,id)

);

}

// ==========================================
// SEARCH DOCUMENTS
// ==========================================

export async function searchDocuments(

ref,
field,
value

){

const q = query(

ref,

where(field,"==",value)

);

const snapshot = await getDocs(q);

return snapshot.docs.map(item=>({

id:item.id,

...item.data()

}));

}

// ==========================================
// GET LATEST DOCUMENTS
// ==========================================

export async function latestDocuments(

ref,

count=10

){

const q=query(

ref,

orderBy("createdAt","desc"),

limit(count)

);

const snapshot=await getDocs(q);

return snapshot.docs.map(item=>({

id:item.id,

...item.data()

}));

}

// ==========================================
// EXPORT COLLECTIONS
// ==========================================

export{

usersRef,

loansRef,

transactionsRef

};

console.log("Firestore Helpers Loaded");

/* ==========================================
firebase.js
Assam Finance Hub
Part 4/5
Authentication Helpers
========================================== */

import {

auth,
googleProvider

} from "./firebase.js";

import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signInWithPopup,
sendPasswordResetEmail,
signOut,
onAuthStateChanged,
updateProfile

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// ==========================================
// REGISTER
// ==========================================

export async function registerUser(

email,
password,
displayName=""

){

const credential =

await createUserWithEmailAndPassword(

auth,
email,
password

);

if(displayName){

await updateProfile(

credential.user,

{

displayName

}

);

}

return credential.user;

}

// ==========================================
// LOGIN
// ==========================================

export async function loginUser(

email,
password

){

const credential=

await signInWithEmailAndPassword(

auth,
email,
password

);

return credential.user;

}

// ==========================================
// GOOGLE LOGIN
// ==========================================

export async function googleLogin(){

const credential=

await signInWithPopup(

auth,
googleProvider

);

return credential.user;

}

// ==========================================
// PASSWORD RESET
// ==========================================

export async function resetPassword(

email

){

return await sendPasswordResetEmail(

auth,

email

);

}

// ==========================================
// LOGOUT
// ==========================================

export async function logoutUser(){

return await signOut(auth);

}

// ==========================================
// CURRENT USER
// ==========================================

export function currentUser(){

return auth.currentUser;

}

// ==========================================
// AUTH STATE
// ==========================================

export function authListener(callback){

return onAuthStateChanged(

auth,

(user)=>{

callback(user);

}

);

}

console.log("Authentication Helpers Loaded");

/* ==========================================
firebase.js
Assam Finance Hub
Part 5/5
Storage, Messaging & Utilities
========================================== */

import {

storage,
messaging

} from "./firebase.js";

import {

ref,
uploadBytes,
getDownloadURL,
deleteObject

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

import {

getToken,
onMessage

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js";

// ==========================================
// STORAGE HELPERS
// ==========================================

export async function uploadFile(path,file){

const storageRef = ref(storage,path);

await uploadBytes(storageRef,file);

return await getDownloadURL(storageRef);

}

export async function removeFile(path){

const storageRef = ref(storage,path);

return await deleteObject(storageRef);

}

// ==========================================
// FCM TOKEN
// ==========================================

export async function getFCMDeviceToken(vapidKey){

if(!messaging) return null;

try{

const token = await getToken(

messaging,

{

vapidKey

}

);

return token;

}catch(error){

console.error(error);

return null;

}

}

// ==========================================
// FOREGROUND MESSAGE
// ==========================================

export function listenNotifications(callback){

if(!messaging) return;

onMessage(

messaging,

(payload)=>{

callback(payload);

}

);

}

// ==========================================
// APP INFO
// ==========================================

export const APP_INFO={

name:"Assam Finance Hub",

version:"1.0.0",

firebase:"10.13.2"

};

// ==========================================
// FIREBASE READY
// ==========================================

export function firebaseReady(){

console.log(

`${APP_INFO.name} Firebase Ready`

);

return true;

}

firebaseReady();
