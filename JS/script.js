//target container and cursor
const crosshair = document.querySelector('.cursor');
const myContainer = document.querySelector(".container");
const myTarget = document.querySelector('.duck');
const myTarget2 = document.querySelector('.duck2');
const score = document.querySelector(".counter");
var ctr = 0;

// Set event on mousemove when inside the container.
myContainer.addEventListener('mousemove', moveCursor);
myContainer.addEventListener('touchmove', moveCursor); // Add touchmove event

// Set event on click
myContainer.addEventListener('click', shotFired);
myContainer.addEventListener('touchstart', shotFired); // Add touchstart event

// Randomize y value for target
myContainer.addEventListener("animationiteration", setTargetHeight);

// Target hit
myTarget.addEventListener("mouseover", grow);
myTarget.addEventListener("mouseout", shrink);
myTarget.addEventListener("click", hit);
myTarget.addEventListener("touchstart", hit); // Add touchstart event

myTarget2.addEventListener("mouseover", grow);
myTarget2.addEventListener("mouseout", shrink);
myTarget2.addEventListener("click", hit2);
myTarget2.addEventListener("touchstart", hit2); // Add touchstart event

function moveCursor(e) {
    let cursorX, cursorY;
    if (e.type === 'mousemove') {
        cursorX = e.clientX - myContainer.getBoundingClientRect().left - 90;
        cursorY = e.clientY - myContainer.getBoundingClientRect().top - 90;
    } else if (e.type === 'touchmove') {
        e.preventDefault(); // Prevent default touch behavior
        cursorX = e.touches[0].clientX - myContainer.getBoundingClientRect().left - 90;
        cursorY = e.touches[0].clientY - myContainer.getBoundingClientRect().top - 90;
    }
    crosshair.style.transform = 'translate(' + cursorX + 'px,' + cursorY + 'px)';
}

function setTargetHeight() {
    myTarget.style.opacity = "1";
    myTarget.style.top = Math.random() * 200 + "px";
    myTarget.style.left = Math.random() * 200 + "px";
    myTarget2.style.opacity = "1";
    myTarget2.style.right = Math.random() * 200 + "px";
    myTarget2.style.bottom = Math.random() * 200 + "px";
}

function shotFired(e) {
    var audio = new Audio('SOUND/gun-shot.mp3');
    audio.play();

    let clickX, clickY;

    if (e.type === 'click') {
        clickX = e.clientX - myContainer.getBoundingClientRect().left;
        clickY = e.clientY - myContainer.getBoundingClientRect().top;
    } else if (e.type === 'touchstart') {
        e.preventDefault(); // Prevent default touch behavior
        clickX = e.touches[0].clientX - myContainer.getBoundingClientRect().left;
        clickY = e.touches[0].clientY - myContainer.getBoundingClientRect().top;
    }

    // Move the cursor to the click position
    crosshair.style.transform = 'translate(' + (clickX - 75) + 'px,' + (clickY - 75) + 'px)';

    // Check if the click hits the duck
    if (clickX >= myTarget.offsetLeft && clickX <= myTarget.offsetLeft + myTarget.offsetWidth &&
        clickY >= myTarget.offsetTop && clickY <= myTarget.offsetTop + myTarget.offsetHeight) {
        hit();
    } else if (clickX >= myTarget2.offsetLeft && clickX <= myTarget2.offsetLeft + myTarget2.offsetWidth &&
        clickY >= myTarget2.offsetTop && clickY <= myTarget2.offsetTop + myTarget2.offsetHeight) {
        hit2();
    }
}

function hit(e) {
    console.log("Hit!!!");
    ctr++;
    score.innerHTML = "SCORE: " + ctr;
    myTarget.style.opacity = "0";
    var audio2 = new Audio('SOUND/duck-caught.mp3');
    audio2.play();
}

function hit2(e) {
    console.log("Hit!!!");
    ctr++;
    score.innerHTML = "SCORE: " + ctr;
    myTarget2.style.opacity = "0";
    var audio2 = new Audio('SOUND/duck-caught.mp3');
    audio2.play();
}

function grow() {
    myTarget.style.transform = "scale(1.2)";
    myTarget2.style.transform = "scale(1.2)";
}

function shrink() {
    myTarget.style.transform = "scale(1)";
    myTarget2.style.transform = "scale(1)";
}
