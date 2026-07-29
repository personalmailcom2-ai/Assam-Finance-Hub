document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("loanForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const bike = document.getElementById("bike").value.trim();
    const city = document.getElementById("city").value.trim();

    // WhatsApp Message
    const message =
      "🛵 New Loan Application\n\n" +
      "👤 Name: " + name + "\n" +
      "📱 Mobile: " + mobile + "\n" +
      "🏍 Bike: " + bike + "\n" +
      "📍 City: " + city;

    const whatsappUrl =
      "https://wa.me/919707040752?text=" + encodeURIComponent(message);

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    alert("Application Submitted Successfully!");

    form.reset();
  });

});
