// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];
var input;
var analyzer; //Amplitude analyzer;
var rounded;
var vol;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {

  createCanvas(700, 400);
  background(51);
  input = new p5.AudioIn() //input = new AudioIn(this, 0);
  analyzer = new p5.Amplitude();
  input.start();
  analyzer.setInput(input); //float vol = analyzer.analyze();
  //vol = analyzer.getLevel();

  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points = font.textToPoints('Less', 50, 300, 300, {
    sampleFactor: 0.2 //particles density
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(51);
//  var i;
  //for ( i=0; i<width; i=i+50){
    //ellipse(i, 150, 10, 10);
//  }
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];

    v.behaviors();
    v.update();
    v.show();
  }
}
