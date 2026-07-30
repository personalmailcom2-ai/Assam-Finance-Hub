/* ==========================================
   ASSAM FINANCE HUB
   script.js
   PART 2
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================
   DOM READY
========================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/* ==========================
   INITIALIZE
========================== */

function initializeWebsite() {

    hideLoader();

    setupNavbar();

    setupScrollButton();

    setupEMICalculator();

    setupLoanForm();

    setupCounters();

    setupScrollAnimation();

    setupNewsletter();

    setupFAQ();

    setupActiveNavigation();

    setupSmoothNavigation();

    setupInputValidation();

    setupWhatsAppButton();

    setupCallButton();

    setupDarkMode();

    checkConnection();

}

/* ==========================
   LOADER
========================== */

function hideLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.style.display = "none";

    });

}

/* ==========================
   NAVBAR
========================== */

function setupNavbar() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "#ffffff";
            header.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";

        } else {

            header.style.background = "rgba(255,255,255,.95)";
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,.08)";

        }

    });

}

/* ==========================
   SCROLL TO TOP
========================== */

function setupScrollButton() {

    const btn = document.getElementById("scrollTop");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        btn.style.display = window.scrollY > 300
            ? "flex"
            : "none";

    });

    btn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================
   EMI CALCULATOR
========================== */

function setupEMICalculator() {

    const calculateBtn = document.getElementById("calculateBtn");

    if (!calculateBtn) return;

    calculateBtn.addEventListener("click", calculateEMI);

}

function calculateEMI() {

    const loan = parseFloat(document.getElementById("loanAmount").value);

    const rate = parseFloat(document.getElementById("interestRate").value);

    const months = parseInt(document.getElementById("loanTenure").value);

    const result = document.getElementById("emiResult");

    if (!result) return;

    if (isNaN(loan) || isNaN(rate) || isNaN(months)) {

        result.style.color = "#dc3545";

        result.innerHTML = "Please fill all fields.";

        return;

    }

    if (loan <= 0 || rate <= 0 || months <= 0) {

        result.style.color = "#dc3545";

        result.innerHTML = "Enter valid values.";

        return;

    }

    const monthlyRate = rate / 12 / 100;

    const emi =

        (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /

        (Math.pow(1 + monthlyRate, months) - 1);

    if (!isFinite(emi)) {

        result.style.color = "#dc3545";

        result.innerHTML = "Unable to calculate EMI.";

        return;

    }

    result.style.color = "#0d6efd";

    result.innerHTML =

        "Monthly EMI : <strong>₹" +

        formatCurrency(emi.toFixed(2)) +

        "</strong>";

}

/* ==========================
   CURRENCY FORMAT
========================== */

function formatCurrency(number) {

    return Number(number).toLocaleString("en-IN", {

        minimumFractionDigits: 2,

        maximumFractionDigits: 2

    });

}

/* ==========================
   LOAN FORM
========================== */

function setupLoanForm() {

    const form = document.getElementById("loanForm");

    if (!form) return;

    form.addEventListener("submit", submitLoanForm);

}

async function submitLoanForm(e) {

    e.preventDefault();

    const form = e.target;

    const submitBtn = form.querySelector("button[type='submit']");

    if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.innerText = "Submitting...";

    }

    const data = {

        name: document.getElementById("name").value.trim(),

        mobile: document.getElementById("mobile").value.trim(),

        email: document.getElementById("email").value.trim(),

        city: document.getElementById("city").value.trim(),

        bike: document.getElementById("bike").value,

        bikeModel: document.getElementById("bikeModel").value.trim(),

        amount: Number(document.getElementById("amount").value),

        income: Number(document.getElementById("income").value),

        aadhaar: document.getElementById("aadhaar").value.trim(),

        pan: document.getElementById("pan").value.trim().toUpperCase(),

        address: document.getElementById("address").value.trim(),

        status: "Pending",

        createdAt: serverTimestamp()

    };

    if (data.name.length < 3) {

        alert("Enter a valid name.");

        resetSubmitButton(submitBtn);

        return;

    }

    if (!/^[6-9]\d{9}$/.test(data.mobile)) {

        alert("Enter a valid mobile number.");

        resetSubmitButton(submitBtn);

        return;

    }

    try {

        await addDoc(

            collection(db, "applications"),

            data

        );

        alert("Application submitted successfully.");

        form.reset();

    } catch (error) {

        console.error(error);

        alert("Submission failed. Please try again.");

    }

    resetSubmitButton(submitBtn);

}

