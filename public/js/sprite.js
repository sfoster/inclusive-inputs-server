var Sprite = {
  currentAttributeIndex: 0,
  _initProps: function(props) {
    if (props) {
      var data = this.data || (this.data = {});
      this.attributes.forEach(function(attr) {
        if (attr.name in props) {
          data[attr.name] = props[attr.name];
        } else {
          data[attr.name] = attr.lbound;
        }
        console.log('set initial attribute value: ', attr.name, data[attr.name]);
      });
    }
  },
  init: function(props) {
    var data = this.data = {
      size: 1,
      color: 255
    }
    this.currentAttributeIndex = 0;
    this._initProps(props);
  }
}

Sprite.attributes = [
  { name: 'size', lbound: 0, ubound: 10, step: 1 },
  { name: 'color', lbound: 0, ubound: 255, step: 1 }
];

Sprite.getAttribute = function(name) {
  return this.data[name];
}

Sprite.getCurrentAttribute = function() {
  var name = this.attributes[this.currentAttributeIndex].name;
  return this.getAttribute(name);
}

Sprite.incrementAttribute = function() {
  var prevValue = this.getCurrentAttribute();
  var defn = this.attributes[this.currentAttributeIndex];
  var value = prevValue + defn.step;
  if (value > defn.ubound) {
    value = defn.lbound;
  }
  this.data[defn.name] = value;
  console.log('new attribute value: ', defn.name, value);
}

Sprite.decrementAttribute = function() {
  var prevValue = this.getCurrentAttribute();
  var defn = this.attributes[this.currentAttributeIndex];
  var value = prevValue - defn.step;
  if (value < defn.lbound) {
    value = defn.ubound;
  }
  this.data[defn.name] = value;
}

Sprite.nextAttribute = function() {
  var nextIndex = this.currentAttributeIndex+1;
  if (nextIndex >= this.attributes.length) {
    // TODO: pass along to next sprite? or loop around
    nextIndex = 0;
  }
  this.currentAttributeIndex = nextIndex;
}

Sprite.previousAttribute = function() {
  var prevIndex = this.currentAttributeIndex-1;
  if (prevIndex < 0) {
    // TODO: pass along to previous sprite? or loop around
    prevIndex = this.attributes.length -1;
  }
  this.currentAttributeIndex = prevIndex;
}

Sprite.render = function() {
  // return 1+ objects for the draw list
  console.log("Not implemented");
}