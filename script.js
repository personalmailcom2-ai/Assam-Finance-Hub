import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.addEventListener("load", () => {

  const form = document.getElementById("loanForm");

  if (!form) {
    alert("Form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!window.db) {
      alert("Firebase not loaded");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const bike = document.getElementById("bike").value.trim();
    const city = document.getElementById("city").value.trim();

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

      alert("Application Submitted Successfully!");
      form.reset();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });

});
