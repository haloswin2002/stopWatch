/*!
 * stopwatch.js
 *
 */

StopWatch.displayId = 0;
StopWatch.timerId = -1;
StopWatch.numMilliseconds = 0;
StopWatch.numSeconds = 0;

function StopWatch(stopWatchId) {
  // Initialize Segment variables
  var self = this;
  StopWatch.displayId = new SegmentDisplay(stopWatchId);
  StopWatch.displayId.pattern         = "#######.#";
  StopWatch.displayId.displayAngle    = 10;
  StopWatch.displayId.digitHeight     = 20;
  StopWatch.displayId.digitWidth      = 12;
  StopWatch.displayId.digitDistance   = 2.5;
  StopWatch.displayId.segmentWidth    = 2.5;
  StopWatch.displayId.segmentDistance = 0.5;
  StopWatch.displayId.segmentCount    = 7;
  StopWatch.displayId.cornerType      = 2;
  StopWatch.displayId.colorOn         = "#000000";
  StopWatch.displayId.colorOff        = "#e2e2e2";
  StopWatch.displayId.draw();
  // Initialize Stop Watch variables
  this.clearTimer();
  return this;
}

StopWatch.prototype.animate = function() {
  var valueStr;
  var secondsStr;
  var count;
  if (typeof StopWatch.numMilliseconds == 'undefined') {
    this.clearTimer();
  }
  StopWatch.numMilliseconds++;
  if (StopWatch.numMilliseconds > 9) {
    StopWatch.numMilliseconds = 0;
    StopWatch.numSeconds++;
  }
  secondsStr = StopWatch.numSeconds.toString();
  valueStr = "0000000" + secondsStr;
  valueStr = valueStr.slice(secondsStr.length) + "." + StopWatch.numMilliseconds.toString();
  StopWatch.displayId.setValue(valueStr);
}

StopWatch.prototype.clearTimer = function() {
  //console.log("clear");
  if (StopWatch.timerId == -1) {
    StopWatch.numMilliseconds = 0;
    StopWatch.numSeconds = 0;
    StopWatch.displayId.setValue('0000000.0');
  }
}

StopWatch.prototype.stopTimer = function() {
  //console.log("stop");
  window.clearInterval(StopWatch.timerId);
  StopWatch.timerId = -1;
}

StopWatch.prototype.startTimer = function() {
  //console.log("start");
  this.stopTimer();
  StopWatch.timerId = window.setInterval(this.animate, 100);
}

StopWatch.prototype.submitTimer = function() {
  if (StopWatch.numSeconds == 0 && StopWatch.numMilliseconds == 0) {
    console.log("nothing to submit");
  }
  else {
    console.log("submit", StopWatch.numSeconds, StopWatch.numMilliseconds);
    this.clearTimer();
  }
}
          
