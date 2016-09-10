(function(global) {
   "use strict";

  var SHOW_MESSAGES = false;

  global.app = {
    init: function(config) {
      console.log('init');
      this.socket = config.socket;
      this.canvasNode = config.canvasNode;
      var user = this.user = config.user;

      this.socket.on('input', function(evt) {
        console.log('got input socket event: ', evt);
        // update state for rendering

        // get the user
        // get the current entity they are manipulating
        var entity = user.currentEntity;
        if (!entity) {
          console.log('User has no currentEntity');
          return;
        }
        if (evt.type === 'keypress') {
          switch (evt.value) {
            // left
            case 37: // left
            case 65: // 'a'
              entity.previousAttribute();
              break;
            // right
            case 39: // right
            case 68: // 'd'
              entity.nextAttribute();
              break;
            // up
            case 38: // up
            case 87: // 'w'
              entity.incrementAttribute();
              break;
            // down
            case 40: // left
            case 83: // 'a'
              entity.decrementAttribute();
              break;
          }
        } else {
          console.log('no handler for input type: ', evt);
        }
      });

      this.socket.on('messages', function(data) {
        SHOW_MESSAGES && console.log('server message: ', data);
      });

      // pre-bind the event handlers
      this.handleKeyUp = this.handleKeyUp.bind(this);
      window.addEventListener('keyup', this.handleKeyUp);

      var processingInstance = new Processing(this.canvasNode, scene.init.bind(scene));

      // prepare the scene
      var rect = Object.create(Rectangle);
      scene.addEntity(rect).init({}, scene);
      user.currentEntity = scene.getNextEntity();
    },
    uninit: function() {
      window.removeEventListener('keyup', this.handleKeyUp);
    },

    handleKeyUp: function(evt) {
      if(evt.keyCode >= 32) {
        console.log('sending key: ', evt.keyCode);
        this.socket.emit('keypress', {
          clientid: 'somebrowser',
          value: evt.keyCode,
          timestamp: Date.now()
        });
      }
    }
  };

})(window);

