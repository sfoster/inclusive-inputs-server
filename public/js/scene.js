(function(global) {
  "use strict";

  var scene = global.scene = {};
  scene.entitiesById = {};
  scene.entitiesByIndex = [];
  scene._nextEntityId = 0;

  scene.init = function(processing) {
    this.processing = processing;
    processing.draw = this.render.bind(this);
  }
  scene.addEntity = function(entityData) {
    var id = 'entity_' + scene._nextEntityId++;
    entityData.__id = id;
    this.entitiesById[id] = entityData;
    this.entitiesByIndex.push(entityData);
    return entityData;
  }
  scene.removeEntity = function(id) {
    var entity = typeof id == 'string' ? scene.entitiesById[id] : id;
    var idx = this.entitiesByIndex.indexOf(entity);
    if (idx > -1) {
      this.entitiesByIndex.splice(idx, 1);
      delete scene.entitiesById[id];
    }
  }
  scene.getNextEntity = function(id) {
    if (!id) {
      return this.entitiesByIndex[0];
    }
    var prevEntity = typeof id == 'string' ? this.entitiesById[id] : id;
    var prevIdx = -1;
    if (prevEntity) {
      prevIdx = this.entitiesByIndex.indexOf(prevEntity);
    }
    return prevIdx > -1 && prevIdx < this.entitiesByIndex.length ?
      this.entitiesByIndex[prevIdx+1] : null;
  }
  scene.getPrevEntity = function(id) {
    var nextEntity = typeof id == 'string' ? this.entitiesById[id] : id;
    var nextIdx = -1;
    if (nextEntity) {
      nextIdx = this.entitiesByIndex.indexOf(nextEntity);
    }
    return nextIdx > 0 ?
      this.entitiesByIndex[nextIdx-1] : null;
  }

  scene.render = function() {
    var processing = this.processing;
    var list = Object.keys(this.entitiesById).forEach(function(id) {
      var entity = this.entitiesById[id];
      entity.render(processing);
    }.bind(this));
  }
})(window);