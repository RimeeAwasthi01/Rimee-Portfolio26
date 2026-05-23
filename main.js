/* ═══════════════════════════════════════════
   main.js — Rimee Awasthi Portfolio
   ═══════════════════════════════════════════ */

/* ── TYPEWRITER ── */
const roles = [
  "Assistant Professor",
  "CS Researcher",
  "Student Mentor",
  "UGC NET-JRF Holder",
  "Full Stack Developer"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const roleEl = document.getElementById('role-text');

function type() {
  const word = roles[roleIndex];
  if (!isDeleting) {
    charIndex++;
    roleEl.innerHTML = word.slice(0, charIndex) + '<span class="cursor"></span>';
    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    charIndex--;
    roleEl.innerHTML = word.slice(0, charIndex) + '<span class="cursor"></span>';
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, isDeleting ? 42 : 72);
}

type();


/* ── ACTIVE NAV ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});


/* ── REVEAL ON SCROLL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// Close menu when a nav link is clicked (mobile UX)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});


/* ── CONTACT FORM — SEND VIA GMAIL ── */
function sendMail() {
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const subject = document.querySelector('input[name="subject"]').value.trim();
  const message = document.querySelector('textarea[name="message"]').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const body =
    "Hello, I am " + name +
    " and I wanted to connect with you.\r\n\r\n" +
    "My Email: " + email +
    "\r\n\r\nMessage:\r\n" + message;

  const gmailURL =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=rimee0201@gmail.com" +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.open(gmailURL, '_blank');
}

// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();