    
function AngryFace(){


    this.name = "Angry Face (3D)";

    // Sphere Size
    this.sphereSize = 60;

    // Amplitude for the Music
    this.amplitude = new p5.Amplitude();

    // Creates the Graphics to Draw the face on the sphere
    this.AngryFaceQ = createGraphics(200, 200);
        
this.draw = function(){

    // Clears the previous canvas
    clear();

    // Sets the camera's position to normal
    camera();

    // Ensures the angry face is visbile
    ambientLight(255);
    ambientMaterial(80);

    // Angry Face Stays in the middle and the perspective is constant
    translate(0, 0, 0);
    perspective(PI / 3, width / height, 0.1, 1000); 

    // Color Mode is RGB
    colorMode(RGB);

    // Background Black
    background(0);
    noStroke();

    // Maps the Music to the Size of the Angry Face
    let level = this.amplitude.getLevel(); // Get current audio amplitude level
    this.size = map(level, 0, 0.5, this.sphereSize, this.sphereSize * 4);

    // Makes sure the sphere takes the Graphics rendered and is placed on the sphere
    texture(this.AngryFaceQ);

    // Shakes the Angry Face Violently
    rotateZ(random(0.1, 0.4));
    rotateZ(random(-0.1,-0.4));
    rotateY(15.4);
    
    // Angry Face beats harder towards the screen when the music get's louder
    sphere(60 + this.size);
    translate(width/2,height/2); 

    // The Graphics for the Face
    this.drawAngryFaceQ();

    }
    
    this.drawAngryFaceQ = function() {
        

        // The background for the Angry Face
        this.AngryFaceQ.background(10); 
        this.AngryFaceQ.drawingContext.shadowBlur = 100;
        this.AngryFaceQ.drawingContext.shadowColor = color(0, 140, 255);
        this.AngryFaceQ.noFill();
        this.AngryFaceQ.stroke(0);
      
    
      
        // Angry Eyebrows for the Face
        this.AngryFaceQ.stroke(0,140,255);
        this.AngryFaceQ.drawingContext.shadowBlur = 100;
        this.AngryFaceQ.drawingContext.shadowColor = color(0, 140, 255);
        this.AngryFaceQ.strokeWeight(6);
        this.AngryFaceQ.line(90, 75, 100, 85);               // Left eyebrow
        this.AngryFaceQ.line(120, 85, 130, 75);              // Right eyebrow
      
        // The Mouth for the Angry Face
        this.AngryFaceQ.beginShape();

        this.AngryFaceQ.noFill();
        this.AngryFaceQ.strokeWeight(4);
        this.AngryFaceQ.vertex(95,120)
        this.AngryFaceQ.vertex(100,130);
        this.AngryFaceQ.vertex(105,120);
        this.AngryFaceQ.vertex(110,130);
        this.AngryFaceQ.vertex(115,120);
        this.AngryFaceQ.vertex(120,130);
        this.AngryFaceQ.vertex(125,120);
    
        this.AngryFaceQ.endShape();
    
    }
}
