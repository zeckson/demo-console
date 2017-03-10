'use strict';


(function () {
  var INDENT_SYMBOL = '  ';

  var StreamBuffer = function () {
    this.buffer = [];
    this._indent = [];
  };

  StreamBuffer.prototype = {
    indent: function () {
      this.buffer.push(this._indent.join(''));
      return this;
    },
    shift: function () {
      this._indent.push(INDENT_SYMBOL);
      return this;
    },
    unshift: function () {
      this._indent.pop();
      return this;
    },
    push: function (entry) {
      if (this === entry) {
        return entry;
      } else {
        this.pushValue(entry);
      }
      return this;
    },
    pop: function () {
      this.buffer.pop();
      return this;
    },
    pushValue: function (value) {
      this.buffer.push(value);
      return this;
    },
    newline: function () {
      this.buffer.push('\n');
      return this;
    },
    print: function () {
      return this.buffer.join('');
    },
    toString: function () {
      return this.print();
    }
  };

  window.StreamBuffer = StreamBuffer;
})();
