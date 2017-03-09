'use strict';

describe('Buffer', function () {
  chai.use(chaiDiff);

  var appendObject = function (buffer) {
    buffer.push('{');
    buffer.indent();
    buffer.append('"key": "value"');
    buffer.unindent();
    buffer.append('}');
    return buffer;
  };

  var fillBuffer = function (buffer, values) {
    buffer.push('{');
    buffer.indent();
    values.forEach(function (it) {
      buffer.append(it);
    });
    buffer.unindent();
    buffer.append('}');
    return buffer;
  };

  it('one level indent single field', function () {
    var buffer = appendObject(new window.Buffer());

    expect(buffer.print()).to.equal(JSON.stringify({key: 'value'}, void 0, 2));
  });

  it('one level indent multi-field', function () {
    var buffer = fillBuffer(new window.Buffer(), ['"key1": 1']);

    expect(buffer.print()).to.equal(JSON.stringify({key1: 1}, void 0, 2));
  });

  it('two level indent', function () {
    var buffer = new window.Buffer();
    buffer.push('{');
    buffer.indent();
    buffer.append('"key": ' + appendObject(buffer.newBuffer()).print());
    buffer.unindent();
    buffer.append('}');

    expect(buffer.print()).to.equal(JSON.stringify({key: {key: 'value'}}, void 0, 2));
  });
});
