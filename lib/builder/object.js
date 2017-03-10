'use strict';

(function () {
  var ObjectBuilder = function (buffer) {
    this.buffer = buffer;
  };

  ObjectBuilder.prototype = {
    begin: function () {
      this.buffer.push('{').shift();
      this.buffer.newline().indent();
      return this;
    },
    _printKey: function (key) {
      this.buffer.push(key.toString());
      return this;
    },
    key: function (key) {
      if (this.filled) {
        this.buffer.push(',');
        this.buffer.newline().indent();
      }
      this.filled = true;

      this._printKey(key);
      this.buffer.push(': ');
      return this;
    },
    value: function (value) {
      this.buffer.push(value instanceof ObjectBuilder ? value.buffer : value);
      return this;
    },
    add: function (key, value) {
      return this.key(key).value(value);
    },
    end: function () {
      this.buffer.unshift();
      if (this.filled) {
        this.buffer.newline().indent();
      } else {
        this.buffer.pop().pop();
      }
      this.buffer.push('}');
      return this;
    }
  };

  var HtmlObjectBuilder = function (buffer) {
    ObjectBuilder.call(this, buffer);
  };

  HtmlObjectBuilder.prototype = Object.create(ObjectBuilder.prototype);

  HtmlObjectBuilder.prototype._printKey = function (key) {
    this.buffer.push('<span class="key">').
      push(key.toString()).
      push('</span>');
    return this;
  };


  window.ObjectBuilder = ObjectBuilder;
  window.HtmlObjectBuilder = HtmlObjectBuilder;
})();
