const typingTarget = document.querySelector(".typing-text");
const phrases = ["MBBS Student", "Content Creator", "Future Medical Educator"];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function runTypingAnimation() {
  if (!typingTarget) {
    return;
  }

  const currentPhrase = phrases[phraseIndex];
  typingTarget.textContent = currentPhrase.slice(0, letterIndex);

  if (!isDeleting && letterIndex < currentPhrase.length) {
    letterIndex += 1;
    setTimeout(runTypingAnimation, 90);
    return;
  }

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(runTypingAnimation, 1400);
    return;
  }

  if (isDeleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(runTypingAnimation, 45);
    return;
  }

  isDeleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(runTypingAnimation, 220);
}

// Reveal sections smoothly as they enter the viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Provide simple feedback for the demo contact form.
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thanks for reaching out. Your message is ready to be connected to a backend or email service.";
    contactForm.reset();
  });
}

// Warn the user if the resume file has not been added yet.
const resumeButton = document.getElementById("resumeButton");

if (resumeButton) {
  resumeButton.addEventListener("click", (event) => {
    const href = resumeButton.getAttribute("href");
    if (!href || href === "#") {
      event.preventDefault();
      alert("Add your CV file in the project folder and update the resume link in index.html.");
    }
  });
}

const yearTarget = document.getElementById("year");
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

runTypingAnimation();
