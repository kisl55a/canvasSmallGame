var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var gun = new Gun(10, 10);
var angle = -30;
const gravity = 0.5
const friction = 0.5;
const gunPositionX = 10;
const gunPositionY = 780;
let score = 0;
let counter = 0;
let level = 0;
let numberOfBalls = 5;
console.log(innerHeight, innerWidth);
var bulletsArray = [];
var targetsArray = [];
var c = canvas.getContext('2d');
// Important functions
function sin(a) {
    return Math.sin(a * Math.PI / 180);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function inRad(num) {
    return num * Math.PI / 180;
}
// Mouse and its eventlistener
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
// Keyboard added
document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowDown') {
        angle = angle + 1;

    }
    if (event.code == 'ArrowUp') {
        angle = angle - 1;
    }
    if (event.code == 'Space') {
        gun.shoot();
        console.log('shoot');
    }
});
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
// Physics of Bullet
function Bullet(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    // TODO make the bullets start from the center
    // probably it should be changed through in "gun" update
    // Should be connected with gun appearence, because now it's kinda hardcoded
    this.x = gunPositionX + gun.size * Math.cos((inRad(angle)));
    this.y = gunPositionY + gun.size * Math.sin((inRad(angle)));
    this.rad = 10;
    this.color = 'red';

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.fillStyle = this.color;

        c.fill();
        //console.log(this.x)
    }
    // Controls the reflection and physics of these things
    this.update = function () {
        if (this.x + this.rad > innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.rad > innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        this.dx = 50 * Math.cos((inRad(angle)));
        this.dy = 50 * Math.sin((inRad(angle)));
        this.x += this.dx;
        this.y += this.dy;
    }
}

function Target(x, y, dx, dy, rad, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    // Controls the reflection and physics of these things
    this.update = function () {
        if (this.x - this.rad < 10 && this.rad != 0) {
            resetGame();
            this.dx = -this.dx;
        }
        if (this.y + this.rad > innerHeight || this.y - this.rad < 10) {
            this.dy = -this.dy
        } else {
            // this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}



function Gun(x, y) {
    this.x = x;
    this.y = innerHeight - 50 * y;
    this.size = 250;
    this.color = 'black';
    this.width = this.size;
    this.height = this.size / 2;

    this.draw = function () {
    }
    // Rotates the gun
    this.update = function () {
        c.beginPath();
        c.arc(this.x + 70, this.y * 2.5, 100, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.save();
        c.translate(gunPositionX, gunPositionY);
        c.rotate(inRad(angle));
        c.fill();
        // c.strokeStyle = "green";
        // c.strokeRect(this.width / 6, -this.height / 4, this.width , this.height/2);
        c.fillStyle = 'black';
        c.fillRect(this.width / 6, -this.height / 4, this.width, this.height / 2);
        c.restore();
        c.font = "30px Arial";
        c.fillText("Your score: " + score + "", 10, 50);
        c.fillText("Your level: " + level + "", 10, 85);
    }
    this.shoot = function () {
        bulletsArray.push(new Bullet(10, 10));
    }
}
function init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
        let x = getRandomInt(innerWidth, innerWidth + 30);
        let y = getRandomInt(0, innerHeight - 20);
        let rad = getRandomInt(30, 50);
        let dx = getRandomInt(-1, 0);
        let dy = getRandomInt(2, -2);
        targetsArray.push(new Target(x, y, dx, dy, rad, 'blue'));

    }
    // function targetAppears () {
    //     let x = getRandomInt(30, innerWidth - 30);
    //     let y = getRandomInt(30, innerHeight - 30);
    //     let rad = getRandomInt(1, 20);
    //     targetsArray.push(new Target(x, y, rad, 'blue'));   
    // }

}
function resetGame() {
var r = confirm("You lose! Start again?");
if (r == true) {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     gun = new Gun(10, 10);
     angle = -30;
     score = 0;
     counter = 0;
     level = 0;
     targetsArray = [];
     numberOfBalls = 5;
     init(numberOfBalls);
} else {
  txt = "You pressed Cancel!";
} 
}
// Function that animates the whole program
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let index = 0; index < targetsArray.length; index++) {
        targetsArray[index].update();
        targetsArray[index].draw();
    }
    for (let index = 0; index < bulletsArray.length; index++) {
        bulletsArray[index].update();
        bulletsArray[index].draw();
        for (let j = 0; j < targetsArray.length; j++) {
            if (getDistance(bulletsArray[index].x, bulletsArray[index].y, targetsArray[j].x, targetsArray[j].y) < bulletsArray[index].rad + targetsArray[j].rad && targetsArray[j].rad != 0) {
                console.log('connect', score);
                targetsArray[j].rad = 0;
                counter += 1;
                score += 10;
                if (counter == targetsArray.length) {
                    level += 1;
                    numberOfBalls += 1;
                    init(numberOfBalls);
                }
            }
        }
    }
    gun.draw();
    gun.update();
}
init(numberOfBalls);
animate();