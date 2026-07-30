import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.addEventListener("load", () => {
  const auth = window.auth;
  const sendOtpBtn = document.getElementById("sendOtpBtn");

sendOtpBtn.addEventListener("click", async () => {

const mobile = document.getElementById("mobile").value.trim();

const confirmationResult = await signInWithPhoneNumber(
auth,
"+91" + mobile,
window.recaptchaVerifier
);

window.confirmationResult = confirmationResult;

alert("OTP Sent Successfully");

});

window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible"
  }
);

  const form = document.getElementById("loanForm");

  if (!form) {
    alert("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    const btn = form.querySelector("button");
btn.disabled = true;
btn.innerHTML = "Submitting...";
    e.preventDefault();

    if (!window.db) {
      alert("Firebase not loaded");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const bike = document.getElementById("bike").value.trim();
    const city = document.getElementById("city").value.trim();
    const otp = document.getElementById("otp").value.trim();

    if (!window.confirmationResult) {
  alert("Pehle OTP Send karo");
  return;
    }

    try {
  await window.confirmationResult.confirm(otp);
} catch (e) {
  alert("Invalid OTP");
  return;
    }

    const q = query(
  collection(window.db, "applications"),
  where("mobile", "==", mobile)
);

const snapshot = await getDocs(q);

if (snapshot.size > 0) {
  alert("You have already submitted an application with this mobile number.");

  btn.disabled = false;
  btn.innerHTML = "Apply Now";

  return;
}
    try {

      await addDoc(collection(window.db, "applications"), {
        name,
        mobile,
        bike,
        city,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      const message =
        "🚲 New Loan Application%0A%0A" +
        "👤 Name: " + name + "%0A" +
        "📱 Mobile: " + mobile + "%0A" +
        "🏍 Bike: " + bike + "%0A" +
        "📍 City: " + city;

      window.open(
        "https://wa.me/919707040752?text=" + message,
        "_blank"
      );

      document.getElementById("msg").innerHTML = "✅ Application Submitted Successfully!";
      form.reset();

      btn.innerHTML = "Submitted ✓";

      setTimeout(() => {
  btn.disabled = false;
  btn.innerHTML = "Apply Now";
  document.getElementById("msg").innerHTML = "";
}, 3000);
      
    } catch (err) {
      console.error(err);
      alert(err.message);

      btn.disabled = false;
btn.innerHTML = "Apply Now";
    }
  });

});