/* ==========================
   RESET SUBMIT BUTTON
========================== */

function resetSubmitButton(button) {

    if (!button) return;

    button.disabled = false;

    button.innerText = "Submit Loan Application";

}

/* ==========================
   COUNTER ANIMATION
========================== */

function setupCounters() {

    const counters = document.querySelectorAll(".statistics h2");

    if (counters.length === 0) return;

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

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

function animateCounter(element) {

    const originalText = element.innerText;

    const target = parseInt(originalText.replace(/[^\d]/g, ""));

    if (isNaN(target)) return;

    const suffix = originalText.replace(/[\d,]/g, "");

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 100));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        element.innerText = current.toLocaleString("en-IN") + suffix;

    }, 20);

}

/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

function setupScrollAnimation() {

    const items = document.querySelectorAll(

        ".card, .partner-box, .faq-item, .support-card, .newsletter-box"

    );

    if (items.length === 0) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    items.forEach(item => {

        item.style.opacity = "0";

        item.style.transform = "translateY(40px)";

        item.style.transition = "all 0.7s ease";

        observer.observe(item);

    });

}

/* ==========================
   NEWSLETTER
========================== */

function setupNewsletter() {

    const form = document.querySelector(".newsletter-form");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = form.querySelector("input[type='email']").value.trim();

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            showError("Please enter your email.");

            return;

        }

        if (!pattern.test(email)) {

            showError("Please enter a valid email address.");

            return;

        }

        showSuccess("Thank you for subscribing!");

        form.reset();

    });

}

/* ==========================
   FAQ TOGGLE
========================== */

function setupFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    if (faqItems.length === 0) return;

    faqItems.forEach(item => {

        const title = item.querySelector("h3");

        const content = item.querySelector("p");

        if (!title || !content) return;

        content.style.display = "none";

        title.style.cursor = "pointer";

        title.addEventListener("click", () => {

            const isOpen = content.style.display === "block";

            faqItems.forEach(box => {

                const p = box.querySelector("p");

                if (p) {

                    p.style.display = "none";

                }

            });

            content.style.display = isOpen ? "none" : "block";

        });

    });

}

/* ==========================
   SUCCESS MESSAGE
========================== */

function showSuccess(message) {

    alert("✅ " + message);

}

/* ==========================
   ERROR MESSAGE
========================== */

function showError(message) {

    alert("❌ " + message);

}

/* ==========================
   SIMPLE NOTIFICATION
========================== */

function notify(message) {

    console.log(message);

}

/* ==========================
   ACTIVE NAVIGATION
========================== */

function setupActiveNavigation() {

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll("nav a");

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}

/* ==========================
   SMOOTH NAVIGATION
========================== */

function setupSmoothNavigation() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

}

/* ==========================
   INPUT VALIDATION
========================== */

