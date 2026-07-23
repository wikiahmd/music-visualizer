//draw the waveform to the screen
function WavePattern() {
	//vis name
	this.name = "Wave Pattern (2D)";

	//  Color Initialization
	this.hueValue = 0;

	//draw the wave form to the screen
	this.draw = function() {

		angleMode(DEGREES);
		colorMode(HSL, 360, 100, 100);

		// Change Color
		this.hueValue = (this.hueValue + 1) % 360;
		
		push();
		
		noFill();

		// Add shadow blur and shadow color to create a glow effect
		drawingContext.shadowBlur = 60;
		drawingContext.shadowColor = color((this.hueValue + 180) % 360, 100, 50)
		stroke((this.hueValue + 180) % 360, 100, 50);
		strokeWeight(2);

		beginShape();
		//calculate the waveform from the fft.
		var wave = fourier.waveform();
		for (var i = 0; i < wave.length; i++) {
			//for each element of the waveform map it to screen
			//coordinates and make a new vertex at the point.
			var x = map(i, 0, wave.length, 0, width);
			var y = map(wave[i], -1.5, 1.5, 0, height);

			vertex(x, y);
		}

		endShape();
		pop();
	};
}