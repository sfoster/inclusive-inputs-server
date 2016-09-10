(function(global) {
  var COLORS = {};

  global.renderer = {
    frameState: {},
    processing: null,
    init: function(processing) {
      this.processing = processing;
      // arrow keys
      COLORS[37] = processing.color(255, 153, 51);
      COLORS[38] = processing.color(255, 0, 0);
      COLORS[39] = processing.color(0, 255, 0);
      COLORS[40] = processing.color(255, 255, 51);

      // Ww
      COLORS[119] = processing.color(255, 0, 0);
      COLORS[87] = processing.color(255, 0, 0);
      // Aa
      COLORS[97] = processing.color(255, 153, 51);
      COLORS[65] = processing.color(255, 153, 51);
      // Ss
      COLORS[115] = processing.color(255, 255, 51);
      COLORS[83] = processing.color(255, 255, 51);
      // Dd
      COLORS[100] = processing.color(0, 255, 0);
      COLORS[68] = processing.color(0, 255, 0);

      COLORS.grey = processing.color(100,100,100);

      this.frameState.color = COLORS.grey;
      processing.draw = this.renderFrame.bind(this);
    },
    renderFrame: function() {
      var stateData = this.frameState;
      var processing = this.processing;

      // determine center and max clock arm length
      var centerX = processing.width / 2, centerY = processing.height / 2;
      var maxArmLength = Math.min(centerX, centerY);

      function drawArm(position, lengthScale, weight) {
        processing.strokeWeight(weight);
        processing.line(centerX, centerY,
          centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
          centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
      }

      // erase background
      if (!stateData.lastColor) {
        stateData.lastColor = COLORS.grey;
      }

      if (stateData.colorInput) {
        stateData.lastColor = COLORS[stateData.colorInput];
      }
      processing.background(stateData.lastColor);

      var now = new Date();

      // Moving hours arm by small increments
      var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;
      drawArm(hoursPosition, 0.5, 5);

      // Moving minutes arm by small increments
      var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;
      drawArm(minutesPosition, 0.80, 3);

      // Moving hour arm by second increments
      var secondsPosition = now.getSeconds() / 60;
      drawArm(secondsPosition, 0.90, 1);
    }
  };
})(window);
