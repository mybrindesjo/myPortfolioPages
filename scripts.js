document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            const description = this.nextElementSibling;
            const infoCard = this.closest(".info-card");

            if (description) {
                if (description.style.display === "none" || description.style.display === "") {
                    description.style.display = "block";
                    if (infoCard) {
                        infoCard.style.height = "auto";
                        infoCard.style.maxHeight = "none"; // Allow the card to expand
                    }
                    this.textContent = "Visa mindre";
                } else {
                    description.style.display = "none";
                    if (infoCard) {
                        infoCard.style.height = "auto";
                        infoCard.style.maxHeight = ""; // Reset to default height
                    }
                    this.textContent = "Visa mer";
                }
            }
        });
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

    const projectImages = document.querySelectorAll(".project-img");
    const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    const fullscreenImage = fullscreenOverlay ? fullscreenOverlay.querySelector("img") : null;
    const closeBtn = fullscreenOverlay ? fullscreenOverlay.querySelector(".close-btn") : null;

    if (projectImages.length > 0 && fullscreenOverlay && fullscreenImage && closeBtn) {
        projectImages.forEach(img => {
            img.addEventListener("click", function() {
                fullscreenImage.src = this.src;
                fullscreenOverlay.style.display = "flex";
            });
        });

        closeBtn.addEventListener("click", function() {
            fullscreenOverlay.style.display = "none";
        });
    } else {
        console.warn("Vissa element för bildvisning hittades inte.");
    }

    const mobileMenu = document.getElementById("mobile-menu");
    const navLinksContainer = document.querySelector(".nav-links");

    if (mobileMenu && navLinksContainer) {
        mobileMenu.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
        });
    } else {
        console.warn("Mobilmenyn hittades inte.");
    }

    // Markera aktiv sida i navbaren
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname.split("/").pop();

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }
        });
    } else {
        console.warn("Inga navbar-länkar hittades.");
    }
});
