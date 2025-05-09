const {
  gsap: { registerPlugin, set, to, timeline },
  MorphSVGPlugin,
  Draggable
} = window;

// Kontrollera om MorphSVGPlugin är laddad
if (MorphSVGPlugin) {
  registerPlugin(MorphSVGPlugin);
} else {
  console.error('MorphSVGPlugin is not loaded.');
}

// Used to calculate distance of "tug"
let startX;
let startY;

const AUDIO = {
  CLICK: new Audio("https://assets.codepen.io/605876/click.mp3")
};
const STATE = {
  ON: false
};
const CORD_DURATION = 0.1;

const CORDS = document.querySelectorAll(".toggle-scene__cord");
const HIT = document.querySelector(".toggle-scene__hit-spot");
const DUMMY = document.querySelector(".toggle-scene__dummy-cord");
const DUMMY_CORD = document.querySelector(".toggle-scene__dummy-cord line");
const PROXY = document.createElement("div");

// Set initial position
const ENDX = DUMMY_CORD.getAttribute("x2");
const ENDY = DUMMY_CORD.getAttribute("y2");
const RESET = () => {
  set(PROXY, {
    x: ENDX,
    y: ENDY
  });
};

RESET();

// Toggle background between background image (lamp on) and dark mode (lamp off)
const toggleBackground = () => {
  const body = document.body;
  const isLampOn = body.classList.toggle("lamp-on");
  if (isLampOn) {
    body.style.background = "url('img/backgrund.jpg') no-repeat center center/cover"; // Background image
    localStorage.setItem("lampState", "on"); // Save state
  } else {
    body.style.background = "var(--bg)"; // Dark background
    localStorage.setItem("lampState", "off"); // Save state
  }
};

// Restore lamp state from localStorage on page load
const restoreLampState = () => {
  const savedState = localStorage.getItem("lampState");
  if (savedState === "on") {
    document.body.classList.add("lamp-on");
    document.body.style.background = "url('img/backgrund.jpg') no-repeat center center/cover";
  } else {
    document.body.classList.remove("lamp-on");
    document.body.style.background = "var(--bg)";
  }
};

// Call restoreLampState on page load
document.addEventListener("DOMContentLoaded", restoreLampState);

const CORD_TL = timeline({
  paused: true,
  onStart: () => {
    STATE.ON = !STATE.ON;
    set(document.documentElement, { "--on": STATE.ON ? 1 : 0 });
    set([DUMMY, HIT], { display: "none" });
    set(CORDS[0], { display: "block" });
    AUDIO.CLICK.play();
    toggleBackground(); // Toggle background
  },
  onComplete: () => {
    set([DUMMY, HIT], { display: "block" });
    set(CORDS[0], { display: "none" });
    RESET();
  }
});

for (let i = 1; i < CORDS.length; i++) {
  CORD_TL.add(
    to(CORDS[0], {
      morphSVG: CORDS[i],
      duration: CORD_DURATION,
      repeat: 1,
      yoyo: true
    })
  );
}

// Animate the lamp cord to swing or bounce
const animateCordSwing = () => {
  gsap.to(".toggle-scene__cord", {
    rotation: 15, // Swing angle
    transformOrigin: "top center",
    yoyo: true,
    repeat: 5, // Number of swings
    duration: 0.5, // Duration of each swing
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(".toggle-scene__cord", {
        rotation: 0, // Reset to original position
        duration: 0.5,
        ease: "power1.out"
      });
    }
  });
};

Draggable.create(PROXY, {
  trigger: HIT,
  type: "x,y",
  onPress: (e) => {
    startX = e.x;
    startY = e.y;
  },
  onDrag: function () {
    set(DUMMY_CORD, {
      attr: {
        x2: this.x,
        y2: this.y
      }
    });
  },
  onRelease: function (e) {
    const DISTX = Math.abs(e.x - startX);
    const DISTY = Math.abs(e.y - startY);
    const TRAVELLED = Math.sqrt(DISTX * DISTX + DISTY * DISTY);
    to(DUMMY_CORD, {
      attr: { x2: ENDX, y2: ENDY },
      duration: CORD_DURATION,
      onComplete: () => {
        if (TRAVELLED > 50) {
          CORD_TL.restart();
          animateCordSwing();
        } else {
          RESET();
        }
      }
    });
  }
});
