var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var angle = -30 ;
gravity = 0.5
friction = 0.5;
var bulletsArray = [];
var c = canvas.getContext('2d');
var targetsArray = [];
 function sin(a) {
     return Math.sin(a * Math.PI / 180);
 }
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function inRad(num) {
	return num * Math.PI / 180;
}

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowDown') {
        angle = angle + 1;
       
    }
    if (event.code == 'ArrowUp') {
        angle = angle - 1;
    }
    if ( event.code == 'Space') {
        gun.shoot();
        console.log('shoot');
    }
  }); 
function Bullet(dx, dy) {
    this.dx = dx;
    this.dy = dy;
    // TODO make the bullets start from the center
    // probably it should be changed through in "gun" update
    this.x =  40 + gun.size * Math.cos(Math.abs(inRad(angle)));
    this.y =  600 + gun.size * Math.sin((inRad(angle)));
    this.rad = 10;
    this.color = 'red';

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        console.log(this.x)
    }

    this.update = function() {
        if ( this.x + this.rad > innerWidth || this.x - this.rad < 0 ) {
            this.dx = -this.dx;
        } 
        if ( this.y + this.rad > innerHeight || this.y - this.rad < 0 ) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
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
    this.update = function () {
        if ( this.x + this.rad > innerWidth || this.x - this.rad < 0 ) {
            this.dx = -this.dx;
        } 
        if ( this.y + this.rad > innerHeight || this.y - this.rad < 0 ) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}



function Gun (x,y) {
    this.x = x;
    this.y = innerHeight - 50 * y;
    this.size = 250;
    this.color = 'black';
    this.width =  this.size;
    this.height = this.size / 2;

    this.draw = function() {
        // c.fillStyle = this.color;
        // c.fillRect( this.x, this.y, this.width, this.height)
    }
    this.update = function() {
        c.save(); 
        c.translate(40, 600);
        c.rotate(inRad(angle));
        c.strokeStyle = "green";
        c.strokeRect(0, 0, this.width, this.height);
        // c.fillStyle= 'black';
        // c.fillRect( 0, 0, this.width, this.height);
        c.restore(); 
    }
    this.shoot = function () { 
        bulletsArray.push( new Bullet(10, 10));
    }
}
var gun = new Gun(10, 10);
function init() {
    for (let i = 0; i < 5; i++) {
        let x = getRandomInt(30, innerWidth - 30);
        let y = getRandomInt(30, innerHeight - 30);
        let rad = getRandomInt(10, 20);
        let dx = getRandomInt(-1, 1);
        let dy = getRandomInt(-1, 1);
        targetsArray.push(new Target(x, y, dx, dy, rad, 'blue'));    
         
    }
    // function targetAppears () {
    //     let x = getRandomInt(30, innerWidth - 30);
    //     let y = getRandomInt(30, innerHeight - 30);
    //     let rad = getRandomInt(1, 20);
    //     targetsArray.push(new Target(x, y, rad, 'blue'));   
    // }

}

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
    }
    gun.draw();
    gun.update();

}
init();
animate();