document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            const details = this.parentElement.nextElementSibling;

            // Stäng alla andra öppna toggles
            document.querySelectorAll(".project-details").forEach((otherDetails, otherIndex) => {
                if (otherIndex !== index) {
                    otherDetails.style.display = "none";
                    const otherButton = toggleButtons[otherIndex];
                    if (otherButton) otherButton.textContent = "+";
                }
            });

            // Växla synlighet för den aktuella togglen
            const isCurrentlyVisible = details.style.display === "block";
            details.style.display = isCurrentlyVisible ? "none" : "block";
            this.textContent = isCurrentlyVisible ? "+" : "-";
        });
    });

    // Stäng alla toggles när sidan laddas om
    document.querySelectorAll(".project-details").forEach(details => {
        details.style.display = "none";
    });
    toggleButtons.forEach(button => {
        button.textContent = "+";
    });

    const showMoreButtons = document.querySelectorAll(".show-more-btn");

    showMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            const moreImages = this.previousElementSibling;
            if (moreImages) {
                if (moreImages.style.display === "none" || moreImages.style.display === "") {
                    moreImages.style.display = "block";
                    this.textContent = "Visa mindre";
                } else {
                    moreImages.style.display = "none";
                    this.textContent = "Visa mer";
                }
            }
        });
    });

    const mobileMenu = document.getElementById("mobile-menu");
    const navLinksContainer = document.querySelector(".nav-links");

    if (mobileMenu && navLinksContainer) {
        mobileMenu.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
        });
    }

    // Markera aktiv sida i navbaren
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname.toLowerCase();

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname.toLowerCase();
            if (linkPath === currentPath) {
                link.classList.add("active");
            }
        });
    }

    // Observera element och tillämpa animation
    const hiddenElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Sluta observera när synlig
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach(element => observer.observe(element));
});


document.addEventListener("DOMContentLoaded", () => {
    const skillItems = document.querySelectorAll(".skills li");
  
    skillItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.50}s`; // 150ms mellan varje
      item.classList.add("show");
    });
  });

  const lampIcon = document.getElementById('lamp-icon');
  if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      lampIcon.src = 'img/lamp-off.png';
  }

  lampIcon.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      lampIcon.src = isDarkMode ? 'img/lamp-off.png' : 'img/lamp-on.png';
      localStorage.setItem('darkMode', isDarkMode);
  });