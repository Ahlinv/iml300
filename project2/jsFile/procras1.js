let blurAmount = 0;
let blurring = true;
let maxBlur = 7; // Maximum blur radius in pixels
let speed = 0.05; // How fast the blur transitions
let strokeB=30;
let cnv;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  // Give the canvas an ID so we can select it with CSS
  cnv.class('myCanvas');
  colorMode(HSB);
}

function draw() {
  background(10+cos(blurAmount));
  

  // 2. ANIMATE THE BLUR STATE
  if (blurring) {
    blurAmount += speed;
    strokeB +=0.7;
    if (blurAmount >= maxBlur) {
      blurring = false; // Reverse direction
    }
  } else {
    blurAmount -= speed;
    strokeB -=0.7;
    if (blurAmount <= 0) {
      blurring = true; // Reverse direction
    }
  }
  noFill();
  strokeWeight(windowWidth / 400);
  for (let x = 0; x < windowWidth; x += 100) {
    for (let y = 0; y < windowHeight; y+=100) {
      stroke(227,56,strokeB);
      rect(x+cos(blurAmount), y, 30);
      
    }
  }

  cnv.style('filter', `blur(${blurAmount}px)`);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}