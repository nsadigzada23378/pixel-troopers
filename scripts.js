/*
    Code sample for SITE 1101 Principles of Information Systems 
    (c)2024 by Araz Yusubov 
    DISCLAIMER: All code examples we will look at are quick hacks intended to present working prototypes.
    Hence they do not follow best practice of programming or software engineering.    
*/

// Global variables for Artist's position and orientation
var x, y;
var angle;
var counter = 3;

function radian(degree) {
    return degree * Math.PI / 180;
}

function moveForward(distance, context) {
    let a = radian(angle);
    x = x + distance * Math.cos(a);
    y = y + distance * Math.sin(a);
    context.lineTo(x, y);    
}

function turnRight(degree) {
    angle = angle - degree;
    if (angle < 0) angle = angle + 360;
}

function turnLeft(degree) {
    angle = angle + degree;
    if (angle > 360) angle = angle - 360;
}

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}


function DrawSpiral(context) {
    // Inspired by Express Course (2024) Lesson 29: For Loops with Artist
    // https://studio.code.org/s/express-2024/lessons/29/levels/5

    // The initial position is in the center of the canvas
    x = context.canvas.width / 2;
    y = context.canvas.height / 2;
    // The initial orientation is zero degrees i.e. facing East
    angle = 0.0; 
    context.moveTo(x, y);
    context.beginPath();
    
    context.strokeStyle = randomColor();

    function animate() {
        if (counter < 600) {
            moveForward(counter, context);    
            context.stroke();                
            turnRight(89);                    
            context.strokeStyle = randomColor();
            counter += 1; 
            requestAnimationFrame(animate);
        }
    }
    animate(); 
}


document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("showButton");
    const image = document.getElementById("jumpingImage");
    const text = document.getElementById("imageText");
    const sound = document.getElementById("buttonSound");  
    
    sound.oncanplaythrough = function() {
        console.log("Sound loaded successfully");
    };
    sound.onerror = function() {
        console.log("Error loading sound");
    };

    button.addEventListener("click", function() {
        console.log("Button clicked!"); 
        sound.play(); 
        console.log("Playing sound...");
        image.style.display = "block"; 
        text.style.display = "block";
       
        image.classList.add("jump");

        
        setTimeout(() => {
            image.classList.remove("jump");

           
            image.classList.add("fade");


            setTimeout(() => {
                image.style.display = "none";
                text.style.display = "none";
            }, 1000);
        }, 300); 
    });
});