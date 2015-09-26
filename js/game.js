// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 492;
canvas.height = 492;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/toaster.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/toast.png";

// Game objects
var hero = {
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

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = 7*(canvas.height / 8);

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
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
		if (hero.x <= 0) {
		    hero.x = 0;
		}
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if (hero.x >= 455) { // not sure why canvas width does not match
		    hero.x = 455;
		}
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

var noOfMonsters = 5;

//TODO make the toast fall from the top of the screen
//TODO heart life tracking
//TODO increase difficulty of game as time goes on
//TODO store sprites in array and "randomly" pick sprite to drop + speed

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	/*if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}*/
	for (var i = 0; i < noOfMonsters; i++) {
	    ctx.drawImage(monsterImage, monster.x, monster.y) //the toast
	    monster.y += monster.speed; //Set the falling speed
        if (monster.y > 450) {  //Repeat the raindrop when it falls out of view
            monster.y = -25 //Account for the image size
            monster.x = Math.random() * 480;    //Make it appear randomly along the width 
	    }
	}

	// Score
	ctx.fillStyle = "rgb(0, 100, 200)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Foods caught: " + monstersCaught, 32, 32);
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
