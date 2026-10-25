let cubeList = [];
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
  update(){
    if(this.a>98){
      this.brightUp=false;
    }
    if(this.a<1){
      this.brightUp=true;
    }
    if(this.brightUp==true){
      this.a+=1;
    }
    else{
      this.a-=1;
    }
    noStroke();
    fill(227,56,this.a)
    rect(this.x,this.y, this.s)
  }
}

function draw() {
  background(10);
  let frequency = windowWidth/50;
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
    cubeList[i].update();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}