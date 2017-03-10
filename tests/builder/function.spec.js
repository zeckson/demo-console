'use strict';

describe('Function builder', function () {
  var fun = function () {
    return new window.FunctionBuilder(new window.Buffer());
  };

  var object = function () {
    return new window.ObjectBuilder(new window.Buffer());
  };


  describe('simple tests', function () {
    it('empty', function () {
      var builder = fun();
      builder.begin().body([]).end();

      expect(builder.buffer.print()).to.equal(function () {}.toString());
    });

    it('one liner', function () {
      var builder = fun();
      builder.begin().params(['it']).body(['return it;']).end();

      expect(builder.buffer.print()).to.equal('function (it) {\n  return it;\n}');
    });
  });

  describe('complex tests', function () {
    it('function inside object', function () {

      var builder = object();

      builder.begin().
        key('fun').
        value(fun().begin().params(['it']).body(['return it;']).end().buffer).
      end();

      expect(builder.buffer.print()).to.equal('{\n  fun: function (it) {\n    return it;\n  }\n}');
    });

  });

});
