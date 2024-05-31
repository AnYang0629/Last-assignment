# Final-assignment(Functioning prototype) ayan0078

## Interactive Instructions
1. Start the Animation: Click the start button to begin the animation.
2. Pause the Animation: Click the pause button to halt the animation temporarily.
3. End the Animation: Click the end button to stop the animation and reset it.
4. Set Timer Duration: Enter the desired duration in seconds into the input box and click the set button to adjust the animation timer.

## Details Individual Approach to Animating the Group Code Chosen Method: Interaction
I focused on user interaction to drive the animation. This allows users to control the start, pause, and end of the animation, as well as set a custom timer duration.
## Animated Properties
1. Color Dynamics: The circles split vertically and horizontally alternate colors between red and green dynamically.
2. Offset Animation: An offset effect creates smooth oscillation for the circles, enhancing the visual fluidity.

## References and Inspiration
I went throws other peoples work from a website called CodePen.
### Countdown Timer by Matt Smith
![image](https://github.com/AnYang0629/Last-assignment/assets/168147119/b5d303b9-8dd0-4c36-90c1-77b0fc617538)
### Rain effect by Aaron Rickle
3. ![image](https://github.com/AnYang0629/Last-assignment/assets/168147119/e0d47e85-b703-4498-84a6-20776e7af220)

## Technical Description
My design idea is about adding buttons and timers and countdown effects based on group code.
### Buttons and countdown & Timer
  ```
  startButton = createButton('start');
  startButton.position(10, 10);
  startButton.mousePressed(startSketch);
  
  pauseButton = createButton('pause');
  pauseButton.position(60, 10);
  pauseButton.mousePressed(pauseSketch);
  
  endButton = createButton('end');
  endButton.position(120, 10);
  endButton.mousePressed(endSketch);

  inputBox = createInput();
  inputBox.position(170, 10);
  inputBox.size(100);

  setButton = createButton('set');
  setButton.position(280, 10);
  setButton.mousePressed(setTimerDuration);

  startTime = millis();
  isRunning = false;

  function drawTimer() {
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  let remainingTime = max(0, (timerDuration - timerValue) / 1000).toFixed(2);
  text("Timer: " + remainingTime + " s", 380, 25);
}

// settimer
function setTimerDuration() {
  let inputTime = parseFloat(inputBox.value());
  if (!isNaN(inputTime) && inputTime > 0) {
    timerDuration = inputTime * 1000; // sec to millie sec
    resetTimer(); // reset the timer
  } else {
    alert('Please enter a valid time（s）');
  }
}

function resetTimer() {
  isRunning = false;
  timerValue = 0;
  startTime = millis();
}

