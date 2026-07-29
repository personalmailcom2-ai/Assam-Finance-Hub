document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("loanForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const bike = document.getElementById("bike").value.trim();
    const city = document.getElementById("city").value.trim();

    // Save to Firestore
    await db.collection("applications").add({
      name: name,
      mobile: mobile,
      bike: bike,
      city: city,
      status: "Pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // WhatsApp Message
    const message =
      "🚲 New Loan Application\n\n" +
      "👤 Name: " + name + "\n" +
      "📱 Mobile: " + mobile + "\n" +
      "🏍 Bike: " + bike + "\n" +
      "📍 City: " + city;

    window.open(
      "https://wa.me/919707040752?text=" + encodeURIComponent(message),
      "_blank"
    );

    alert("Application Submitted Successfully!");
    form.reset();
  });

});
