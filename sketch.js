//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

let canvas;


function preload() {

    //Sound File
	sound = loadSound('assets/song.mp3');       

    // For the Ball in ballRIngs.js
    spaceBall = loadImage('assets/space.webp');
    
    // For the Spaceship in spaceShip.js
    ufoEllipsoid = loadImage('assets/spaceShip.jpg');

    // For the Spaceship in spaceShip.js
    ufoBall = loadImage('assets/ufoBall.jpg');

}

// Function to switch between 2D and 3Dg
function createCustomCanvas(renderer) {

    if (renderer === 'WEBGL') {
      canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    } else if (renderer === '2D'){
      canvas = createCanvas(windowWidth, windowHeight, P2D);
    }
  }

function setup() {

    //Switches the Canvas
    canvas = createCustomCanvas('2D');

    //Creates a new object and stores it in the controls constant
    controls = new ControlsAndInput();

    //Loops the Song
    sound.loop();

	 //instantiate the fft object
	fourier = new p5.FFT();

    vis = new Visualisations();

    //2D
    vis.add(new WavePattern());     // Template Extension
    vis.add(new CircularRings());   // Previous Extension
    vis.add(new CircularWave());    // Previous Extension


    //3D  
    vis.add(new GlowingCubes());      // New Extension
    vis.add(new BallRings());         // New Extension
    vis.add(new AngryFace());         // Previous Extension
    vis.add(new HexagonalTunnel());   // (Updation of Previous Extension)                    
    vis.add(new SpaceShip());         // New Extension
    vis.add(new BouncingSquares());   // New Extension

    console.log(canvas);
}

function draw() {

    background(0);

    // Draws the Visuals
    vis.selectedVisual.draw();

    //Check to see which number it is and to draw the relevant controls.

        if (keyCode < 52 && keyCode != 32){

            controls.draw();

        } 

}

// Only works in 2D, this stops the music when the playback button is clicked
function mouseClicked(){
	controls.mousePressed();
}

// Some Mnaipulation has been done here, the code has been changed to accomadate 2D/3D switching.
function keyPressed(){

	controls.keyPressed(keyCode);

    // Switch between 2D and 3D (Only works from 2D to 3D and not vice versa);
    if (keyCode > 48 && keyCode < 52){

        canvas = createCustomCanvas('2D');

    }else if (keyCode >= 52 && keyCode < 58){

        canvas = createCustomCanvas('WEBGL')

    }

    // Only for 3D, Pressing the Space Bar to stop the music

    if (keyCode == 32){

        if (sound.isPlaying()){
            sound.pause();
        } else {
            sound.play();
        }
    }

    // This is for the user to escape the Canvas quickly providing a fast exit.

    if (keyCode == 27){

        alert('Thank you for your time!')

        remove();
    }

}
  

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}


