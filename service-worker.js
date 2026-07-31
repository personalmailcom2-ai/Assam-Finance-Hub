/* ==========================================
service-worker.js
Assam Finance Hub
Part 1/5
========================================== */

// ==========================================
// CACHE NAME
// ==========================================

const CACHE_NAME = "assam-finance-hub-v1";

// ==========================================
// FILES TO CACHE
// ==========================================

const STATIC_FILES = [

"/",

"/index.html",

"/login.html",

"/register.html",

"/dashboard.html",

"/admin.html",

"/assets/css/style.css",

"/assets/js/app.js",

"/assets/js/firebase.js",

"/assets/images/logo.png",

"/manifest.json"

];

// ==========================================
// INSTALL
// ==========================================

self.addEventListener("install",(event)=>{

console.log("Service Worker Installing...");

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>{

console.log("Caching Static Files...");

return cache.addAll(STATIC_FILES);

})

);

self.skipWaiting();

});

// ==========================================
// ACTIVATE
// ==========================================

self.addEventListener("activate",(event)=>{

console.log("Service Worker Activated");

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

console.log("Deleting Old Cache:",key);

return caches.delete(key);

}

})

);

})

);

self.clients.claim();

});

// ==========================================
// READY
// ==========================================

console.log("Service Worker Part 1 Loaded");

/* ==========================================
service-worker.js
Assam Finance Hub
Part 2/5
Fetch Strategy
========================================== */

// ==========================================
// DYNAMIC CACHE
// ==========================================

const DYNAMIC_CACHE = "assam-finance-hub-dynamic-v1";

// ==========================================
// FETCH EVENT
// ==========================================

self.addEventListener("fetch",(event)=>{

if(event.request.method!=="GET") return;

event.respondWith(cacheFirst(event.request));

});

// ==========================================
// CACHE FIRST STRATEGY
// ==========================================

async function cacheFirst(request){

const cachedResponse = await caches.match(request);

if(cachedResponse){

return cachedResponse;

}

try{

const networkResponse = await fetch(request);

const cache = await caches.open(DYNAMIC_CACHE);

cache.put(request,networkResponse.clone());

return networkResponse;

}catch(error){

return offlineFallback(request);

}

}

// ==========================================
// OFFLINE FALLBACK
// ==========================================

async function offlineFallback(request){

if(request.destination==="document"){

const page = await caches.match("/offline.html");

if(page){

return page;

}

}

if(request.destination==="image"){

const image = await caches.match("/assets/images/logo.png");

if(image){

return image;

}

}

return new Response(

"Offline. Please check your internet connection.",

{

status:503,

headers:{

"Content-Type":"text/plain"

}

}

);

}

// ==========================================
// CACHE CLEANUP
// ==========================================

async function cleanupDynamicCache(){

const cache = await caches.open(DYNAMIC_CACHE);

const keys = await cache.keys();

const MAX_ITEMS = 50;

if(keys.length>MAX_ITEMS){

await cache.delete(keys[0]);

}

}

// ==========================================
// FETCH LOG
// ==========================================

console.log("Service Worker Fetch Ready");

/* ==========================================
service-worker.js
Assam Finance Hub
Part 3/5
Push Notifications & Background Sync
========================================== */

// ==========================================
// BACKGROUND SYNC
// ==========================================

self.addEventListener("sync",(event)=>{

console.log("Background Sync:",event.tag);

if(event.tag==="sync-pending-data"){

event.waitUntil(syncPendingData());

}

});

// ==========================================
// SYNC FUNCTION
// ==========================================

async function syncPendingData(){

console.log("Synchronizing pending data...");

// TODO:
// Upload offline data to Firestore/API.

return Promise.resolve();

}

// ==========================================
// PUSH NOTIFICATION
// ==========================================

self.addEventListener("push",(event)=>{

let data={

title:"Assam Finance Hub",

body:"You have a new notification.",

icon:"/assets/images/logo.png",

badge:"/assets/images/logo.png"

};

if(event.data){

try{

data=event.data.json();

}catch(error){

console.error(error);

}

}

event.waitUntil(

self.registration.showNotification(

data.title,

{

body:data.body,

icon:data.icon,

badge:data.badge,

vibrate:[200,100,200],

data:data.url || "/"

}

)

);

});

// ==========================================
// NOTIFICATION CLICK
// ==========================================

self.addEventListener("notificationclick",(event)=>{

event.notification.close();

event.waitUntil(

clients.openWindow(

event.notification.data || "/"

)

);

});

// ==========================================
// MESSAGE FROM APP
// ==========================================

