let cubeList = [];
let projectProgress = 0;
let diffLevel = parseInt(localStorage.getItem("game_difficulty")) || 3;
function setup() {
  let cnv=createCanvas(windowWidth, windowHeight);
    cnv.class('myGames');
  rectMode(CENTER);
  colorMode(HSB);
  textAlign(CENTER);
}
class block {
  constructor(x, y, s, a, acc, speed) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.a = a;
    this.acc = acc;
    this.speed = speed;
    this.brightUp = true;
  }
  update() {
    if (this.a > 98) {
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
    fill(227, 56, this.a);
    if (
      this.x > mouseX + 10 &&
      this.y <= 100 / diffLevel + mouseY &&
      this.y >= mouseY - 100 / diffLevel &&
      this.x - mouseX < 30
    ) {
      this.x += 20 / diffLevel;
    } else if (
      this.x < mouseX - 10 &&
      this.y <= 50 + mouseY &&
      this.y >= mouseY - 50 &&
      mouseX - this.x < 30
    ) {
      this.x -= 5 / diffLevel;
    }
    this.y = (this.y + this.speed) * this.acc;
    rect(this.x, this.y, this.s);
  }
}

function draw() {
  background(10 + projectProgress / 10);

  if (projectProgress > 950) {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 20);
    text("Almost there!", width / 2, height / 3);
    if (projectProgress > 1200) {
      window.location.href = "../pages/page5.html";
      noLoop(); // Stop the p5 engine
      return;
    }
  } else if (projectProgress > 700) {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 30);
    text("You can do this!", width / 2, height / 3);
  } else if (projectProgress > 500) {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 35);
    text("Half way there!", width / 2, height / 3);
  } else if (projectProgress > 100) {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 40);
    text("Good start.", width / 2, height / 3);
  } else if (projectProgress > 0) {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 45);
    text("Get going.", width / 2, height / 3);
  } else if (projectProgress > -10) {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 50);
    text("...", width / 2, height / 3);
  } else {
    fill(227, 56, 100);
    textFont("Times New Roman", width / 60);
    text("It won't be too late to quit here.", width / 2, height / 3);
  }

  fill(227, 56, 100);
  textFont("Times New Roman", width / 30);
  text(
    "Try to put your ideas together, make that project!",
    width / 2,
    height / 2
  );

  fill(227, 56, 20);
  rect(width / 2, height - height / 8, width, height / 50);
  fill(227, 56, 40);
  rect(width / 2, height - height / 8, width / 3, height / 50);
  fill(227, 56, 60);
  rect(width / 2, height - height / 8, width / 5, height / 50);
  fill(227, 56, 100);
  rect(width / 2, height - height / 8, width / 15, height / 50);

  let frequency = windowWidth / 10 / diffLevel;
  while (cubeList.length < frequency) {
    cubeList.push(
      new block(
        random(
          width / 2 - (diffLevel * width) / 5,
          width / 2 + (diffLevel * width) / 5
        ),
        random(0, height / 8),
        random(width / 25, width / 50),
        random(1, 100),
        random(1.001, 1.005),
        3 / diffLevel
      )
    );
  }
  for (let i = 0; i < cubeList.length; i += 1) {
    cubeList[i].update();
    if (cubeList[i].y > height - height / 8) {
      noFill();
      stroke(227, 56, 100);
      rect(cubeList[i].x, height - height / 8, 50);
      noStroke();
      if (
        cubeList[i].x < width / 2 + width / 30 &&
        cubeList[i].x > width / 2 - width / 30
      ) {
        projectProgress += 5;
        fill(227, 56, 100);
        textFont("Times New Roman", width / 35);
        text("Perfect!", random(0, width), random(0, height / 3));
      } else if (
        cubeList[i].x < width / 2 + width / 10 &&
        cubeList[i].x > width / 2 - width / 10
      ) {
        projectProgress += 2;
        textFont("Times New Roman", width / 35);
        text("Nice!", random(0, width), random(0, height / 3));
      } else if (
        cubeList[i].x < width / 2 + width / 6 &&
        cubeList[i].x > width / 2 - width / 6
      ) {
        projectProgress += 1;
        textFont("Times New Roman", width / 35);
        text("Decent..", random(0, width), random(0, height / 3));
      } else {
        if (projectProgress > -100) {
          projectProgress -= 5 * diffLevel;
          fill(227, 56, 20);
          textFont("Times New Roman", width / 35);
          text("Bad choice...", random(0, width), random(0, height / 3));
        } else {
          window.location.href = "../pages/page2_1.html";
          noLoop(); // Stop the p5 engine
          return;
        }
      }

      cubeList.splice(i, 1); //get rid of those out of boarder
    }
  }
}
window.addEventListener('storage', (event) => {
  if (event.key === 'game_difficulty') {
    // If the value gets wiped out or is empty, drop back to 3
    diffLevel = event.newValue ? parseInt(event.newValue) : 3;
    console.log("Game difficulty updated across tabs. Current level:", diffLevel);
  }
});
