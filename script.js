/* ==========================================
   ASSAM FINANCE HUB
   PROFESSIONAL EDITION
========================================== */

import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});

/* ==========================================
   INITIALIZE WEBSITE
========================================== */

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

/* ==========================================
   LOADER
========================================== */

function hideLoader() {

    window.addEventListener("load", () => {

        const loader = document.getElementById("loader");

        if (loader) {
            loader.style.display = "none";
        }

    });

}

/* ==========================================
   NAVBAR
========================================== */

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

/* ==========================================
   SCROLL TO TOP
========================================== */

function setupScrollButton() {

    const btn = document.getElementById("scrollTop");

    if (!btn) return;

    window.addEventListener("scroll", () => {

        btn.style.display =
            window.scrollY > 300
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

/* ==========================================
   EMI CALCULATOR
========================================== */

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

    const monthlyRate = rate / 12 / 100;

    const emi =
        (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    result.style.color = "#0d6efd";

    result.innerHTML =
        "Monthly EMI : <strong>₹" +
        Number(emi).toLocaleString("en-IN", {
            minimumFractionDigits: 2
        }) +
        "</strong>";

}

/* ==========================
   FIREBASE
========================== */

import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

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

  const submitBtn = e.target.querySelector("button[type='submit']");

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

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

    pan: document.getElementById("pan").value.trim(),

    address: document.getElementById("address").value.trim(),

    status: "Pending",

    createdAt: serverTimestamp()

  };

  /* Validation */

  if (data.name.length < 3) {
    alert("Enter valid name.");
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Loan Application";
    return;
  }

  if (!/^[6-9]\d{9}$/.test(data.mobile)) {
    alert("Enter valid mobile number.");
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Loan Application";
    return;
  }

  try {

    await addDoc(collection(db, "applications"), data);

    alert("Application Submitted Successfully.");

    document.getElementById("loanForm").reset();

  } catch (error) {

    console.error(error);

    alert("Submission Failed. Please Try Again.");

  }

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit Loan Application";

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

  counters.forEach(counter => observer.observe(counter));

}

function animateCounter(element) {

  const text = element.innerText;

  const target = parseInt(text.replace(/[^\d]/g, ""));

  if (isNaN(target)) return;

  const suffix = text.replace(/[\d,]/g, "");

  let current = 0;

  const increment = Math.ceil(target / 80);

  const timer = setInterval(() => {

    current += increment;

    if (current >= target) {

      current = target;

      clearInterval(timer);

    }

    element.innerText = current.toLocaleString("en-IN") + suffix;

  }, 25);

}

/* ==========================
   SCROLL ANIMATION
========================== */

function setupScrollAnimation() {

  const items = document.querySelectorAll(
    ".card,.partner-box,.faq-item,.support-card,.newsletter-box"
  );

  if (items.length === 0) return;

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

setupScrollAnimation();

/* ==========================
   NEWSLETTER
========================== */

function setupNewsletter() {

  const form = document.querySelector(".newsletter-form");

  if (!form) return;

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = form.querySelector("input").value.trim();

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

        if (p) p.style.display = "none";

      });

      content.style.display = isOpen ? "none" : "block";

    });

  });

}

/* ==========================
   ALERT HELPERS
========================== */

function showSuccess(message) {
  alert("✅ " + message);
}

function showError(message) {
  alert("❌ " + message);
}

function notify(message) {
  console.log(message);
}

setupNewsletter();
setupFAQ();

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
   SMOOTH SCROLL
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

setupActiveNavigation();
setupSmoothNavigation();

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
   WHATSAPP BUTTON
========================== */

function setupWhatsAppButton() {

    const btn = document.createElement("a");

    btn.href = "https://wa.me/919707040752";

    btn.target = "_blank";

    btn.className = "floating-whatsapp";

    btn.innerHTML = '<i class="fab fa-whatsapp"></i>';

    document.body.appendChild(btn);

}

/* ==========================
   CALL BUTTON
========================== */

function setupCallButton() {

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

    const btn = document.createElement("button");

    btn.id = "darkModeBtn";

    btn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    document.body.appendChild(btn);

    btn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

    });

}

setupInputValidation();
setupWhatsAppButton();
setupCallButton();
setupDarkMode();

