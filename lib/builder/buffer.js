'use strict';

var INDENT_SYMBOL = '  ';
(function () {

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
      return result.join('');
    }
  };

  var MemoryBuffer = function () {
    this.buffer = [];
    this._indent = new Indent();
  };

  MemoryBuffer.prototype = {
    outerIndent: function () {
      this.buffer.push(this._indent);
      return this;
    },
    indent: function () {
      this.buffer.push(INDENT_SYMBOL);
      return this;
    },
    push: function (entry) {
      if (entry instanceof MemoryBuffer) {
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

  window.Buffer = MemoryBuffer;
})();

(function () {
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
      if (this.buffer === entry) {
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
