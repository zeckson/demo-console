'use strict';

describe('Primitive builder', function () {
  var prime = function (values) {
    var builder = new window.PrimitiveBuilder(new window.Buffer());
    values = Array.isArray(values) ? values : [values];
    values.forEach(function (it) {
      builder.add(it);
    });
    return builder;
  };

  describe('simple tests', function () {
    it('empty', function () {
      expect(prime().buffer.print()).to.equal('<span class="undefined">undefined</span>')
    });

    it('undefined', function () {
      expect(prime(void 0).buffer.print()).to.equal('<span class="undefined">undefined</span>')
    });

    it('string', function () {
      expect(prime('string').buffer.print()).to.equal('<span class="string">"string"</span>')
    });

    it('boolean', function () {
      expect(prime(true).buffer.print()).to.equal('<span class="boolean">true</span>')
    });

    it('number', function () {
      expect(prime(42).buffer.print()).to.equal('<span class="number">42</span>')
    });

    it('null', function () {
      expect(prime(null).buffer.print()).to.equal('<span class="null">null</span>')
    });

    it('anonymous symbol', function () {
      expect(prime(Symbol()).buffer.print()).to.equal('<span class="symbol">undefined</span>')
    });

    it('named symbol', function () {
      expect(prime(Symbol.for('foo')).buffer.print()).to.equal('<span class="symbol">foo</span>')
    });
  });

  describe('unexpected value', function () {
    it('object', function () {
      expect(function () {
        prime({}).buffer.print();
      }).to.throw('Unknown primitive type: object');
    });
  });

  describe('several values', function () {
    it('numbers', function () {
      expect(prime([42, 43]).buffer.print()).to.equal('<span class="number">42</span>\t<span class="number">43</span>')
    });
    it('number and string', function () {
      expect(prime([42, 'string']).buffer.print()).to.
        equal('<span class="number">42</span>\t<span class="string">"string"</span>')
    });
  });

});
