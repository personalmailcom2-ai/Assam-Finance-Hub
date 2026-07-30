// ==========================================
// ASSAM FINANCE HUB
// Professional Script
// Part 1
// ==========================================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ==========================================
// DOM Ready
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    hideLoader();
    setupNavbar();
    setupScrollButton();
    setupEMICalculator();
    setupLoanForm();
    setupCounters();
    setupInputValidation();
    setupFAQ();
    setupNewsletter();
    setupSmoothNavigation();
    setupActiveNavigation();
    setupScrollAnimation();

});

// ==========================================
// Loader
// ==========================================

function hideLoader() {

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        if (loader) {

            loader.style.display = "none";

        }

    });

}

// ==========================================
// Navbar Effect
// ==========================================

function setupNavbar() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "#fff";
            header.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";

        } else {

            header.style.background = "rgba(255,255,255,.95)";
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,.08)";

        }

    });

}

// ==========================================
// Scroll Top Button
// ==========================================

function setupScrollButton() {

    const btn = document.getElementById("scrollTop");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        btn.style.display = window.scrollY > 300 ? "flex" : "none";

    });

    btn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ==========================================
// EMI Calculator
// ==========================================

function setupEMICalculator() {

    const btn = document.getElementById("calculateBtn");

    if (!btn) return;

    btn.addEventListener("click", calculateEMI);

}

function calculateEMI() {

    const loan = parseFloat(document.getElementById("loanAmount").value);

    const rate = parseFloat(document.getElementById("interestRate").value);

    const months = parseInt(document.getElementById("loanTenure").value);

    const result = document.getElementById("emiResult");

    if (!loan || !rate || !months) {

        result.innerHTML = "Please fill all fields.";
        result.style.color = "red";
        return;

    }

    const r = rate / 12 / 100;

    const emi = (loan * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1);

    result.style.color = "#0d6efd";
    result.innerHTML = "Monthly EMI : <strong>₹" +
        Number(emi).toLocaleString("en-IN", {
            maximumFractionDigits: 2
        }) +
        "</strong>";

}

// ==========================================
// Loan Form
// ==========================================

function setupLoanForm() {

    const form = document.getElementById("loanForm");

    if (!form) return;

    form.addEventListener("submit", submitLoanForm);

}

async function submitLoanForm(e) {

    e.preventDefault();

    const btn = e.target.querySelector("button[type='submit']");

    btn.disabled = true;
    btn.innerText = "Submitting...";

    const data = {

        name: document.getElementById("name").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        city: document.getElementById("city").value.trim(),
        bike: document.getElementById("bike").value,
        bikeModel: document.getElementById("bikeModel").value.trim(),
        amount: document.getElementById("amount").value,
        income: document.getElementById("income").value,
        aadhaar: document.getElementById("aadhaar").value.trim(),
        pan: document.getElementById("pan").value.trim().toUpperCase(),
        address: document.getElementById("address").value.trim(),
        status: "Pending",
        createdAt: serverTimestamp()

    };

    if (data.name.length < 3) {

        alert("Enter valid name");
        btn.disabled = false;
        btn.innerText = "Submit Loan Application";
        return;

    }

    if (!/^[6-9]\d{9}$/.test(data.mobile)) {

        alert("Enter valid mobile number");
        btn.disabled = false;
        btn.innerText = "Submit Loan Application";
        return;

    }

    try {

        await addDoc(
            collection(db, "applications"),
            data
        );

        alert("Application Submitted Successfully");

        e.target.reset();

    } catch (err) {

        console.error(err);

        alert("Submission Failed");

    }

    btn.disabled = false;
    btn.innerText = "Submit Loan Application";

}

// ==========================================
// Counter Animation
// ==========================================

function setupCounters() {

    const counters = document.querySelectorAll(".statistics h2");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => observer.observe(counter));

}

function animateCounter(el) {

    const text = el.innerText;

    const target = parseInt(text.replace(/[^\d]/g, ""));

    if (isNaN(target)) return;

    const suffix = text.replace(/[\d,+]/g, "");

    let count = 0;

    const step = Math.ceil(target / 80);

    const timer = setInterval(() => {

        count += step;

        if (count >= target) {

            count = target;

            clearInterval(timer);

        }

        el.innerText = count.toLocaleString("en-IN") + suffix;

    }, 25);

}

// ==========================================
// Input Validation
// ==========================================

function setupInputValidation() {

    const mobile = document.getElementById("mobile");

    if (mobile) {

        mobile.addEventListener("input", () => {

            mobile.value = mobile.value.replace(/\D/g, "").slice(0, 10);

        });

    }

    const aadhaar = document.getElementById("aadhaar");

    if (aadhaar) {

        aadhaar.addEventListener("input", () => {

            aadhaar.value = aadhaar.value.replace(/\D/g, "").slice(0, 12);

        });

    }

    const pan = document.getElementById("pan");

    if (pan) {

        pan.addEventListener("input", () => {

            pan.value = pan.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .slice(0, 10);

        });

    }

}

