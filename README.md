# Music Visualizer (JavaScript) ✨
This project is a dynamic music visualization application built using the p5.js and p5.sound.js libraries. It provides a collection of audio-reactive visual effects that respond to the amplitude and waveform data of a loaded audio track.  

## 🌟 Features
The application supports seamless switching between multiple visualizer modes, split into two rendering categories:

### 2D Visualizations:
- Wave Pattern
- Circular Rings
- Circular Wave  
### 3D (WEBGL) Visualizations:
- Glowing Cubes
- Ball Rings
- Angry Face 
- Hexagonal Tunnel
- Space Ship
- Bouncing Squares

**Audio-Reactive Elements**: Visualizers utilize the p5.Amplitude and p5.FFT objects to map audio levels to the size, speed, opacity, and color of the rendered graphics.  

## 🎮 Controls
The visualizer includes an on-screen menu and responds to several keyboard and mouse inputs:
- **Mouse Click**: Click the playback button located in the top-left corner to play or pause the audio.
- **Enter**: Toggle the on-screen menu display.
- **1 - 9**: Press the number keys to switch between the different visualizers.
- **Spacebar**: Toggle the music playback specifically within the 3D visualizers.
- **ESC**: Close the visualizer and exit the canvas.
- **⚠️ Important Rendering Note**: The application advises users to avoid switching back to 2D visualizers after entering a 3D (WEBGL) mode, as it will not render correctly.

## 📁 Project Structure
The codebase is organized into modular JavaScript files to separate the core logic from individual visualizer implementations:
- **index.html**: The main entry point that loads the p5.js library, the p5.sound add-on, and all custom scripts.
- **sketch.js**: The main loop of the application. It handles preloading assets (like song.mp3 and textures), canvas creation, and delegates the drawing to the currently selected visualizer.
- **controlsAndInput.js**: Manages the user interface, renders the instructions menu, and listens for key presses to switch modes.
- **visualisations.js**: A container class that holds the array of visualizer objects and manages the selection state.
- **playbackButton.js**: Handles the rendering and hit-detection logic for the play/pause UI button.
- **Visualizer Scripts**: Individual files (e.g., angryFace.js, ballRings.js, bouncingSquares.js, hexagon.js, spaceShip.js) that contain the specific draw functions, geometry, lighting, and camera logic for each effect.

## 🐞 Bugs 
This visualizer cannot:
- Go back from 3D to 2D due to a technical limitation
- Handle other keys that may be typed, this would cause the visualizer to crash.
- Once its exited, you'd need to reload it again.
- This visualizer requires that the code gets manually changed to add your own song. I added Love Story by Indila so credit goes to her.
- The menu isn't displayed in the 3D WEBGL mode. You'll have to learn study the UI controls in the 2D Mode at the start.
