(function(global) {

  var SHOW_MESSAGES = false;

  global.app = {
    init: function(config) {
      console.log('init');
      this.socket = config.socket;
      this.canvasNode = config.canvasNode;

      this.socket.on('input', function(evt) {
        console.log('got input socket event: ', evt);
        // update state for rendering

        switch (evt.type) {
          case 'keypress':
            renderer.frameState.colorInput = evt.value;
            break;
          default:
            console.log('no handler for input type: ', evt);
        }
      });

      this.socket.on('messages', function(data) {
        SHOW_MESSAGES && console.log('server message: ', data);
      });

      // pre-bind the event handlers
      this.handleKeyUp = this.handleKeyUp.bind(this);
      window.addEventListener('keyup', this.handleKeyUp);

      var processingInstance = new Processing(this.canvasNode, renderer.init.bind(renderer));
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
        // Also update locally as we won't get our own event?
        // renderer.frameState.colorInput = evt.keyCode;
      }
    }
  };

})(window);

