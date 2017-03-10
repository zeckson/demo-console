'use strict';

describe('Object builder', function () {
  chai.use(chaiDiff);

  var appendObject = function (buffer) {
    return fillBuffer(buffer, [['"key"', '"value"']]);
  };

  var fillBuffer = function (buffer, values) {
    var builder = new window.ObjectBuilder(buffer);
    builder.begin();
    values.forEach(function (it) {
      builder.add(it[0], it[1]);
    });
    builder.end();
    return buffer;
  };

  var newObject = function () {
    var buffer = new window.Buffer();
    var builder = new window.ObjectBuilder(buffer);
    return builder;
  };

  describe('simple tests', function () {
    it('empty', function () {
      var buffer = new window.Buffer();
      var builder = new window.ObjectBuilder(buffer);
      builder.begin();
      builder.end();

      expect(buffer.print()).to.equal(JSON.stringify({}, void 0, 2));
    });

    it('single value', function () {
      var buffer = appendObject(new window.Buffer());

      expect(buffer.print()).to.equal(JSON.stringify({key: 'value'}, void 0, 2));
    });

    it('multi value', function () {
      var buffer = fillBuffer(new window.Buffer(), [['"key1"', '1'], ['"key2"', '2']]);

      expect(buffer.print()).to.equal(JSON.stringify({key1: 1, key2: 2}, void 0, 2));
    });
  });

  describe('complex tests', function () {
    it('object in object', function () {
      var buffer = new window.Buffer();
      fillBuffer(buffer, [['"key"', appendObject(new window.Buffer())]]);

      expect(buffer.print()).to.equal(JSON.stringify({key: {key: 'value'}}, void 0, 2));
    });

    it('object in object in object', function () {
      var buffer = new window.Buffer();

      var builder = newObject();
      builder.begin();
      var inner = newObject();
      inner.begin();
      var inner2 = newObject();
      inner2.begin();
      inner2.add('"key"', '"value"');
      inner2.end();
      inner.add('"key"', inner2.buffer);
      inner.end();
      builder.add('"key"', inner.buffer);
      builder.end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({key: {key: {key: 'value'}}}, void 0, 2));
    });

    it('2 objects in object', function () {
      var buffer = new window.Buffer();
      fillBuffer(buffer, [
        ['"key"', appendObject(new window.Buffer())],
        ['"key2"', appendObject(new window.Buffer())]
      ]);

      expect(buffer.print()).to.equal(JSON.stringify({
        key: {key: 'value'},
        key2: {key: 'value'}
      }, void 0, 2));
    });
  })
});
