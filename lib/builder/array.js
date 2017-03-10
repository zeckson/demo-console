'use strict';

(function () {
  var ArrayBuilder = function (buffer) {
    this.buffer = buffer;
  };

  ArrayBuilder.prototype = {
    begin: function () {
      this.buffer.push('[').shift();
      this.buffer.newline().indent();
      return this;
    },
    add: function (value) {
      if (this.filled) {
        this.buffer.push(',').newline().indent();
      }

      this.filled = true;

      this.buffer.
        push(value instanceof ArrayBuilder ? value.buffer : value);
      return this;
    },
    end: function () {
      if (this.filled) {
        this.buffer.newline();
      } else {
        this.buffer.pop().pop();
      }
      this.buffer.unshift().indent().push(']');
      return this;
    }
  };

  window.ArrayBuilder = ArrayBuilder;
})();
