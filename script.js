var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}


const wrapper = document.querySelector(".work-list");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".work-list i");
const cardWidth = document.querySelector(".work").offsetWidth;
const carouselChildren = Array.from(carousel.querySelectorAll(".work"));

let isDragging = false;
let startX, startScrollLeft, timeoutId;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const scrollAmount = btn.id === "left" ? -cardWidth : cardWidth;
        carousel.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    const diffX = e.pageX - startX;
    carousel.scrollLeft = startScrollLeft - diffX;
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => {
        const scrollAmount = cardWidth;
        carousel.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    }, 2500);
};

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

carousel.addEventListener("scroll", () => {
    // Check if scrolling has reached the end
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        // Reset to the beginning
        carousel.scrollLeft = 0;
    }
});

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// GOOGLE FORM
const scriptURL = 'https://script.google.com/macros/s/AKfycbw_1dv9D_5jWHWHXaiIWAxLpExfT-rVBOKSS3xFh5m8uftJkMNQXo31wwrsaMrIRR2U/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message Sent Successfully!!"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})