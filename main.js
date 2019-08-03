var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var x1 = -30 ;
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
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        // console.log( Math.sin(mouse.x))  
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowDown') {
        x1 = x1 + 4;
       
    }
    if (event.code == 'ArrowUp') {
        x1 = x1 - 4;
       
    }
  }); 

function Gun (x,y) {
    this.x = x;
    this.y = innerHeight - 50 * y;
    this.size = 50;
    this.color = 'black';
    this.width =  this.size * 5;
    this.height = this.size * 2;

    this.draw = function() {
        // c.fillStyle = this.color;
        // c.fillRect( this.x, this.y, this.width, this.height)
    }
    this.update = function() {
        c.save(); 
        c.translate(40, 600);
        c.rotate(inRad(x1));
        // console.log(mouse.x, mouse.y);
        c.fillStyle= 'black';
        c.fillRect( 0, 0, this.width, this.height);
        c.restore(); 
        
    }
}
var gun = new Gun(10, 10)
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
    gun.draw();
    gun.update();

}
init();
animate();