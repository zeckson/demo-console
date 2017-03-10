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
