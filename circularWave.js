
function CircularWave(){

    this.name = "Circular Wave (2D)"

    // Initializes the flowing Waves
    this.start = 0;

    // Amplitude for the Music
    this.amp = new p5.Amplitude();

    // Color for the background
    this.color = color(0,0,60);


this.draw = function(){

    // Renders the waves in the middle of the canvas and the color Mode is RGB
    translate(width / 2, height / 2);
    colorMode(RGB);

    // Shadow Blur is set to 0 so other extensions wouldn't mess with it
    drawingContext.shadowBlur = 0;

    // AngleMode is set in Degrees
    angleMode(DEGREES);
    noiseDetail(2, 1);


    // Color of the background and no stroke
    background(this.color);
    noStroke();

    // Maps the Music
    var vol = this.amp.getLevel();
    var diam = map(vol,0,0.3,50,200);
    

    // Space between Waves
    var space = 0.1;

    // Renders the Waves
    for (var i = 0; i < 360; i += space){

        // X and Y Offsets of the waves
        var xoff = map(cos(i), -1, 1, 0, 3);
        var yoff = map(sin(i), -1, 1, 0, 3);

        // Noise
        var n = noise(xoff + this.start, yoff + this.start);

        // Height
        var h = map(n, 0, 1, -150, 150);


        // specifies colors to the waves
        this.red = map(sin(i), -1, 1, 100, 200);
        this.green = map(h, -150, 150, 0, 150);
        this.blue = map(n, 0, 1, 150, 255);

        // Rotates depending on the value of space
        rotate(space)

        // Fills the waves with the colors
        fill(this.red,this.green,this.blue);
        
        // Draws the waves
        rect(150, 0, h, diam)

        // Start adds the below value to itself
        this.start += 0.0000005;
    }

    }

    // Set it always to the middle
    translate(0,0); 
}
    

