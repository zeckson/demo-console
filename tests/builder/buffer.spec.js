'use strict';

describe('Buffer', function () {

  it('push', function () {
    var buffer = new window.StreamBuffer();

    expect(buffer.push('{}').print()).to.equal('{}');
  });

  it('print with indent', function () {
    var buffer = new window.StreamBuffer();
    expect(buffer.push('{').
      shift().indent().push('{}').indent().unshift().
      push('}').print()).to.equal('{  {}  }');
  });

  it('get current indent level', function () {
    var buffer = new window.StreamBuffer();

    expect(buffer.getIndentLevel()).to.equal(0);
    var inner = buffer.push('{').
      shift().indent().push('{}');

    expect(buffer.getIndentLevel()).to.equal(1);
    var outer = inner.indent().unshift().
      push('}');

    expect(buffer.getIndentLevel()).to.equal(0);
  });

  it('stream print', function () {

    var print = function (buffer, level) {
      level = level || 0;
      buffer = buffer || new window.StreamBuffer();
      if (level > 2) {
        return buffer.push('{}');
      }
      buffer.push('{').newline().shift().indent().push(print(buffer, level + 1)).newline().unshift().indent().push('}');
      return buffer;
    };


    expect(print().print()).to.equal(
        '{\n' +
      '  {\n' +
      '    {\n' +
      '      {}\n' +
      '    }\n' +
      '  }\n' +
      '}');
  });

});
