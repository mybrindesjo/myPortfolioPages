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
});
