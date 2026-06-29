// ==============================
// Mobile Navigation
// ==============================

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

if (hamburger && nav && overlay) {

    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
        overlay.classList.toggle("active");

        const icon = hamburger.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    overlay.addEventListener("click", () => {
        nav.classList.remove("active");
        overlay.classList.remove("active");

        const icon = hamburger.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    });

}

// ==============================
// Hide Header on Scroll
// ==============================

const header = document.querySelector(".header");

if (header) {

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {

        const currentY = window.scrollY;

        if (currentY > lastScrollY && currentY > 100) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }

        lastScrollY = currentY;

    });

}

// ==============================
// Customer Reviews Slider
// ==============================

const track = document.querySelector(".reviews-track");
const cards = document.querySelectorAll(".review-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dots = document.querySelectorAll(".dot");

if (
    track &&
    nextBtn &&
    prevBtn &&
    cards.length > 0 &&
    dots.length > 0
) {

    let currentIndex = 0;

    function updateSlider() {

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));

        dots[currentIndex].classList.add("active");

    }

    nextBtn.addEventListener("click", () => {

        currentIndex = (currentIndex + 1) % cards.length;

        updateSlider();

    });

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }

        updateSlider();

    });

    setInterval(() => {

        currentIndex = (currentIndex + 1) % cards.length;

        updateSlider();

    }, 5000);

    let startX = 0;
    let endX = 0;

    track.addEventListener("touchstart", e => {

        startX = e.touches[0].clientX;

    });

    track.addEventListener("touchend", e => {

        endX = e.changedTouches[0].clientX;

        const swipeDistance = startX - endX;

        if (swipeDistance > 50) {

            currentIndex = (currentIndex + 1) % cards.length;

            updateSlider();

        }

        if (swipeDistance < -50) {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = cards.length - 1;
            }

            updateSlider();

        }

    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentIndex = index;

            updateSlider();

        });

    });

}
