(function(global) {
  "use strict";
  global.User = {
    clientid: '',
    currentEntity: null,
    init: function(clientid) {
      this.clientid = clientid;
      return this;
    }
  }
})(window);
