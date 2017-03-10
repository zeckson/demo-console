'use strict';

describe('Object builder', function () {
  var object = function () {
    return new window.ObjectBuilder(new window.Buffer());
  };

  describe('simple tests', function () {
    it('empty', function () {
      var builder = object().begin().end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({}, void 0, 2));
    });

    it('single value', function () {
      var builder = object().begin().add('"key"', '"value"').end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({key: 'value'}, void 0, 2));
    });

    it('multi value', function () {
      var builder = object().begin().
        add('"key"', '"value"').
        add('"key2"', '"value"').
        end();

      expect(builder.buffer.print()).to.equal(JSON.stringify({key: 'value', key2: 'value'}, void 0, 2));
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
  });
});
