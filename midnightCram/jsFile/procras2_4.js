let cubeList = [];

// Match these exact constants from your timer script
const TIMER_DURATION_MS = 120 * 1000;
const TIMER_STORAGE_KEY = "shared_timer_end_time";

function setup() {
  let cnv=createCanvas(windowWidth, windowHeight);
    cnv.class('myCanvas');
  rectMode(CENTER);
  colorMode(HSB);
}
class block {
  constructor(x, y, s,a) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.a = a;
    this.brightUp = true;
  }
  update(currentSaturation) {
    if (this.a > 20) {
      this.brightUp = false;
    }
    if (this.a < 1) {
      this.brightUp = true;
    }
    if (this.brightUp == true) {
      this.a += 1;
    } else {
      this.a -= 1;
    }
    noStroke();
    fill(227,currentSaturation,this.a)
    rect(this.x,this.y, this.s)
  }
}

function draw() {
  background(10);
    
    // --- Calculate Saturation Based on Timer ---
  let saturation = 56; // Fallback value if timer isn't active
  let endTime = localStorage.getItem(TIMER_STORAGE_KEY);
  
  if (endTime) {
    let timeLeftMs = parseInt(endTime, 10) - Date.now();
    
    // Convert to a fraction between 0.0 (time's up) and 1.0 (full time)
    let timeFraction = constrain(timeLeftMs / TIMER_DURATION_MS, 0, 1);
    
    // Map the fraction to your saturation range. 
    // Example: Fades from full saturation (56) down to grey (0) as time runs out
    saturation = map(timeFraction, 0, 1, 0, 56);
  }
    
  let frequency = windowWidth/2;
  while (cubeList.length < frequency) {
    cubeList.push(
      new block(
        random(0, width),
        random(0, height),
        random(width/25, width/50),
        random(1,100)
      )
    );
  }
  for(let i = 0; i < cubeList.length; i+=1){
    cubeList[i].update(saturation);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}