var x =0;
var y = 0;

var initialX = 0;
var initialY = 0;

var touchStatue = false;

function setup(){
	x = windowWidth;
	y = windowHeight;

}
function windowResized(){
	x = windowWidth;
	y = windowHeight;
}
function touchEnded(){
	touchStatue =! touchStatue;
	console.log(touchStatue);
}

//left canvas
var left = function(sketch1){
	var aniWhite;
	var backgroundSound;

	sketch1.preload = function(){
		//preload the gif animation
		sketch1.aniWhite = sketch1.loadGif('assets/white.gif');
		//preload the sound effect
		sketch1.backgroundSound = sketch1.loadSound('assets/bg_music.mp3');
	}

	sketch1.setup = function(){
		// set the canvas size
		sketch1.createCanvas(x/2-10, y);	

		//set the bgmusic loop
		sketch1.backgroundSound.loop();
		sketch1.backgroundSound.setVolume(0.5);

		//get the image width and height
	}

	sketch1.draw = function(){
		sketch1.background('#fee096');
		// sketch1.imageMode(CENTER);
		sketch1.image(sketch1.aniWhite,0,0,sketch1.aniWhite.width,sketch1.aniWhite.height);
		// console.log(x,y);
	}

	sketch1.windowResized = function(){
		sketch1.resizeCanvas(x/2-10,y);
	}

}
new p5(left,'leftContainer');

//right canvas
var right = function(sketch2){
	var aniRed,aniHit;
	var sound, sound2;

	var randomP = 0;
	var timeout, interval;


	var imageShow = false;
	var imageStatue = false;

	var redCry = false;
	var crying;

	sketch2.preload = function(){
		// preload the gif animation
		sketch2.aniRed = sketch2.loadGif('assets/red_sing.gif');
		sketch2.aniHit = sketch2.loadGif('assets/red_cry.gif');

		//preload the sound effect
		sketch2.sound = sketch2.loadSound('assets/redSing.mp3');
		sketch2.sound2 = sketch2.loadSound('assets/soundEffect02.mp3');
	}

	sketch2.setup = function(){
		// set the canvas size
		sketch2.createCanvas(x/2-10, y);

		//the initial random number
		sketch2.randomNum(10,60);
		// the first time showing the triangle
		sketch2.timeout = setTimeout(sketch2.showImage,sketch2.randomP);
	}

	sketch2.randomNum = function(a,b){
		sketch2.randomP = sketch2.floor(sketch2.random(a,b))*1000;
		console.log('the random time is' + sketch2.randomP);
	}

	sketch2.showImage = function(){//the red triangle show
		sketch2.imageShow =! sketch2.imageShow;
		sketch2.sound.play();
		sketch2.interval = setInterval(sketch2.timeIt,5000);
	}

	sketch2.timeIt = function(){
		clearTimeout(sketch2.timeout);
		clearInterval(sketch2.interval);

		sketch2.imageShow =! sketch2.imageShow;

		sketch2.randomNum(1,10)
		sketch2.timeout = setTimeout(sketch2.showImage, sketch2.randomP);
	}

	sketch2.hit = function(){
		sketch2.sound2.play();
		sketch2.sound.stop(0);

		clearTimeout(sketch2.timeout);
		clearInterval(sketch2.interval);
		
		sketch2.imageShow =! sketch2.imageShow;
		touchStatue =! touchStatue;

		sketch2.red_cry =! sketch2.red_cry;
		sketch2.cry(2);
	}

	sketch2.cry = function(n){
		sketch2.crying = setTimeout(sketch2.cryEnd,n*1000);
	
	}

	sketch2.cryEnd = function(){
		clearTimeout(sketch2.crying);
		sketch2.red_cry =! sketch2.red_cry;

		sketch2.randomNum(1,10)
		sketch2.timeout = setTimeout(sketch2.showImage, sketch2.randomP);
	}

	sketch2.draw = function(){
		if(sketch2.imageShow){//no hit

			if(touchStatue){
				sketch2.hit();

			}else{
				sketch2.background('#fee096');
				sketch2.image(sketch2.aniRed,0,0,sketch2.aniRed.width,sketch2.aniRed.height);
				sketch2.imageStatue = true;
			}

		}else{
			sketch2.background('#fee096');
			sketch2.imageStatue = false;
		}

		if(sketch2.red_cry){
			sketch2.background('#fee096');
			sketch2.image(sketch2.aniHit,0,0,sketch2.aniHit.width,sketch2.aniHit.height);
		}

	}

	sketch2.windowResized = function(){
		sketch2.resizeCanvas(x/2-10,y);
	}

}
new p5(right,'rightContainer');