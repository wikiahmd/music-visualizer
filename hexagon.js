
// This Constructor is to render a new Hexagon as we move through the Hexagonal Tunnel
function Hexagon(x, y, size, z) {
  
    this.x = x;
    this.y = y;
    this.size = size;
    this.z = z;
    this.speed = 5;
    this.angleOffset = 0;
  
    // Updates new hexagon as well as position
    this.update = function() {
      this.z += this.speed;
    }
  
    // Displays the Hexagon
    this.display = function() {
  
      // Hexagon Stroke
      strokeWeight(5);
      noFill();
  
      // Ensures the Volume changes the color along with the beat of the music
      volume = amp.getLevel();
      changeColor = map(volume, 0, 1, 0, 80);
  
      // Change the color of the Hexagons gradually
      let change = (sin(millis()  *  0.005) + 1) / 2;
  
      let cyan = color(180, 100, 50);
      let magenta = color(300, 100, 50);
  
  
      lineColor = lerpColor(cyan, magenta, change)
  
      stroke(lineColor);

      // Builds the Hexagon Structure
      beginShape();
      for (let i = 0; i < 10; i++) {
        let angle = TWO_PI / 6 * i  + this.angleOffset;
        let x = cos(angle) * this.size + changeColor;
        let y = sin(angle) * this.size + changeColor;
        vertex(x, y, this.z);
      }
      endShape(CLOSE);
    }
  
  }