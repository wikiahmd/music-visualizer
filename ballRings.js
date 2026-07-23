
function BallRings(){

    this.angle += 10;   

    this.name = "Ball Rings (3D)";

    // Initialize the axis of the rings on the Y axis
    this.ringsY = 0;

    // Size of the Sphere
    this.size = 60;

    // Amplitude for the Music
    this.amp = new p5.Amplitude();

    this.ballY = 0;

    // Number of Rings
    this.numberRings = 4;

    // Color Initialization
    this.hueValue = 0;


    this.draw = function(){

        // Angle Mode is in Radians, the perspective is set to normal and the color is changed to HSL
        angleMode(RADIANS);
        perspective(PI / 3, width / height, 0.1, 1000); 
        colorMode(HSL, 360, 100, 100);

        rotateY(HALF_PI);
        background(240, 100, 7);

        // Sets the camera to the normal position
        camera();

        // Ensures the objects are on the middle of the screen
        translate(0,0,0);

        // Renders the rings
        this.renderRings();

        // Renders the Sphere
        this.renderSphere();


    }

    this.renderSphere = function(){

        // Maps the Music
        let volume = this.amp.getLevel();
        let sound = map(volume, 0, 1, 30, 200);

        noStroke();

        // Ensures the ball and rings are visible
        ambientLight((this.hueValue + 180) % 360, 100,  sound + 50);
    
        // Ensures the Ball Moves Up and Down
        this.ballY = sin(frameCount * 0.02) * 180

        // Adds the specfic value for the Ball to move Up and Down
        rotateY(PI);

        // The "spaceball" texture is applied to the Ball
        texture(spaceBall);

        // Moves up and down and beats to the music
        push();
        translate(0, this.ballY, -190);
        sphere(this.size + sound);
        pop();

    }

    // Function to render the rings
    this.renderRings = function(){

        // Changing color over time
        this.hueValue = (this.hueValue + 1) % 360;


        // Moves the rings up and down
        this.ringsY = sin(frameCount * 0.04) * 200

        // Renders the rings
        for (let i = 0; i < this.numberRings; i++){

            push();

            // Makes sure the rings move up and down
            this.ringsY += (i * 20);
             
            // Rings size increase the more below it is
            let ringSize = map(i, 0, this.numberRings - 1, 120, 330);

             // Position and rotate ring
            translate(0, this.ringsY, 200);
            rotateX(HALF_PI);
            
            // Draw main ring
            noFill();
            strokeWeight(3);
            torus(ringSize, 5);
            
            // Draw glow effect
            for (let j = 0; j < 3; j++) {
            strokeWeight(2 - j * 0.5);
            stroke((this.hueValue + 180) % 360, 100, 50);
            torus(ringSize + j * 7, 5);
            }
            
            pop();
        }

    }

}