self.addEventListener("message",(event)=>{

console.log("Message Received:",event.data);

if(event.data==="skipWaiting"){

self.skipWaiting();

}

});

// ==========================================
// PERIODIC SYNC
// ==========================================

self.addEventListener("periodicsync",(event)=>{

if(event.tag==="daily-update"){

event.waitUntil(updateAppData());

}

});

async function updateAppData(){

console.log("Updating application data...");

// TODO:
// Fetch latest updates from backend.

return Promise.resolve();

}

// ==========================================
// READY
// ==========================================

console.log("Service Worker Part 3 Loaded");

/* ==========================================
service-worker.js
Assam Finance Hub
Part 4/5
Advanced Cache Management
========================================== */

// ==========================================
// API CACHE
// ==========================================

const API_CACHE = "assam-finance-api-v1";

// ==========================================
// API CACHE FUNCTION
// ==========================================

async function networkFirst(request){

const cache = await caches.open(API_CACHE);

try{

const networkResponse = await fetch(request);

cache.put(request,networkResponse.clone());

return networkResponse;

}catch(error){

const cachedResponse = await cache.match(request);

if(cachedResponse){

return cachedResponse;

}

return new Response(

JSON.stringify({

success:false,

message:"Offline"

}),

{

status:503,

headers:{

"Content-Type":"application/json"

}

}

);

}

}

// ==========================================
// API REQUEST
// ==========================================

self.addEventListener("fetch",(event)=>{

const url = new URL(event.request.url);

if(

url.pathname.startsWith("/api/")

){

event.respondWith(

networkFirst(event.request)

);

}

});

// ==========================================
// CACHE SIZE LIMIT
// ==========================================

async function trimCache(cacheName,maxItems){

const cache = await caches.open(cacheName);

const keys = await cache.keys();

if(keys.length>maxItems){

await cache.delete(keys[0]);

return trimCache(cacheName,maxItems);

}

}

// ==========================================
// CLEAN CACHE
// ==========================================

async function cleanCaches(){

await trimCache(API_CACHE,50);

await trimCache("assam-finance-hub-dynamic-v1",100);

}

setInterval(()=>{

cleanCaches();

},60000);

// ==========================================
// UPDATE CACHE VERSION
// ==========================================

async function updateStaticCache(files){

const cache = await caches.open("assam-finance-hub-v2");

await cache.addAll(files);

}

// ==========================================
// APP PERFORMANCE
// ==========================================

self.addEventListener("fetch",(event)=>{

const start = Date.now();

event.respondWith(

fetch(event.request)

.then(response=>{

console.log(

event.request.url,

Date.now()-start,

"ms"

);

return response;

})

.catch(()=>{

return caches.match(event.request);

})

);

});

console.log("Service Worker Part 4 Loaded");

/* ==========================================
service-worker.js
Assam Finance Hub
Part 5/5
Final Initialization
========================================== */

// ==========================================
// CACHE INFORMATION
// ==========================================

async function cacheInfo(){

const cacheNames = await caches.keys();

console.log("Active Caches:",cacheNames);

return cacheNames;

}

// ==========================================
// CACHE SIZE
// ==========================================

async function cacheStatistics(){

const names = await caches.keys();

for(const name of names){

const cache = await caches.open(name);

const keys = await cache.keys();

console.log(

`${name} : ${keys.length} files`

);

}

}

// ==========================================
// UPDATE CHECK
// ==========================================

self.addEventListener("activate",(event)=>{

event.waitUntil(

(async()=>{

await cacheInfo();

await cacheStatistics();

console.log("Service Worker Ready");

})()

);

});

// ==========================================
// ERROR HANDLER
// ==========================================

self.addEventListener("error",(event)=>{

console.error(

"Service Worker Error:",

event.message

);

});

// ==========================================
// UNHANDLED PROMISE
// ==========================================

self.addEventListener(

"unhandledrejection",

(event)=>{

console.error(

"Unhandled Promise:",

event.reason

);

}

);

// ==========================================
// APP MESSAGE
// ==========================================

async function notifyClients(message){

const clientsList = await clients.matchAll();

clientsList.forEach(client=>{

client.postMessage({

type:"SW_MESSAGE",

message

});

});

}

// ==========================================
// SEND READY MESSAGE
// ==========================================

self.addEventListener("activate",(event)=>{

event.waitUntil(

notifyClients(

"Service Worker Activated Successfully"

)

);

});

// ==========================================
// VERSION
// ==========================================

const SW_VERSION = "1.0.0";

console.log(

`Service Worker Version ${SW_VERSION}`

);

// ==========================================
// READY
// ==========================================

console.log("Service Worker Fully Loaded");
