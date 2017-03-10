'use strict';

(function () {
  var ArrayBuilder = function (buffer) {
    this.buffer = buffer;
  };

  ArrayBuilder.prototype = {
    begin: function () {
      this.buffer.push('[');
      return this;
    },
    add: function (value) {
      if (this.filled) {
        this.buffer.push(',')
      }

      this.filled = true;

      this.buffer.newline().
        outerIndent().indent().
        push(value instanceof ArrayBuilder ? value.buffer : value);
      return this;
    },
    end: function () {
      if (this.filled) {
        this.buffer.newline().outerIndent();
      }
      this.buffer.push(']');
      return this;
    }
  };

  window.ArrayBuilder = ArrayBuilder;
})();
