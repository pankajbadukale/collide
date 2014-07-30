
var raf = require('raf');
var running = {};

var self = module.exports = {

  animationStarted: function(instance) {
    running[instance._.id] = instance;

    if (!self.isTicking) {
      self.tick();
    }
  },

  animationStopped: function(instance) {
    delete running[instance._.id];
    self.maybeStopTicking();
  },

  tick: function() {
    var lastFrame = performance.now();

    self.isTicking = true;
    self._rafId = raf(step);

    function step() {
      self._rafId = raf(step);

      // Get current time
      var now = performance.now();
      var deltaT = now - lastFrame;

      for (var animationId in running) {
        running[animationId]._tick(deltaT);
      }

      lastFrame = now;
    }
  },

  maybeStopTicking: function() {
    if (self.isTicking && !Object.keys(running).length) {
      raf.cancel(self._rafId);
      self.isTicking = false;
    }
  },

};
