
function HexagonalTunnel(){

    this.name = "Hexagonal Tunnel (3D)"

    this.hexagons = [];

    // Initializing the Hue Valye
    this.hueValue = 0;

    // For rendering more Hexagons
    this.sizeTwo = 200;

    this.colors = [color(255, 0, 150), color(0, 255, 255)];

    // Inititially pushes the Hexagons one at a time
    for (let i = 0; i < 20; i++) {
      this.hexagons.push(new Hexagon(0,  0, this.sizeTwo, -i * 110));
    }

    // The Amplitude of the musics
    amp = new p5.Amplitude();

  this.draw = function() {

    // Angle Mode set to Radians since we're rendering the Hexagons in PI and the Camera should stay in position for no errors
    angleMode(RADIANS);
    camera();

    // Color Mode Set to HSB
    colorMode(HSL, 360, 100, 100)

    // Perspective set to normal
    perspective(PI / 3, width / height, 0.1, 1000); 

    // Changing hte color over time
    this.hueValue = (this.hueValue + 1) % 360;

    // Rotates the Centered Cube
    angle1 = frameCount * 0.01

    // Background Color and Rotation set to normal
    background(240, 100, 6);
    rotateX(0);
    rotateY(0);
    rotateZ(0);
    translate(0, 50, 600);

    // Rendering more hexagons
    for (let i = this.hexagons.length - 1; i >= 0; i--) {
      this.hexagons[i].update();
      this.hexagons[i].display();

    }


    // Checks to see if a certain limit has been reached by the camera upon which another Hexagon should be rendered
    if (this.hexagons[this.hexagons.length - 1].z > -1850) {
      this.hexagons.push(new Hexagon(0, 0, 300, this.hexagons[0].z - 100));
      this.hexagons.shift();
    }


    // The Cube is set at a far distance from the Camera
    translate(0, -75, -750);
    
    // Rotates the Cube
    rotateX(angle1);
    rotateY(angle1);
    rotateZ(angle1);

    // Cube features
    strokeWeight(2)
    stroke(255);
    fill((this.hueValue + 180) % 360, 100, 50, 5);
    box(60 + changeColor);

  }

  }
