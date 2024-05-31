let startTime;
let timerValue = 0;
let timerDuration = 10000;

let isRunning = false;
let isEnded = false;
let startButton, pauseButton, endButton;
//Setting up a canvas with similar proportions to the original
function setup() {
  createCanvas(600, 800); //Ensure that the draw function is run only once
  // noLoop();
  // Create Button
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
}

function startSketch() {
  if (!isEnded) {
    startTime = millis() - timerValue;
    isRunning = true;
  }else{
    resetTimer();
    isEnded = false;
    isRunning = true;
  }
}

function pauseSketch() {
  isRunning = false;
}

function endSketch() {
  isRunning = false;
  isEnded = true;
  resetTimer();
}

function draw() {
  if(isEnded){
    background(255,255,255);
    drawTimer();
  }
  if (isRunning && !isEnded) {
    background(0);
    // Create a black background
    timerValue = millis() - startTime;
    if(timerValue >= timerDuration){
      isRunning = false;
      timerValue = timerDuration;
      isEnded = true;
    }

    // Create a rough hand-drawn effect
    for (let i = 0; i < 8500; i++) {
      let x = random(width);
      let y = random(height);
      let length = noise(x * 0.02, y * 0.02, frameCount * 0.01) * 20;
      let angle = noise(x * 0.02, y * 0.02, frameCount * 0.01) * TWO_PI;
      let x2 = x + cos(angle) * length;
      let y2 = y + sin(angle) * length;

      // Set the stroke color with transparency
      stroke(255, 255, 200, 90);
      strokeWeight(1);
      line(x, y, x2, y2);
    }

    // Pot
    drawFlowerpot();

    // half circles
    drawVerticalCircle();
    drawHorizontalCircle();

    //Branches
    drawBranches();

    //By looking at the top of the picture
    //You can see that there is a dark block of colour covering the uppermost circle.
    fill(0);
    noStroke();
    rect(20, 20, 600, 40);

    //This line will cover the yellow stroke inside the planter
    stroke(0);
    line(165, 675, 435, 675);

    //Create a blue-green border
    noFill();
    stroke(148, 200, 200);
    strokeWeight(70);
    rect(0, 0, 600, 800);
    stroke(255,255,255,0);

    ellipse(width / 2, height / 2, 50, 50);
    drawTimer();
  }
}

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

// Pot
function drawFlowerpot() {
  fill(92, 173, 123);
  stroke(0);
  strokeWeight(5);
  rect(0, 600, 600, 85);
  rect(100, 600, 400, 85);

  fill(244, 195, 110);
  strokeWeight(5);
  rect(160, 590, 280, 85);

  fill(92, 173, 123);
  stroke(244, 195, 110);
  rect(250, 595, 50, 80);
  rect(350, 595, 50, 80);

  fill(255, 50, 50);
  rect(205, 595, 45, 80);

  // Half circle in the Pot
  stroke(244, 195, 110);
  strokeWeight(3);
  arc(185, 675, 42, 42, PI, 0, CHORD);
  arc(417, 675, 35, 35, PI, 0, CHORD);

  fill(244, 195, 110);
  arc(227, 685, 50, 50, 1.2 * PI, 1.8 * PI, CHORD);
  arc(375, 700, 65, 65, 1.3 * PI, 1.7 * PI, CHORD);

  fill(255, 50, 50);
  arc(275, 669, 50, 50, 0.9 * PI, 2.1 * PI, CHORD);
  arc(326, 675, 50, 50, 1 * PI, 2 * PI, CHORD);
}

// Branches
function drawBranches() {
  stroke(244, 195, 110);
  strokeWeight(5);
  line(305, 240, 300, 600);
  line(180, 300, 430, 300);
  line(180, 170, 180, 300);
  line(430, 155, 430, 300);
  line(129, 170, 180, 170);
  line(245, 240, 365, 240);
  line(260, 240, 260, 205);
  line(365, 210, 365, 240);
  line(430, 155, 530, 180);
  line(530, 140, 530, 180);
  line(305, 240, 300, 600);
  line(129, 170, 129, 50);
  line(165, 595, 435, 595);
}

