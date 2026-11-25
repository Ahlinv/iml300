/* ============================================================
   sketch.js — p5.js drawing: one vertical line per entry.
   Line length shows the kind: scholar = long, social = medium,
   submitted = short.
   ============================================================ */

var LINE_HEIGHTS = { scholar: 34, social: 26, submitted: 16 };
var LINE_GAP = 10;   /* pixels between lines */
var MARGIN_X = 4;    /* left margin */
var TOP_Y = 6;       /* where lines start from the top */

function setup() {
  var c = createCanvas(Math.min(640, windowWidth - 32), 40);
  c.parent("sketch");
  noLoop();

  /* main.js calls this after re-rendering the list. */
  window.redrawSketch = function () { redraw(); };
}

function draw() {
  background(255);
  stroke(0);

  var all = allEntries();
  for (var i = 0; i < all.length; i++) {
    var x = MARGIN_X + i * LINE_GAP;
    var h = LINE_HEIGHTS[all[i].kind] || LINE_HEIGHTS.submitted;
    line(x, TOP_Y, x, h);
  }
}
