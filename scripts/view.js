// The number of data entries (points).
const dataCount = 100;
// The amount of randomness in the data.
const sigma = 0.15;
// Max draw iterations, to stop the application from
// running when a good solution is found.
const maxIterations = 300;
// Input data storage.
let data;
// Stores the initial prediction to be able to draw it.
let initialPrediction;

// Setup canvas to draw on.
function setup() {
  frameRate(10);
  createCanvas(500, 500);
  data = generateData(dataCount, 0.25);
  initialPrediction = predict(data.xs);
}

// Draw each frame.
function draw() {
  if(frameCount > maxIterations)
    noLoop();
  clear();

  // Draw a grid of support lines.
  drawGrid(50, color(224));
  // Draw input data as points.
  drawPoints(data.xs.dataSync(), data.ys.dataSync(), color(192));
  // Make a prediction.
  let preds = predict(data.xs);
  // Draw the initial prediction.
  drawCurve(data.xs.dataSync(), initialPrediction.dataSync(), color(255,64,64,64));
  // Do one iteration on training.
  train(data.xs, data.ys);
  // Draw the prediction curve after previous training.
  drawCurve(data.xs.dataSync(), preds.dataSync(), color(64,255,64));
}

// Sorts and draws each point as a curve.
function drawCurve(xs, ys, color){
  noFill();
  strokeWeight(3);
  stroke(color);

  beginShape()
  // Create array and sort points.
  let values = Array.from(xs).map((y, i) => {
    return {'x': xs[i], 'y': ys[i]};
  });
  values.sort(function(a,b){return a.x - b.x});
  // Create each point in curve.
  for(let i = 0; i < values.length; ++i){
    curveVertex(convertX(values[i].x), convertY(values[i].y));
  }
  endShape();
}

// Draws a point for each point in (xs, ys).
function drawPoints(xs, ys, color) {
  //Create array with all coordinates.
  const values = Array.from(ys).map((y, i) => {
    return {'x': xs[i], 'y': ys[i]};
  });

  ellipseMode(CENTER);
  fill(color);
  noStroke();

  // Draw each point
  for(let i = 0; i < values.length; ++i){
    ellipse(convertX(values[i].x), convertY(values[i].y), 6, 6);
  }
}

// Draws a grid with lines separated by param spacing.
function drawGrid(spacing, color) {
  stroke(color);
  strokeWeight(1);
  // Draw each line
  for(let i = 0; i <= height; i+=spacing) {
    line(0,i,width,i);
    line(i,0,i,height);
  }
  // Draw right most and bottom line.
  line(0,width-1,width,width-1);
  line(height-1,0,height-1,height);
}

// Convert x value to grid space.
// The function assumes -1 < x < 1.
function convertX(x) {
  return x*(width/2)+(width/2);
}

// Convert y value to grid space.
// The function assumes 0 < y < 1.
function convertY(y) {
  return y*height;
}
