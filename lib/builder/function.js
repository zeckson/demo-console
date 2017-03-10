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
      this.buffer.shift();
      var _this = this;
      lines.forEach(function (it) {
        _this.bodyLine(it);
      });
      return this;
    },
    bodyLine: function (line) {
      this.filled = true;

      this.buffer.newline().indent().
        push(line);
      return this;
    },
    end: function () {
      this.buffer.unshift();
      if (this.filled) {
        this.buffer.newline().indent();
      }
      this.buffer.push('}');
      return this;
    }
  };

  var HtmlFunctionBuilder = function (buffer) {
    FunctionBuilder.call(this, buffer);
  };

  HtmlFunctionBuilder.prototype = Object.create(FunctionBuilder.prototype);

  HtmlFunctionBuilder.prototype.begin = function () {
    this.buffer.push('<span class="function">');
    return FunctionBuilder.prototype.begin.call(this);
  };
  HtmlFunctionBuilder.prototype.end = function () {
    FunctionBuilder.prototype.end.call(this);
    this.buffer.push('</span>');
    return this;
  };

  window.FunctionBuilder = FunctionBuilder;
  window.HtmlFunctionBuilder = HtmlFunctionBuilder;
})();