//Here are the circles with the colours split vertically
function drawVerticalCircle() {
  let offset = sin(frameCount * 0.05) * 10; // Animation

  push(); // Start a new drawing state
  translate(width / 2, height / 2); // Move the origin to the center of the canvas
  // rotate(frameCount * 0.01); // Rotate by an angle based on the frame count
  translate(-width / 2, -height / 2); // Move the origin back

  fill(255, 50, 50);
  noStroke();
  arc(295, 450 + offset, 95, 95, PI / 2.3, (1.57 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(295, 450, 95, 95, (1.57 * PI) / 1, PI / 2.3, CHORD);

  fill(92, 173, 123);
  arc(300, 515 + offset, 40, 40, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(300, 515, 40, 40, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(92, 173, 123);
  arc(305, 546 + offset, 25, 25, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(305, 546, 25, 25, (1.4 * PI) / 1, PI / 1.7, CHORD);

  fill(255, 50, 50);
  arc(295, 576 + offset, 40, 40, PI / 2.3, (1.7 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(295, 576, 40, 40, (1.6 * PI) / 1, PI / 2.3, CHORD);

  fill(92, 173, 123);
  arc(310, 365 + offset, 80, 80, PI / 1.7, (1.45 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(310, 365, 80, 80, (1.45 * PI) / 1, PI / 1.7, CHORD);

  fill(255, 50, 50);
  arc(305, 280 + offset, 20, 20, PI / 2, (2 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(305, 280, 20, 20, (1.5 * PI) / 1, PI / 2, CHORD);

  fill(92, 173, 123);
  arc(305, 256 + offset, 30, 30, PI / 2, (2 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(305, 256, 30, 30, (1.5 * PI) / 1, PI / 2, CHORD);

  fill(92, 173, 123);
  arc(260, 213 + offset, 20, 20, PI / 1.7, (1.45 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(260, 213, 20, 20, (1.45 * PI) / 1, PI / 1.7, CHORD);

  fill(92, 173, 123);
  arc(365, 218 + offset, 23, 23, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(365, 218, 23, 23, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(92, 173, 123);
  arc(180, 270 + offset, 65, 65, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(180, 270, 65, 65, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(255, 50, 50);
  arc(173, 223 + offset, 35, 35, PI / 2.3, (1.7 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(173, 223, 35, 35, (1.6 * PI) / 1, PI / 2.3, CHORD);

  fill(92, 173, 123);
  arc(180, 198 + offset, 20, 20, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(180, 198, 20, 20, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(92, 173, 123);
  arc(130, 155 + offset, 35, 35, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(130, 155, 35, 35, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(255, 50, 50);
  arc(125, 110 + offset, 55, 55, PI / 2.3, (1.57 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(125, 110, 55, 55, (1.57 * PI) / 1, PI / 2.3, CHORD);

  fill(92, 173, 123);
  arc(130, 60 + offset, 45, 45, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(130, 60, 45, 45, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(255, 50, 50);
  arc(425, 260 + offset, 46, 46, PI / 2.3, (1.57 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(425, 260, 46, 46, (1.57 * PI) / 1, PI / 2.3, CHORD);

  fill(92, 173, 123);
  arc(428, 225 + offset, 30, 30, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(428, 225, 30, 30, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(255, 50, 50);
  arc(425, 195 + offset, 38, 38, PI / 2.3, (1.57 * PI) / 1, CHORD);
  fill(92, 173, 123);
  arc(425, 195, 38, 38, (1.57 * PI) / 1, PI / 2.3, CHORD);

  fill(92, 173, 123);
  arc(428, 165 + offset, 25, 25, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(428, 165, 25, 25, (1.52 * PI) / 1, PI / 2, CHORD);

  fill(92, 173, 123);
  arc(532, 150 + offset, 25, 25, PI / 2, (1.52 * PI) / 1, CHORD);
  fill(255, 50, 50);
  arc(532, 150, 25, 25, (1.52 * PI) / 1, PI / 2, CHORD);
}

//Here are the circles with the colours split horizontally
function drawHorizontalCircle() {
  let offset = sin(frameCount * 0.05) * 10; // Animation

  push(); // Start a new drawing state
  translate(width / 2, height / 2); // Move the origin to the center of the canvas
  // rotate(frameCount * 0.01); // Rotate by an angle based on the frame count
  translate(-width / 2, -height / 2); // Move the origin back

  fill(255, 50, 50);
  arc(227.5 + offset, 595, 40, 40, PI, 0, CHORD);
  fill(92, 173, 123);
  arc(227.5, 595, 40, 40, 0, PI, CHORD);

  fill(92, 173, 123);
  arc(265 + offset, 595, 25, 25, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(265, 595, 25, 25, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(330 + offset, 592, 40, 40, 0.9 * PI, 2.1 * PI, CHORD);
  fill(92, 173, 123);
  arc(330, 592, 40, 40, 2.1 * PI, 0.9 * PI, CHORD);

  fill(92, 173, 123);
  arc(375 + offset, 595, 50, 50, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(375, 595, 50, 50, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(330 + offset, 303, 45, 45, PI, 0, CHORD);
  fill(92, 173, 123);
  arc(330, 303, 45, 45, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(365 + offset, 298, 25, 25, PI, 0, CHORD);
  fill(92, 173, 123);
  arc(365, 298, 25, 25, 0, PI, CHORD);

  fill(92, 173, 123);
  arc(400 + offset, 298, 48, 48, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(400, 298, 48, 48, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(340 + offset, 240, 45, 45, PI, 0, CHORD);
  fill(92, 173, 123);
  arc(340, 240, 45, 45, 0, PI, CHORD);

  fill(92, 173, 123);
  arc(276 + offset, 240, 35, 35, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(276, 240, 35, 35, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(250 + offset, 240, 20, 20, PI, 0, CHORD);
  fill(92, 173, 123);
  arc(250, 240, 20, 20, 0, PI, CHORD);

  fill(92, 173, 123);
  arc(160 + offset, 170, 35, 35, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(160, 170, 35, 35, 0, PI, CHORD);

  fill(92, 173, 123);
  arc(290 + offset, 298, 35, 35, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(290, 298, 35, 35, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(255 + offset, 302, 35, 35, PI, 0, CHORD);
  fill(92, 173, 123);
  arc(255, 302, 35, 35, 0, PI, CHORD);

  fill(92, 173, 123);
  arc(220 + offset, 298, 38, 38, PI, 0, CHORD);
  fill(255, 50, 50);
  arc(220, 298, 38, 38, 0, PI, CHORD);

  fill(255, 50, 50);
  arc(450 + offset, 165, 20, 20, 1.3 * PI, 1.9 * PI, CHORD);
  fill(92, 173, 123);
  arc(450, 165, 20, 20, 1.9 * PI, 1.3 * PI, CHORD);

  fill(92, 173, 123);
  arc(480 + offset, 165, 45, 45, 1.0 * PI, 2.6 * PI, CHORD);
  fill(255, 50, 50);
  arc(480, 165, 45, 45, 2.1 * PI, 1 * PI, CHORD);

  fill(255, 50, 50);
  arc(515 + offset, 170, 30, 30, 1 * PI, 2.2 * PI, CHORD);
  fill(92, 173, 123);
  arc(515, 170, 30, 30, 2.2 * PI, 1 * PI, CHORD);
}

