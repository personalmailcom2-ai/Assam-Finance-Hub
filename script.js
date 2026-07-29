const scriptURL = "https://script.google.com/macros/s/AKfycbzWiAhEjpma7ISaSt_rgum8euKqTaE3qRCymm-7WD_TKbIY4f4N_SpyKTCA6oGcWvbsMA/exec";

document.getElementById("loanForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Submitting...";

    const data = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        bike: document.getElementById("bike").value,
        city: document.getElementById("city").value
    };

    fetch(scriptURL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        alert("✅ Thank You!\nYour loan application has been submitted successfully.");
        document.getElementById("loanForm").reset();
    })
    .catch(err => {
        alert("❌ Error: " + err);
        console.error(err);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Submit";
    });
});