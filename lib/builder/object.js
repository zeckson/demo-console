'use strict';

(function () {
  var ObjectBuilder = function (buffer) {
    this.buffer = buffer;
  };

  ObjectBuilder.prototype = {
    begin: function () {
      this.buffer.
        push('{');
      return this;
    },
    _printKey: function (key) {
      this.buffer.push(key.toString());
      return this;
    },
    key: function (key) {
      if (this.filled) {
        this.buffer.push(',')
      }
      this.filled = true;

      this.buffer.newline().
        outerIndent().indent();
      this._printKey(key);
      return this;
    },
    value: function (value) {
      this.buffer.push(': ');
      this.buffer.push(value instanceof ObjectBuilder ? value.buffer : value);
      return this;
    },
    add: function (key, value) {
      return this.key(key).value(value);
    },
    end: function () {
      if (this.filled) {
        this.buffer.
          newline().
          outerIndent();
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
