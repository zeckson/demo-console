'use strict';

describe('Object builder', function () {
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

  var object = function () {
    return new window.ObjectBuilder(new window.Buffer());
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

  describe('multi-dimensional', function () {
    it('1x depth', function () {
      var builder = object();
      builder.begin();
      builder.add('"key"', object().begin().add('"key"', '"value"').end());
      builder.end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({key: {key: 'value'}}, void 0, 2));
    });

    it('2x depth', function () {
      var builder = object();
      builder.begin();
      builder.add('"key"', object().begin().
        add('"key"', object().begin().
          add('"key"', '"value"').
          end()).
        end()
      );
      builder.end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({key: {key: {key: 'value'}}}, void 0, 2));
    });

    it('0x depth multiple keys', function () {
      var builder = object();
      builder.begin();
      builder.add('"key"', object().begin().add('"key"', '"value"').end());
      builder.add('"key2"', object().begin().add('"key"', '"value"').end());
      builder.end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({
        key: {key: 'value'},
        key2: {key: 'value'}
      }, void 0, 2));
    });
  })
});
