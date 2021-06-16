"use strict"

let canvas = document.querySelector("#canvas");
let fps = document.querySelector("#fps");
let ctx = canvas.getContext("2d");
let width = 400; let height = 600;
canvas.style.background = "white"; canvas.width = width; canvas.height = height; 

let step = 25;
let paintGrid = () => {
	ctx.beginPath();
	ctx.strokeStyle = "grey";

	for (let i=width-step; i > 0; i-=step ) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, height);
	}

	for (let i=height-step; i > 0; i-=step ) {
		ctx.moveTo(0, i);
		ctx.lineTo(width, i);
	}
	ctx.stroke();
}

class Point {
	fillColor = 'yellow';
	constructor (x,y) {
		this.x = x * step;
		this.y = y * step;
	}

	shiftPoint(x,y) {
		this.x = x; 
		this.y = y;
	}

	paint() {
		ctx.fillStyle = this.fillColor;
		ctx.fillRect(this.x, this.y, step, step);
	}
}

class Unit {
	constructor(x, y, shape, color) {
    console.log(shape)
		switch (shape) {
			case 'cube':
				this.points = [new Point(x,y), new Point(x+1,y), new Point(x,y+1), new Point(x+1,y +1)]
				break;
			case 'long':
				this.points = [new Point(x,y), new Point(x+1,y), new Point(x+2,y), new Point(x+3,y)]
				break;
			case 'triangle':
				this.points = [new Point(x+1,y), new Point(x,y+1), new Point(x+1,y+1), new Point(x+2,y+1)]
				break;
		}

		for (let i in this.points) {
			this.points[i].fillColor = color;
		}
	}

	moveUnit (type) {
		for (let i in this.points) {
			switch (type) {
				case 'left':
					this.points[i].shiftPoint(this.points[i].x - step, this.points[i].y);
					break;
				case 'right':
					this.points[i].shiftPoint(this.points[i].x + step, this.points[i].y);
					break;
				case 'up':
					this.points[i].shiftPoint(this.points[i].x, this.points[i].y - step);
					break;
				case 'down':
					this.points[i].shiftPoint(this.points[i].x, this.points[i].y + step);
					break;
			}
		}
	} 

	shiftUp () {
		this.moveUnit('up');
	}
	shiftDown () {
		this.moveUnit('down');
	}
	shiftLeft () {
		this.moveUnit('left');
	}
	shiftRight () {
		this.moveUnit('right');
	}

	paint() {
		for (let i in this.points ) {
			this.points[i].paint();
		}
	}
}

let cubic = new Unit(1,1, 'cube', 'yellow');
let long = new Unit(5,5, 'long', 'blue');
let triangle = new Unit(10,10, 'triangle', 'purple');

function left () {
	cubic.shiftLeft(); 
}

function right () {
	cubic.shiftRight(); 
}

function up () {
	cubic.shiftUp(); 
}

function down () {
	cubic.shiftDown(); 
}

let keydownHandler = (e) => {
	switch (e.code) {
		case 'ArrowUp':
			up();
			break;
		case 'ArrowDown':
			down();
			break;
		case 'ArrowLeft':
			left();
			break;
		case 'ArrowRight':
			right();
			break;
	}
}

document.addEventListener('keydown', keydownHandler);


function render() {
	ctx.clearRect(0, 0, width, height);
	paintGrid();
	cubic.paint();
	long.paint();
	triangle.paint();
	requestAnimationFrame(render);
}

render();