// ==========================================
// FAQ
// ==========================================

function setupFAQ() {

    const items = document.querySelectorAll(".faq-item");

    if (!items.length) return;

    items.forEach(item => {

        const title = item.querySelector("h3");
        const content = item.querySelector("p");

        if (!title || !content) return;

        content.style.display = "none";

        title.style.cursor = "pointer";

        title.addEventListener("click", () => {

            const open = content.style.display === "block";

            items.forEach(box => {

                const p = box.querySelector("p");

                if (p) p.style.display = "none";

            });

            content.style.display = open ? "none" : "block";

        });

    });

}

// ==========================================
// Newsletter
// ==========================================

function setupNewsletter() {

    const form = document.querySelector(".newsletter-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const input = form.querySelector("input");

        const email = input.value.trim();

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {

            alert("Please enter email");
            return;

        }

        if (!pattern.test(email)) {

            alert("Please enter valid email");
            return;

        }

        alert("Thank you for subscribing!");

        form.reset();

    });

}

// ==========================================
// Scroll Animation
// ==========================================

function setupScrollAnimation() {

    const items = document.querySelectorAll(
        ".card,.partner-box,.faq-item,.support-card,.newsletter-box"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: 0.15

    });

    items.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = "all .7s ease";

        observer.observe(item);

    });

}

// ==========================================
// Floating WhatsApp Button
// ==========================================

function setupWhatsAppButton() {

    if (document.querySelector(".whatsapp-float")) return;

    const btn = document.createElement("a");

    btn.href = "https://wa.me/919707040752";
    btn.target = "_blank";
    btn.className = "whatsapp-float";

    btn.innerHTML = '<i class="fab fa-whatsapp"></i>';

    document.body.appendChild(btn);

}

// ==========================================
// Floating Call Button
// ==========================================

function setupCallButton() {

    const btn = document.createElement("a");

    btn.href = "tel:+919707040752";

    btn.className = "floating-call";

    btn.innerHTML = '<i class="fa-solid fa-phone"></i>';

    document.body.appendChild(btn);

}

// ==========================================
// Dark Mode
// ==========================================

function setupDarkMode() {

    const btn = document.createElement("button");

    btn.id = "darkModeBtn";

    btn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    document.body.appendChild(btn);

    btn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

    });

}

// ==========================================
// Keyboard Shortcut
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    }

});

// ==========================================
// Copy Mobile Number
// ==========================================

document.querySelectorAll(".copy-mobile").forEach(link => {

    link.addEventListener("click", () => {

        navigator.clipboard.writeText(link.innerText);

        alert("Mobile Number Copied");

    });

});

// ==========================================
// Lazy Load Images
// ==========================================

document.querySelectorAll("img").forEach(img => {

    img.loading = "lazy";

});

// ==========================================
// Page Title
// ==========================================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.title = "Come Back 😊 | Assam Finance Hub";

    } else {

        document.title = "Assam Finance Hub";

    }

});

// ==========================================
// Online / Offline Status
// ==========================================

window.addEventListener("offline", () => {
    alert("❌ Internet connection lost.");
});

window.addEventListener("online", () => {
    alert("✅ Internet connected.");
});

// ==========================================
// Global Error Handler
// ==========================================

window.addEventListener("error", (event) => {
    console.error("JavaScript Error:", event.message);
});

// ==========================================
// Unhandled Promise
// ==========================================

window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled Promise:", event.reason);
});

// ==========================================
// Check Internet
// ==========================================

function checkConnection() {

    if (!navigator.onLine) {

        console.warn("You are offline.");

    }

}

checkConnection();

// ==========================================
// Performance
// ==========================================

window.addEventListener("load", () => {

    if ("performance" in window) {

        console.log(
            "Website Loaded in",
            performance.now().toFixed(0),
            "ms"
        );

    }

});

// ==========================================
// Prevent Double Submit
// ==========================================

document.querySelectorAll("form").forEach(form => {

    form.addEventListener("submit", () => {

        const btn = form.querySelector("button[type='submit']");

        if (!btn) return;

        btn.disabled = true;

        setTimeout(() => {

            btn.disabled = false;

        }, 3000);

    });

});

// ==========================================
// Initialize Extra Features
// ==========================================

setupScrollAnimation();
setupFAQ();
setupActiveNavigation();
setupSmoothNavigation();
setupInputValidation();
setupWhatsAppButton();
setupCallButton();
setupDarkMode();

// ==========================================
// App Version
// ==========================================

const APP_VERSION = "1.0.0";

console.log(`
==========================================
 Assam Finance Hub
 Professional Edition
==========================================

Version : ${APP_VERSION}

Website Loaded Successfully.
`);

// ==========================================
// Hide Loader
// ==========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

});

// ==========================================
// End of Script
// ==========================================
