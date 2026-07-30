import {
  getAuth
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

  getAuth(); // Future Firebase OTP ke liye

  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const form = document.getElementById("loanForm");

  // DEMO OTP
  sendOtpBtn.addEventListener("click", () => {

    const mobile = document.getElementById("mobile").value.trim();

    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

    alert("Demo OTP: 1234");

  });

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');

    btn.disabled = true;
    btn.innerHTML = "Submitting...";

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const bike = document.getElementById("bike").value.trim();
    const city = document.getElementById("city").value.trim();
    const otp = document.getElementById("otp").value.trim();

    // Demo OTP Check
    if (otp !== "1234") {

      alert("Invalid OTP");

      btn.disabled = false;
      btn.innerHTML = "Apply Now";

      return;
    }

    const q = query(
      collection(window.db, "applications"),
      where("mobile", "==", mobile)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {

      alert("Application already submitted.");

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

      document.getElementById("msg").innerHTML =
        "✅ Application Submitted Successfully!";

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
