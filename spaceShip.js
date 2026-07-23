
function SpaceShip(){

    this.name = "Space Ship (3D)";

    this.smallSize = 4.25;
    this.bigSize = 10;

    this.amp = new p5.Amplitude();
    this.fft = new p5.FFT();


this.draw = function(){

    //Make sure the camera is in the normal position
    camera();

    // Ensures the view of the spacecraft is visible
    this.positionZ = -75;

    rotateX(0);
    rotateY(0);
    rotateZ(0);

    // Make Sure the colormode is in RGB
    colorMode(RGB);

    background(0)

    // For the WormHole, the stroke ensures it's edges aren't too thick while the perspective ensures the camera is near the wormholeto take a good shot
    strokeWeight(0.5);
    perspective(PI/45.0, width/height, 200, 5000);
    translate(0,0, this.positionZ);

    // Renders the WormHole
    this.wormHole();

    // Renders the Spaceship
    this.spaceShip();

    }

    
    // Code for the Spaceship
    this.spaceShip = function(){

        // Angle Mode for the Radians
        angleMode(RADIANS);
        noFill();

        // Translate the spaceship back
        translate(0, 0, -250)

        //Map the Music
        volume = this.amp.getLevel();
        this.ufoBeat = map(volume, 0, 1, 12, 30);

        // Changing Color for the lights
        this.r = sin(millis() * 0.01) * 127 + 128;
        this.g = cos(millis() * 0.01 + PI / 3) * 127 + 128;
        this.b = sin(millis() * 0.01 + PI / 2) * 127 + 128;

        // Spaceship rotation while moving through the wormhole
        this.spaceShipRotation = frameCount * 0.01;


        noStroke();

        // Space ship rotation 
        rotateX(this.spaceShipRotation);
        rotateY(this.spaceShipRotation);
        rotateZ(this.spaceShipRotation);

        // Ambient Light (or dark in this case)
        ambientLight(130);

        // Ambient Material for the UFO
        ambientMaterial(fill(this.r), fill(this.g), fill(this.b));

        // Texture for the UFO Sphere
        texture(ufoBall);

        // The UFO Sphere
        sphere(this.bigSize);

        // Ellipsoid beats to the music
        ellipsoid(this.ufoBeat  + 12, -4.5, this.ufoBeat + 12);

        //Spaceship Lights
        fill(this.r, 0, this.b);
        translate(-15, 0, 0);
        sphere(this.smallSize);
        fill(this.r, 0, 0);
        translate(30, 0, 0);
        sphere(this.smallSize);
        fill(this.r, this.g , 0);
        translate(-15, 0, -15);
        sphere(this.smallSize);
        fill(0, this.g, this.b);
        translate(0, 0, 30);
        sphere(this.smallSize);

        
    }
    

    // Code for the Wormhole
    this.wormHole = function(){

    this.angle = 10;
    let wormholeRadius = 120;
    let segments = 42;
    let rings = 25;
    let swirlAmount = 60;
    let swirlSpeed = 0.08;

    // To ensure the camera is near the wormhole so that the swirling effect is more notiecable.
    strokeWeight(0.1);

    // Positioning the wormhole
    rotateZ(this.angle);
    
  
    noStroke();
    
    stroke(0, 210, 255);

    noFill();
    
    // This is to ensure the wormhole swirls from left to right continuously
    for (let z = 0; z < rings; z++) {

        let zPosition = map(z, 0, rings - 1, 0, -2000);
        let perspectiveScale = map(zPosition, 0, -2000, 1, 0.3);
        this.radius = wormholeRadius * perspectiveScale;
        
        // Calculating the swirl offset for this ring
        let timeOffset = frameCount * swirlSpeed;
        let swirlX = sin(z * 0.3 + timeOffset) * swirlAmount * perspectiveScale;
        let swirlY = cos(z * 0.3 + timeOffset) * swirlAmount * perspectiveScale;
        
        push();
        translate(swirlX, swirlY, 0);
        
        // Drawing the circular connections
        beginShape(LINES);

        for (let i = 0; i <= segments; i++) {
        let theta = (i / segments) * TWO_PI;
        let nextTheta = ((i + 1) / segments) * TWO_PI;
        
        // Adding the spiral effect to radius
        let spiralOffset = (zPosition * 0.001 + frameCount * 0.01);
        let r1 = this.radius * (1 + sin(theta * 2 + spiralOffset) * 0.2);
        let r2 = this.radius * (1 + sin(nextTheta * 2 + spiralOffset) * 0.2);
        
        let x1 = cos(theta) * r1;
        let y1 = sin(theta) * r1;
        let x2 = cos(nextTheta) * r2;
        let y2 = sin(nextTheta) * r2;
        
        // Drawing the current ring segment
        vertex(x1, y1, zPosition);
        vertex(x2, y2, zPosition);
        
        // Drawing the connections to the next ring
        if (z < rings - 1) {
            let nextZ = map(z + 1, 0, rings - 1, 0, -2000);
            let nextScale = map(nextZ, 0, -2000, 1, 0.3);
            let nextRadius = wormholeRadius * nextScale;
            
            // We calculate the next ring's swirl offset
            let nextSwirlX = sin((z + 1) * 0.3 + timeOffset) * swirlAmount * nextScale;
            let nextSwirlY = cos((z + 1) * 0.3 + timeOffset) * swirlAmount * nextScale;
            
            let nextR = nextRadius * (1 + sin(theta * 2 + spiralOffset + 0.1) * 0.2);
            let x3 = cos(theta) * nextR + (nextSwirlX - swirlX);
            let y3 = sin(theta) * nextR + (nextSwirlY - swirlY);
            
            vertex(x1, y1, zPosition);
            vertex(x3, y3, nextZ);
            vertex(x2, y2, zPosition);
            
            // Adding cross connections for more structure
        
            if (i % 2 == 0) {
            let nextR2 = nextRadius * (1 + sin(nextTheta * 2 + spiralOffset + 0.1) * 0.2);
            let x4 = cos(nextTheta) * nextR2 + (nextSwirlX - swirlX);
            let y4 = sin(nextTheta) * nextR2 + (nextSwirlY - swirlY);
            vertex(x1, y1, zPosition);
            vertex(x4, y4, nextZ);
            }
        }

        }

        endShape();
        pop();

    }
    
    
    // Rotating the wormhole :)
    this.angle += 0.01;
        
    } 
    
}


  