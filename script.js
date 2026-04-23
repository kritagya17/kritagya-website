const typingTarget = document.querySelector(".typing-text");
const words = ["Content Creator", "Future Medical Educator", "Student Mentor"];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;

  const currentWord = words[wordIndex];
  typingTarget.textContent = currentWord.slice(0, charIndex);

  if (!deleting && charIndex < currentWord.length) {
    charIndex += 1;
    setTimeout(typeLoop, 90);
    return;
  }

  if (!deleting && charIndex === currentWord.length) {
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 45);
    return;
  }

  deleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  setTimeout(typeLoop, 250);
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent =
      "Thanks for reaching out. This demo form is ready to be connected to email or a backend service.";
    contactForm.reset();
  });
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const profileImage = document.getElementById("profileImage");
const imageFallback = document.getElementById("imageFallback");

if (profileImage && imageFallback) {
  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";
    imageFallback.style.display = "flex";
  });
}

typeLoop();
