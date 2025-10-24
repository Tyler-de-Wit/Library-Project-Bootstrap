// -------------------- Variables -------------------- //
const rootElement = document.documentElement;

// Test if fontSize has been set already in the session as to not override it from another page
if (typeof sessionStorage.getItem("fontSize") == 'undefined') {
    sessionStorage.setItem("fontSize", 16);
}


// Declare arrays for document elements
const htmlElements = ['a', 'abbr', 'address', 'article', 'aside', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'button', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'details', 'dialog', 'div', 'dl', 'dt', 'em', 'fieldset', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'i', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'mark', 'menu', 'menuitem', 'meter', 'nav', 'ol', 'optgroup', 'option', 'p', 'pre', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'section', 'select', 'small', 'span', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'u', 'ul'];
const elements = [];

// Populate element array with document elements
for (let i = 0; i < htmlElements.length; i++) {
    let element = htmlElements[i];
    let selector = document.querySelectorAll(element);
    elements.push(selector);
}


// -------------------- Change Font Size And Contrast -------------------- //
// Function to increase root font size
function increaseFontSize() {
    "use strict"

    let fontSize = sessionStorage.getItem("fontSize");
    fontSize = Number(fontSize);

    if (fontSize < 22) {
        fontSize += 2;
        rootElement.style.fontSize = fontSize + "px";
        sessionStorage.setItem("fontSize", fontSize);
    }
}

// Function to decrease root font size
function decreaseFontSize() {
    "use strict"

    let fontSize = sessionStorage.getItem("fontSize");
    fontSize = Number(fontSize);

    if (fontSize > 10) {
        fontSize -= 2;
        rootElement.style.fontSize = fontSize + "px";
        sessionStorage.setItem("fontSize", fontSize);
    }
}


// Function to increase contrast
function increaseContrast() {
    "use strict"

    // Set sesion variable to keep state between pages
    sessionStorage.setItem("contrast", "high");

    for (let x = 0; x < elements.length; x++) {
        for (let i = 0; i < elements[x].length; i++) {
            elements[x][i].classList.add('high-contrast');
        }
    }
}

// Function to decrease contrast
function decreaseContrast() {
    "use strict"

    // Set sesion variable to keep state between pages
    sessionStorage.setItem("contrast", "low");

    for (let x = 0; x < elements.length; x++) {
        for (let i = 0; i < elements[x].length; i++) {
            elements[x][i].classList.remove('high-contrast');
        }
    }
}


// -------------------- Scroll Animations -------------------- //
// When an element with the class ".animateLeft" is within the viewport the class ".fadeInLeft" is added
const targetElementsLeft = document.querySelectorAll(".animateLeft");
const observerLeft = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.classList.add("fadeInLeft");
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});
// Loop through every element and observe it
targetElementsLeft.forEach(element => {
    observerLeft.observe(element); // Observe each element individually
});

// When an element with the class ".animateRight" is within the viewport the class ".fadeInRight" is added
const targetElementsRight = document.querySelectorAll(".animateRight");
const observerRight = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.classList.add("fadeInRight");
        }
    });
}, {
    threshold: 0.5
});
targetElementsRight.forEach(element => {
    observerRight.observe(element); 
});

// When an element with the class ".animateTop" is within the viewport the class ".fadeInTop" is added
const targetElementsTop = document.querySelectorAll(".animateTop");
const observerTop = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.classList.add("fadeInTop");
        }
    });
}, {
    threshold: 0.5
});
targetElementsTop.forEach(element => {
    observerTop.observe(element);
});


// -------------------- Event Listeners and Default Behaviour -------------------- //
function init() {
    'use strict';
    
    // Run increase or decrease contrast functions based on state of session varaible
    if (sessionStorage.getItem("contrast") == "high") {
        increaseContrast();
    } else if (sessionStorage.getItem("contrast") == "low") {
        decreaseContrast();
    }

    // Set the font size for a new page based on set value from a previous page session variable
    if (typeof sessionStorage.getItem("fontSize") !== 'undefined') {
        let fontSize = sessionStorage.getItem("fontSize");
        fontSize = Number(fontSize);
        rootElement.style.fontSize = fontSize + "px";
    }

    // Change font size buttons
    document.getElementById('increase-font-size-button').addEventListener('click', increaseFontSize);
    document.getElementById('decrease-font-size-button').addEventListener('click', decreaseFontSize);
    document.getElementById('offcanvas-increase-font-size-button').addEventListener('click', increaseFontSize);
    document.getElementById('offcanvas-decrease-font-size-button').addEventListener('click', decreaseFontSize);

    // Change contrast buttons
    document.getElementById('increase-contrast-button').addEventListener('click', increaseContrast);
    document.getElementById('decrease-contrast-button').addEventListener('click', decreaseContrast);
    document.getElementById('offcanvas-increase-contrast-button').addEventListener('click', increaseContrast);
    document.getElementById('offcanvas-decrease-contrast-button').addEventListener('click', decreaseContrast);
}


// Runs init function
window.onload = init;
