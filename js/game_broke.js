// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 520;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Toaster image
var toasterReady = false;
var toasterImage = new Image();
toasterImage.onload = function () {
	toasterReady = true;
};
toasterImage.src = "images/toaster.png";

// Toast image
var toastReady = false;
var toastImage = new Image();
toastImage.onload = function () {
	toastReady = true;
};
toastImage.src = "images/toast.png";

// Game objects
var toaster = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a toast
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 5;

	// Throw the monster somewhere on the screen randomly
	toast.x = 32 + (Math.random() * (canvas.width - 64));
	toast.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		//hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		//hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		toaster.x <= (toast.x + 32)
		&& toast.x <= (toaster.x + 32)
		&& toaster.y <= (toast.y + 32)
		&& toast.y <= (toaster.y + 32)
	) {
		++toastsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (toasterReady) {
		ctx.drawImage(toasterImage, toaster.x, toaster.y);
	}

	if (toastReady) {
		ctx.drawImage(toastImage, toast.x, toast.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Toast caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
