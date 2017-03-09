'use strict';

(function () {
  var INDENT_SYMBOL = '  ';

  var Buffer = function () {
    this.buffer = [];
    this._indent = [];
  };

  Buffer.prototype = {
    indent: function () {
      this._indent.push(INDENT_SYMBOL);
      return this;
    },
    unindent: function () {
      this._indent.pop();
      return this;
    },
    push: function (value) {
      this.buffer.push(value);
      return this;
    },
    append: function (value) {
      this.newline();
      this.buffer.push(this._indent.join(''));
      this.push(value);
      return this;
    },
    newline: function () {
      this.buffer.push('\n');
      return this;
    },
    newBuffer: function () {
      var buffer = new Buffer();
      buffer._indent = this._indent.slice();
      return buffer;
    },
    print: function () {
      return this.buffer.join('');
    }
  };

  window.Buffer = Buffer;
})();
