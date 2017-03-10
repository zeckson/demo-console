'use strict';

(function () {
  var FunctionBuilder = function (buffer) {
    this.buffer = buffer;
  };

  FunctionBuilder.prototype = {
    begin: function () {
      this.buffer.push('function (');
      return this;
    },
    params: function (params) {
      this.buffer.push(params.join(','));
      return this;
    },
    body: function (lines) {
      this.buffer.push(') {');
      var _this = this;
      lines.forEach(function (it) {
        _this.bodyLine(it);
      });
      return this;
    },
    bodyLine: function (line) {
      this.filled = true;

      this.buffer.newline().
        outerIndent().indent().
        push(line);
      return this;
    },
    end: function () {
      if (this.filled) {
        this.buffer.newline().outerIndent();
      }
      this.buffer.push('}');
      return this;
    }
  };

  window.FunctionBuilder = FunctionBuilder;
})();
