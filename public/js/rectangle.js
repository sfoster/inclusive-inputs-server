(function(global) {

  var COLORS = {};

  Rectangle = Object.create(Sprite);
  Rectangle.init = function(props, scene) {
    this._initProps(props);
    var processing = scene.processing;
    if (!COLORS.grey) {
      // first instance, init the colors
      COLORS.grey = processing.color(100,100,100);

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
    }

    this.updateColor(100);
  }

  Rectangle.attributes = [
    { name: 'color', lbound: 0, ubound: 255, step: 5 },
    { name: 'armColor', lbound: 0, ubound: 255, step: 10 }
  ];

  Rectangle.updateColor = function(color) {
    this.data.color = color;
  }

  Rectangle.render = function(processing) {
    var stateData = this.data;
    // determine center and max clock arm length
    var centerX = processing.width / 2, centerY = processing.height / 2;
    var maxArmLength = Math.min(centerX, centerY);
    var armColor = stateData.armColor;

    function drawArm(position, lengthScale, weight) {
      processing.stroke(processing.color(0,armColor,0))
      processing.strokeWeight(weight);
      processing.line(centerX, centerY,
        centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,
        centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);
    }

    // erase background
    if (stateData.color !== stateData.lastColor) {
      stateData.lastColor = stateData.color;
      console.log('new face color: ', processing.color(100,100,stateData.lastColor));
    }
    processing.background(processing.color(100,100,stateData.lastColor));

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
  window.Rectangle = Rectangle;
})(window)