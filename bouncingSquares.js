
function BouncingSquares(){


    this.name = "Bouncing Squares (3D)";

    // Squares Array
    this.squaresArray = [];

    // Maximum Number of Squares being rendered
    this.maxSquares = 4000;

    // Amplitude for the Music
    this.amp = new p5.Amplitude();
    
    
    // Renders squares inititially with their properties (was thinking of making a seperate class for this)
    for (let i = 0; i < this.maxSquares; i++) {
        this.squaresArray.push({
          pos: createVector(
            random(-800, 800),
            random(0, 50),
            random(-800, 400)
          ),
          initialY: random(0, 50),
          yOffset: random(TWO_PI),
          bounceSpeed: random(0.02, 0.04),
          size: random(10, 15),
          hue: random(360),
          brightness: 100,
          alpha: 255,
          rotation: random(-PI/12, PI/12)
        });
      }

    this.draw = function(){

      // Angle Mode is set to Radians while the Color Mode is in HSL
        angleMode(RADIANS);
        colorMode(HSL)

        // Translate is set to 0 so the squares stay where they are and their rotation is set to 0, this si done to prevent other extensions from interfering
        translate(0,0,0);
        rotateX(0);
        rotateY(0);
        rotateZ(0);

        // Perspective remains norma, the above reason is the reason why
        perspective(PI / 3, width / height, 0.1, 1000);

        // Render the squares with no stroke
        noStroke();
        this.renderSquares();

    }

    
    // Function to render the squares
    this.renderSquares = function() {

      // Map the music
      let volume = this.amp.getLevel();
      let beatSquares = map(volume, 0, 1, 0, 20);
      
      // Camera setup
      camera(0, -200, 200, 0, 0, 0, 0, 1, 0);
      
      // Ambient light to ensure the squares are visible
      ambientLight(255);

      // Moving light
      let time = frameCount * 0.1;
      let radius = 1000;
      let height = 550;
      
      // Light moving in a circle
      let x1 = cos(time) * radius;
      let z1 = sin(time) * radius;
      pointLight(322.5, 75.9, x1, height, z1);


      // Render each square
      this.squaresArray.forEach(squares => {

        // Update motion and effects
        squares.pos.y = squares.initialY + sin(frameCount * squares.bounceSpeed + squares.yOffset) * 20;
        
        // Distance to light source
        let distToLight1 = dist(squares.pos.x, squares.pos.y, squares.pos.z, 200, -100, 200);
        let distToLight2 = dist(squares.pos.x, squares.pos.y, squares.pos.z, -200, -100, -200);
        squares.brightness = map(min(distToLight1, distToLight2), 0, 500, 100, 40);
    
        
        // Render squares
        push();
        translate(squares.pos.x, squares.pos.y, squares.pos.z + beatSquares);
        rotateX(PI/2 + squares.rotation);
        specularMaterial(squares.hue, 80, squares.brightness);
        plane(squares.size + beatSquares , squares.size + beatSquares);
        pop();
      });
    };
}
 

