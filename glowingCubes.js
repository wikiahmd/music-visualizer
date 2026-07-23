function GlowingCubes() {

    this.name = "Glowing Cubes (3D)";

    this.cubes = [];

    this.tunnelRotation = 0;

    // Amplitude for the Music
    this.amp = new p5.Amplitude();

    this.angle2 = 0

    this.draw = function() {

    // Color Mode (HSB) and Angle in RADIANS
    colorMode(HSB);
    angleMode(RADIANS);

    // Sizes for the small and big cubes
    this.size1 = random(100, 150);              // Small Cubes
    this.size2 = random(100, 200);              // Big Cubes

    perspective(PI / 3, width / height, 0.1, 1000);      // Sets the Camera Perspective to normal
    background(0);

    translate(0,0,0);

    //This is the code for the tunnel functionalities
    this.cubeTunnel();
    
    //This is the code for adding the cubes
    this.addCubes();

    //This is the code for the cube structure
    this.cubeStructure();

    //This is the code for the cube limit
    this.cubeLimit();

    // This is the code for the glowing point within the middle of the screen that the camera is going to
    translate(0, 0, -1000);
    this.renderGlowingPoint();


    // Ensures the Cubes are filled and have light upon them so they are visible
    fill(272, 61, 34);
    ambientLight(255);
    }

    // Renders the Cube Tunnel
    this.cubeTunnel = function(){

    // Sets the Camera Position
    camera(0, 0, -50, 0, 0, -300, 0, 1, 0);
    
    // Rotates the Tunnel on the Z axis
    rotateZ(this.tunnelRotation);
    this.tunnelRotation += 0.01;

    }

    // Adds cubes to the Canvas
    this.addCubes = function(){

        //Spawn Cubes
        if (frameCount % 3 === 0) { 
            for (let i = 0; i < 10; i++) { 
            this.angle1 = random(TWO_PI);
            this.radius1 = random(145, 300); 
            this.cubes.push({
                pos: createVector(
                cos(this.angle1) * this.radius1,
                sin(this.angle1) * this.radius1,
                -450 
                ),
                size: this.size2, 
                color: color(random(360), 100, 100),
                rotSpeed: random(0.01, 0.03)

            });
            }
    }
    }

    //Cube Structure 
    this.cubeStructure = function(){


    // Mapping the Music
    var volume = this.amp.getLevel();
    var beat = map(volume, 0, 1, 5, 60);

    //Draw Cubes
    for (let i = this.cubes.length - 1; i >= 0; i--) {
        let cube = this.cubes[i];
        
        // Move cubes forward
        cube.pos.z += 5 + beat; 
        
        // Remove cubes that are too close or too far
        if (cube.pos.z > 200) {
        this.cubes.splice(i, 1);
        continue;
        }

        push();
        translate(cube.pos.x, cube.pos.y, cube.pos.z);
        
        // Calculate distance-based opacity
        let distanceFromCamera = abs(cube.pos.z + 50); 
        let opacity = map(distanceFromCamera,0, 1000, 1, 0);
        
        // Add color and light to the outer cubes
        fill(272, 61, 34, opacity); 
        ambientLight(hue(cube.color), saturation(cube.color), brightness(cube.color))
        ambientMaterial(hue(cube.color), saturation(cube.color), brightness(cube.color), opacity * 0.3)
        strokeWeight(2);
        stroke(hue(cube.color), saturation(cube.color), brightness(cube.color));
        box(cube.size + beat);
        
        // Draw inner solid cube
        push();
        ambientMaterial(hue(cube.color), saturation(cube.color), brightness(cube.color), opacity * 0.8);
        noStroke();
        scale(0.7);
        box(cube.size + beat);
        pop();
        
        pop();
    }

    }

    
    //Cube Limit
    this.cubeLimit = function(){

        if (this.cubes.length < 100) { 

            this.angle = random(TWO_PI);
            this.radius = random(150, 300);
            this.cubes.push({
            pos: createVector(
                cos(this.angle) * this.radius,
                sin(this.angle) * this.radius,
                -600
            ),
            size: this.size1,
            color: color(random(360), 100, 100),
            rotSpeed: random(0.01, 0.03)
            });
            
        }
    }
    
    // Function to render the glowing point in the middle
    this.renderGlowingPoint = function(){
        
        noFill();
        rotateZ(this.angle2);
        
        // After a while, the glow flickers to create a natural glowing effect
        let glow = abs(sin(frameCount * 0.05)) * 360;

        stroke(180, glow, glow);
        strokeWeight(8);

        // Render the glowing point
        beginShape();
        for (let a = 0; a < TWO_PI; a += PI / 5) {
            let r = 1000;
            let x = cos(a + 100) * r;
            let y = sin(a + 100) * r;
            vertex(x, y, 0);
            let x2 = cos(a + 100);
            let y2 = sin(a + 100);
            vertex(x2, y2, 0);
        }
        endShape();

        this.angle2 += 0.04;

    }
}






