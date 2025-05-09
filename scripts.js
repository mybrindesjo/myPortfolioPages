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

    const {
        gsap: { registerPlugin, set, to, timeline },
        MorphSVGPlugin,
        Draggable,
    } = window;

    if (MorphSVGPlugin) {
        registerPlugin(MorphSVGPlugin);
    } else {
        console.error("MorphSVGPlugin is not loaded. Ensure the plugin is included.");
    }

    // Used to calculate distance of "tug"
    let startX;
    let startY;

    const AUDIO = {
        CLICK: new Audio('https://assets.codepen.io/605876/click.mp3'),
    };
    const STATE = {
        ON: false,
    };
    const CORD_DURATION = 0.1;

    const CORDS = document.querySelectorAll('.toggle-scene__cord');
    const HIT = document.querySelector('.toggle-scene__hit-spot');
    const DUMMY = document.querySelector('.toggle-scene__dummy-cord');
    const DUMMY_CORD = document.querySelector('.toggle-scene__dummy-cord line');
    const PROXY = document.createElement('div');
    // set init position
    const ENDX = DUMMY_CORD.getAttribute('x2');
    const ENDY = DUMMY_CORD.getAttribute('y2');
    const RESET = () => {
        set(PROXY, {
            x: ENDX,
            y: ENDY,
        });
    };

    RESET();

    const CORD_TL = timeline({
        paused: true,
        onStart: () => {
            STATE.ON = !STATE.ON;
            set(document.documentElement, { '--on': STATE.ON ? 1 : 0 });
            set([DUMMY, HIT], { display: 'none' });
            set(CORDS[0], { display: 'block' });
            AUDIO.CLICK.play();
        },
        onComplete: () => {
            set([DUMMY, HIT], { display: 'block' });
            set(CORDS[0], { display: 'none' });
            RESET();
        },
    });

    for (let i = 1; i < CORDS.length; i++) {
        CORD_TL.add(
            to(CORDS[0], {
                morphSVG: CORDS[i],
                duration: CORD_DURATION,
                repeat: 1,
                yoyo: true,
            })
        );
    }

    Draggable.create(PROXY, {
        trigger: HIT,
        type: 'x,y',
        onPress: e => {
            startX = e.x;
            startY = e.y;
        },
        onDrag: function() {
            set(DUMMY_CORD, {
                attr: {
                    x2: this.x,
                    y2: this.y,
                },
            });
        },
        onRelease: function(e) {
            const DISTX = Math.abs(e.x - startX);
            const DISTY = Math.abs(e.y - startY);
            const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
            to(DUMMY_CORD, {
                attr: { x2: ENDX, y2: ENDY },
                duration: CORD_DURATION,
                onComplete: () => {
                    if (TRAVELLED > 50) {
                        CORD_TL.restart();
                    } else {
                        RESET();
                    }
                },
            });
        },
    });
});
