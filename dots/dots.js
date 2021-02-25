const N_DOTS = 150;
const BOUND_PAD = 50;

let dots;

function setup() {
  createCanvas(1000, 1000);
  
  frameRate(60);

  dots = new Array(N_DOTS);

  for (var i = 0; i < N_DOTS; i++) {
    dots[i] = new Dot(-width / 2, width / 2, -height / 2, height / 2);
  }
  
}

function draw() {
  
  background(0);
  translate(width / 2, height / 2);

  stroke(255);

  for (var i = 0; i < N_DOTS; i++) {
    if (!dots[i].inbound()) {
      dots[i] = new Dot(-width / 2, width / 2, -height / 2, height / 2);
    }
    dots[i].tick(0.1);
    strokeWeight(5);
    dots[i].show();

    for (var j = i+1; j < N_DOTS; j++) {
      let d = distance(dots[i].x, dots[i].y, dots[j].x, dots[j].y);

      if (d < 100) {
        strokeWeight(min(3/sqrt(d), 3));
        dot_line(dots[i], dots[j]);
      }
    }
  }
}


class Dot {

  constructor(xmin, xmax, ymin, ymax) {
    this.x = random(xmax-xmin)+xmin;
    this.y = random(ymax-ymin)+ymin;
    this.vx = random(10)-5;
    this.vy = random(10)-5;

    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
  }

  tick(timestep) {
    let dist_to_mouse = distance(mouseX - height/2, mouseY  - width/2, this.x, this.y);
    let angle = atan2(this.y - (mouseY - height/2), this.x - (mouseX - width/2));
    
    if (dist_to_mouse < 100){
      this.vx += cos(angle) / dist_to_mouse * 100;
      this.vy += sin(angle) / dist_to_mouse * 100;
    }
    
    this.x += this.vx * timestep;
    this.y += this.vy * timestep;
  }

  show() {
    point(this.x, this.y);
  }

  inbound() {
    return this.x > this.xmin-BOUND_PAD && this.x < this.xmax+BOUND_PAD && this.y < this.ymax + BOUND_PAD && this.y > this.ymin - BOUND_PAD;
  }
}

function distance(x1, y1, x2, y2) {
  let dx = x1-x2;
  let dy = y1-y2;
  return sqrt(dx*dx + dy*dy);
}

function dot_line(d1, d2) {
  line(d1.x, d1.y, d2.x, d2.y);
}
