'use strict';

(function () {
  var INDENT_SYMBOL = '  ';

  var Indent = function () {
    this.value = 0;
  };

  Indent.prototype = {
    add: function (indent) {
      this.parent = indent;
      this.value++;
    },
    toString: function () {
      var result = [];
      if (this.parent) {
        result.push(this.parent.toString());
      }
      for (var i = 0; i < this.value; i++) {
        result.push(INDENT_SYMBOL);
      }
      return result.join('')
    }
  };

  var Buffer = function () {
    this.buffer = [];
    this._indent = new Indent();
  };

  Buffer.prototype = {
    outerIndent: function () {
      this.buffer.push(this._indent);
      return this;
    },
    addIndent: function (buffer) {
      this._indent.add(buffer._indent);
      return this;
    },
    indent: function () {
      this.buffer.push(INDENT_SYMBOL);
      return this;
    },
    push: function (value) {
      this.buffer.push(value);
      return this;
    },
    newline: function () {
      this.buffer.push('\n');
      return this;
    },
    print: function (indent) {
      indent = indent || 0;
      this._indent.value += indent;
      var result = this.buffer.join('');
      this._indent.value -= indent;
      return result;
    },
    toString: function () {
      return this.print();
    }
  };

  window.Buffer = Buffer;
})();
