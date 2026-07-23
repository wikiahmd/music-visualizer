

function CircularRings(){


	this.name = "Circular Rings (2D)";

	// Amplitude for the Music
	this.amp = new p5.Amplitude();

	// Array to add rings whenever they are being rendered and getting dissappeared
	this.rings = [];

	// The amount of distance the small rings can cover after returning back
	this.boundaryRadius = min(width, height) / 2 - 300;

	// Setting the color initially to 0
	this.hueValue = 0;

	// Angle and Radius for the small rings
	let angle = random(TWO_PI);
	let radius = random(this.boundaryRadius - 50); 
	
	// Rendering the small rings in the middle first
	for (let i = 0; i < 10; i++){

		this.rings.push({
			x: width / 2 + radius + cos(angle),
			y: height / 2 + radius + sin(angle),     
			size: random(30, 60),
			speedX: random(-2, 2),
			speedY: random(-2, 2),
			alpha: 80,
			startFade: frameCount + random(150, 300)
		});

	}

	this.draw = function(){


		// Angle Mode is in Radians and Color Mode is in HSL
		angleMode(RADIANS);
		colorMode(HSL, 360, 100, 100);


		// initilialzing the hue value
		this.hueValue = (this.hueValue + 1) % 360;

		//Render the Music Visualiser
		var vol = this.amp.getLevel();
		var diam = map(vol,0,0.3,50,200);

		background(0); 

		// Add color and stroke to the rings (color applied to all of the rings at once)
		noFill();
		strokeWeight(10);
		drawingContext.shadowBlur = 80;
		drawingContext.shadowColor = color((this.hueValue + 180) % 360, 100, 50);
		stroke((this.hueValue + 180) % 360, 100, 50);

		// Render the big rings
		ellipse(width / 2, height / 2 , diam + 300, diam + 300);
		strokeWeight(13);
		ellipse(width / 2, height / 2, diam + 550, diam + 550);
		strokeWeight(15);
		ellipse(width / 2, height / 2, diam + 750, diam + 750);

		noFill();
		
		// Render the Small Rings
		for (let i = this.rings.length - 1; i >= 0; i--) {

			let ring = this.rings[i];
			
			// Draw the ring with fading effect
			stroke((this.hueValue + 180) % 360, 100, ring.alpha);
			strokeWeight(3);
			ellipse(ring.x, ring.y, ring.size);
			
			// Move the ring
			ring.x += ring.speedX;
			ring.y += ring.speedY;
			
			// Calculate distance from center
			let dx = ring.x - width/2;
			let dy = ring.y - height/2;
			let distance = sqrt(dx*dx + dy*dy);
			
			// Check if ring hits the boundary (accounting for ring size)
			if (distance > this.boundaryRadius - ring.size/2) {
			  // Calculate angle of collision
			  let angle = atan2(dy, dx);
			  
			  // Calculate normal vector at point of collision
			  let normalX = cos(angle);
			  let normalY = sin(angle);
			  
			  // Calculate dot product of velocity and normal
			  let dot = ring.speedX * normalX + ring.speedY * normalY;
			  
			  // Calculate reflection vector
			  ring.speedX = ring.speedX - 2 * dot * normalX;
			  ring.speedY = ring.speedY - 2 * dot * normalY;
			  
			  // Move ring back inside boundary to prevent sticking
			  ring.x = width/2 + (this.boundaryRadius - ring.size/2) * cos(angle);
			  ring.y = height/2 + (this.boundaryRadius - ring.size/2) * sin(angle);
			}
			
			// Start fading after lifespan expires
			if (frameCount > ring.startFade) {
			  ring.alpha -= 1.5; // Decrease transparency gradually
			}

			// Render new small rings within the middle once the opacity of some of the rings reach 0
			if (ring.alpha <= 0){

				this.rings.splice(i, 1)

				this.rings.push({
					x: width / 2 + radius + cos(angle),
					y: height / 2 + radius + sin(angle),     
					size: random(30, 60),
					speedX: random(-1.5, 2),
					speedY: random(-1.5, 2),
					alpha: 80,
					startFade: frameCount + random(150, 300)
				});

			}
		}
		
	}


}



