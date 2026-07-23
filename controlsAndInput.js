//Constructor function to handle the onscreen menu, keyboard and mouse
//controls

function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){

		!this.playbackButton.hitCheck()
		
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keyCode){
		console.log(keyCode);
		if(keyCode == 13){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keyCode > 48 && keyCode < 58){
			var visNumber = keyCode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){


		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		drawingContext.shadowBlur = 0;
		resetMatrix();
		//playback button 
		this.playbackButton.draw();

		if (!this.menuDisplayed){

			text("Press Enter to display menu!", 80, 45);

		}
		//only draw the menu if menu displayed is set to true.

		// This Part is where I made edits, for the UI
		if(this.menuDisplayed){

			textSize(24);
			text("Use numbers 1 to 9 to switch between the visualisers.", 80, 35);

			textSize(25);
			text("Note: Do not go back to the 2D visualisers after entering 3D as it will not render correctly!! :)", 40, height - 60)

			textSize(24);

			text("Press ESC to Close Visualiser!", width - 400, 60);

			this.menu();
		}	
		pop();

	};

	// I also made edits here for fast coding and for the User Interface
	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, 80, yLoc);
		}

		textSize(34);
		text("Instructions:", width - 325, height - 140)
		textSize(24);
		text((i - 8) + ": " + "Use space to toggle music only within 3D!", width - 500, height - 70);
	};
}


