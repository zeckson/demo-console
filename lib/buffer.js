'use strict';

(function () {
  var INDENT_SYMBOL = '  ';

  var Indent = function () {
    this.value = 0;
  };

  Indent.prototype = {
    addParent: function (indent) {
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
    indent: function () {
      this.buffer.push(INDENT_SYMBOL);
      return this;
    },
    push: function (entry) {
      if (entry instanceof Buffer) {
        this.pushChild(entry);
      } else {
        this.pushValue(entry);
      }
      return this;
    },
    pushChild: function (buffer) {
      buffer._indent.addParent(this._indent);
      return this.pushValue(buffer);
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

  window.Buffer = Buffer;
})();
