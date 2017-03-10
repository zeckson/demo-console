'use strict';

(function () {
  var ObjectBuilder = function (buffer) {
    this.buffer = buffer;
    this.first = true;
  };

  ObjectBuilder.prototype = {
    begin: function () {
      this.buffer.
        push('{');
      return this;
    },
    key: function (key) {
      if (!(this.first)) {
        this.buffer.push(',')
      }
      this.first = false;

      this.buffer.newline().
        outerIndent().indent().
        push('<span class="key">').
        push(key.toString()).
        push('</span>');
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
      if (!(this.first)) {
        this.buffer.
          newline().
          outerIndent();
      }
      this.buffer.push('}');
      return this;
    }
  };

  window.ObjectBuilder = ObjectBuilder;
})();