function setupInputValidation() {

    const mobile = document.getElementById("mobile");

    if (mobile) {

        mobile.addEventListener("input", () => {

            mobile.value = mobile.value

                .replace(/\D/g, "")

                .slice(0, 10);

        });

    }

    const aadhaar = document.getElementById("aadhaar");

    if (aadhaar) {

        aadhaar.addEventListener("input", () => {

            aadhaar.value = aadhaar.value

                .replace(/\D/g, "")

                .slice(0, 12);

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

/* ==========================
   FLOATING WHATSAPP BUTTON
========================== */

function setupWhatsAppButton() {

    const existing = document.querySelector(".floating-whatsapp");

    if (existing) return;

    const btn = document.createElement("a");

    btn.href = "https://wa.me/919707040752";

    btn.target = "_blank";

    btn.rel = "noopener noreferrer";

    btn.className = "floating-whatsapp";

    btn.innerHTML = '<i class="fab fa-whatsapp"></i>';

    document.body.appendChild(btn);

}

/* ==========================
   FLOATING CALL BUTTON
========================== */

function setupCallButton() {

    const existing = document.querySelector(".floating-call");

    if (existing) return;

    const btn = document.createElement("a");

    btn.href = "tel:+919707040752";

    btn.className = "floating-call";

    btn.innerHTML = '<i class="fa-solid fa-phone"></i>';

    document.body.appendChild(btn);

}

/* ==========================
   DARK MODE
========================== */

function setupDarkMode() {

    const existing = document.getElementById("darkModeBtn");

    if (existing) return;

    const darkBtn = document.createElement("button");

    darkBtn.id = "darkModeBtn";

    darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    document.body.appendChild(darkBtn);

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

    });

}

/* ==========================
   KEYBOARD SHORTCUT
========================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});

/* ==========================
   COPY MOBILE NUMBER
========================== */

document.querySelectorAll(".copy-mobile").forEach(link => {

    link.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(link.innerText);

            showSuccess("Mobile number copied.");

        }

        catch (error) {

            console.error(error);

            showError("Unable to copy mobile number.");

        }

    });

});

/* ==========================
   IMAGE LAZY LOADING
========================== */

function setupLazyLoading() {

    document.querySelectorAll("img").forEach(img => {

        img.loading = "lazy";

    });

}

/* ==========================
   PAGE TITLE CHANGE
========================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.title = "Come Back 😊 | Assam Finance Hub";

    } else {

        document.title = "Assam Finance Hub | Fast Bike Loan Approval";

    }

});

/* ==========================
   ONLINE / OFFLINE STATUS
========================== */

window.addEventListener("online", () => {

    showSuccess("Internet Connected.");

});

window.addEventListener("offline", () => {

    showError("Internet Connection Lost.");

});

function checkConnection() {

    if (!navigator.onLine) {

        console.warn("You are currently offline.");

    }

}

/* ==========================
   GLOBAL ERROR HANDLER
========================== */

window.addEventListener("error", (event) => {

    console.error("JavaScript Error:", event.message);

});

/* ==========================
   UNHANDLED PROMISE
========================== */

window.addEventListener("unhandledrejection", (event) => {

    console.error("Unhandled Promise:", event.reason);

});

/* ==========================
   PAGE PERFORMANCE
========================== */

window.addEventListener("load", () => {

    if ("performance" in window) {

        console.log(

            "Website Loaded in",

            performance.now().toFixed(0),

            "ms"

        );

    }

});

/* ==========================
   SAFE CONSOLE
========================== */

console.log(`
==========================================
 Assam Finance Hub
 Professional Edition
==========================================
Website Initialized Successfully.
`);

/* ==========================
   VERSION
========================== */

const APP_VERSION = "1.0.0";

console.log("Version:", APP_VERSION);

/* ==========================
   START LAZY LOADING
========================== */

setupLazyLoading();

/* ==========================================
   PREVENT DOUBLE FORM SUBMIT
========================================== */

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

/* ==========================================
   PAGE SHOW
========================================== */

window.addEventListener("pageshow", () => {

    hideLoader();

});

/* ==========================================
   WINDOW LOAD
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.display = "none";

    }

});

/* ==========================================
   FINAL INITIALIZATION
========================================== */

console.log("All Components Loaded Successfully.");

console.log("Assam Finance Hub Ready.");

