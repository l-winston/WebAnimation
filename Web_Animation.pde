final int N_DOTS = 150;
Dot[] dots;
final int BOUND_PAD = 50;

void setup(){
  size(750, 750);
  dots = new Dot[N_DOTS];
  for(int i = 0; i < N_DOTS; i++){
    dots[i] = new Dot(-width/2f, width/2f, -height/2f, height/2f);
  }
}


void draw(){
  background(0);
  translate(width/2, height/2);
  
  stroke(255);
  
  for(int i = 0; i < N_DOTS; i++){
    if(!dots[i].inbound())
      dots[i] = new Dot(-width/2f, width/2f, -height/2f, height/2f);
    
    dots[i].tick(0.1);
    strokeWeight(5);
    dots[i].show();
    
    for(int j = i+1; j < N_DOTS; j++){
      float dist = dist(dots[i], dots[j]);
      if(dist < 100){
        strokeWeight(min(3f/sqrt(dist), 3));
        line(dots[i], dots[j]);
      }
    }
  }
}


class Dot{
  float x, y;
  float vx, vy;
  
  float xmin, xmax, ymin, ymax;
  
  public Dot(float xmin, float xmax, float ymin, float ymax){
      x = random(xmax-xmin)+xmin;
      y = random(ymax-ymin)+ymin;
      vx = random(10)-5;
      vy = random(10)-5;
      
      this.xmin = xmin;
      this.xmax = xmax;
      this.ymin = ymin;
      this.ymax = ymax;
  }
  
  void tick(float timestep){
    x += vx*timestep;
    y += vy*timestep;
  }
  
  void show(){
    point(x, y);
  }
  
  boolean inbound(){
    return x > xmin-BOUND_PAD && x < xmax+BOUND_PAD && y < ymax + BOUND_PAD && y > ymin - BOUND_PAD;
  }
}

float dist(Dot d1, Dot d2){
  float dx = d1.x - d2.x;
  float dy = d1.y - d2.y;
  return sqrt(dx*dx + dy*dy);
}

void line(Dot d1, Dot d2){
  line(d1.x, d1.y, d2.x, d2.y);
}
