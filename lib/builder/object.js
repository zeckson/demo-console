'use strict';

(function () {
  var ObjectBuilder = function (buffer) {
    this.buffer = buffer;
    this.first = true;
  };

  ObjectBuilder.prototype = {
    begin: function () {
      this.buffer.
        push('{');
    },
    add: function (key, value) {
      if(!(this.first)) {
        this.buffer.push(',')
      }

      this.first = false;

      this.buffer.newline().
        outerIndent().indent().
        push(key.toString()).
        push(': ');
      if (value instanceof window.Buffer) {
        this.buffer.push(value.addIndent(this.buffer));
      } else {
        this.buffer.push(value.toString());
      }
      return this;
    },
    end: function () {
      if(!(this.first)) {
        this.buffer.
          newline().
          outerIndent();
      }
      this.buffer.push('}');
    }
  };

  window.ObjectBuilder = ObjectBuilder;
})();
