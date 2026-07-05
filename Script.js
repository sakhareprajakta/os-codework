
// about page 

  const counters = document.querySelectorAll(".counter");
  const aboutSection = document.querySelector(".about");

  let hasStarted = false;

  function resetCounters() {
    counters.forEach((counter) => {
      const suffix = counter.dataset.suffix || "";
      counter.textContent = "0" + suffix;
    });
  }

  function startCounter(counter) {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const duration = 1500;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      counter.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;

          counters.forEach((counter) => {
            startCounter(counter);
          });
        }

        if (!entry.isIntersecting) {
          hasStarted = false;
          resetCounters();
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  observer.observe(aboutSection);



// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();


// Mobile Menu Toggle

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function () {
  navMenu.classList.toggle('active');
});

// Close the mobile menu when a link is clicked
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('active');
  });
});



const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Remove this line animation only one time
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});










// ------------------------------
// Contact Form Validation
// ------------------------------
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  // Get field values
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const phoneField = document.getElementById('phone');
  const messageField = document.getElementById('message');

  // Clear old error messages first
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('phoneError').textContent = '';
  document.getElementById('messageError').textContent = '';

  // Name check
  if (nameField.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Please enter your name.';
    isValid = false;
  }

  // Email check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailField.value.trim() === '') {
    document.getElementById('emailError').textContent = 'Please enter your email.';
    isValid = false;
  } else if (!emailPattern.test(emailField.value.trim())) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Phone check (optional field, but validate format if filled in)
  if (phoneField.value.trim() !== '') {
    const phonePattern = /^[0-9+\-\s]{7,15}$/;
    if (!phonePattern.test(phoneField.value.trim())) {
      document.getElementById('phoneError').textContent = 'Please enter a valid phone number.';
      isValid = false;
    }
  }

  // Message check
  if (messageField.value.trim() === '') {
    document.getElementById('messageError').textContent = 'Please write a message.';
    isValid = false;
  }

  if (!isValid) {
    formSuccess.classList.remove('show');
    return;
  }

  // If everything looks good, show success message
  // (No backend here - this is a front-end demo, so we just reset the form)
  formSuccess.classList.add('show');
  contactForm.reset();

  // Hide the success message after a few seconds
  setTimeout(function () {
    formSuccess.classList.remove('show');
  }, 5000);
});