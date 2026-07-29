document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loanForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const bike = document.getElementById("bike").value.trim();
        const city = document.getElementById("city").value.trim();

        const message = `🏍️ New Loan Application

👤 Name: ${name}
📱 Mobile: ${mobile}
🏍️ Bike Model: ${bike}
📍 City: ${city}`;

        const phone = "919707040752";

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");

        form.reset();
    });

});
