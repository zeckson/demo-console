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
    newItem: function () {
      // BC! tricky hack to say array there will be value soon
      if (this.filled) {
        this.buffer.push(',').newline().indent();
      }

      this.filled = true;
      return this;
    },
    add: function (value) {
      this.buffer.
        push(value instanceof ArrayBuilder ? value.buffer : value);
      return this;
    },
    end: function () {
      this.buffer.unshift();
      if (this.filled) {
        this.buffer.newline().indent();
      } else {
        this.buffer.pop().pop();
      }
      this.buffer.push(']');
      return this;
    }
  };

  window.ArrayBuilder = ArrayBuilder;
})();
