/*
GRIFFIN TOAL 
02/19/18

griffintoal.com
COPYRIGHT 2018
*/
//CANVAS
const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');


//CAMERA SIZE
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//CHANGE TO CUSTOMIZE
const CIRCLE_COUNT = 90;
const MAX_RADIUS = 40;
const FLY_SPEED = 3;
var colorArray = [
    "#003a65",
    "#009085",
    "#000",
    "#960088"
];
var circleArray = [];


//MOUSE LOCATION
var mouse = {
    x: undefined,
    y: undefined
}

//MOUSE DETECTION FUNCTION
window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

//TOUCH DETECTION FUNCTION
//window.addEventListener("click", function (event) {
//
//});

//BUILD
function initialize() {
    circleArray = [];
    for (var i = 0; i < CIRCLE_COUNT; i++) {
        var radius = Math.random() * 4 + 1;
        var x = (Math.random() * (innerWidth - radius * 2) + radius);
        var y = (Math.random() * (innerHeight - radius * 2) + radius);
        var dx = (Math.random() - 0.5) * FLY_SPEED;
        var dy = (Math.random() - 0.5) * FLY_SPEED;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
    animate();
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initialize();
});

//CUSTOM OBJECT
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = Math.random() + 1;
    this.radius = radius;
    var ran = Math.random();
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "white";
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //inner activity
        if (mouse.x - this.x < 10 && mouse.x - this.x > -10 && mouse.y - this.y < 10 && mouse.y - this.y > -10 && this.radius < MAX_RADIUS) {
            this.radius += 1;
            //grow
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

// CIRCLE BUILD SYNTAX
//var circle = new Circle(200, 200, 30, 30, 30);


//MOVE
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < CIRCLE_COUNT; i++) {
        circleArray[i].update();
    }
}


//Callbacks
initialize();
