'use strict';

(function () {
  var ArrayBuilder = function (buffer) {
    this.buffer = buffer;
    this.first = true;
  };

  ArrayBuilder.prototype = {
    begin: function () {
      this.buffer.push('[');
      return this;
    },
    add: function (value) {
      if (!(this.first)) {
        this.buffer.push(',')
      }

      this.first = false;

      this.buffer.newline().
        outerIndent().indent().
        push(value instanceof ArrayBuilder ? value.buffer : value);
      return this;
    },
    end: function () {
      if (!(this.first)) {
        this.buffer.newline().outerIndent();
      }
      this.buffer.push(']');
      return this;
    }
  };

  window.ArrayBuilder = ArrayBuilder;
})();
