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
    },
    unindent: function () {
      this._indent.pop();
    },
    push: function (value) {
      this.buffer.push(this._indent.join());
      this.buffer.push(value);
    },
    print: function () {
      return this.buffer.toString();
    }
  };

  window.Buffer = Buffer;
})();
