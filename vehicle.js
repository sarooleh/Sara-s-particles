
// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);

  this.vel = p5.Vector.random2D();
  //this.vel = createVector(0, 0);
  this.acc = createVector();
  vol = analyzer.getLevel();
  rounded = Math.round(vol*100);
  console.log(rounded);
  this.r = 3; //particles size
  this.maxspeed = 100;
  this.maxforce = 1;
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target);
//var i;
//  for ( i=0; i<width/2; i=i+50){
 var escapePoint = createVector(170, 150);
  //}
  //var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(escapePoint);
  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  vol = analyzer.getLevel();
  rounded = Math.round(vol*100);

  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function() {
  stroke(255);
  strokeWeight(this.r);
  point(this.pos.x, this.pos.y);
}


Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 500) {
    speed = map(d, 0, 500, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  vol = analyzer.getLevel();
  rounded = Math.round(vol*10);
  //console.log(rounded);
  if (rounded < 50) {
    speed = map(rounded, 0, 100, 0, this.maxspeed);
  }
  if (d < 50 || rounded>0) {
    desired.setMag(speed);
  //  desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
