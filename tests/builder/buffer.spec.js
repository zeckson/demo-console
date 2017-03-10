'use strict';

describe('Buffer', function () {

  it('push', function () {
    var buffer = new window.Buffer();

    expect(buffer.push('{}').print()).to.equal('{}');
  });

  it('print with indent', function () {
    var buffer = new window.Buffer();
    expect(buffer.push((new window.Buffer()).outerIndent().push('{}')).print()).to.equal('  {}');
  });

  it('indent print', function () {

    var print = function (buffer, level) {
      level = level || 0;
      buffer = buffer || new window.Buffer();
      if (level > 2) {
        return buffer.push('{}');
      }
      buffer.push('{').newline().outerIndent().indent().push(print(null, level + 1)).newline().outerIndent().push('}');
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
