'use strict';

describe('Array builder', function () {
  var array = function () {
    return new window.ArrayBuilder(new window.Buffer());
  };

  describe('simple tests', function () {
    it('empty', function () {
      var arr = array();
      arr.begin().end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([], void 0, 2));
    });

    it('single', function () {
      var arr = array();
      arr.begin().add('1').end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([1], void 0, 2));
    });

    it('many', function () {
      var arr = array();
      arr.begin().add('1').add('2').end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([1, 2], void 0, 2));
    });


  });

  describe('many-dimensional', function () {

    it('two-dimensional', function () {
      var arr = array();
      arr.begin().
        add(array().begin().add('1').end()).
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[1]], void 0, 2));
    });

    it('three-dimensional', function () {
      var arr = array();
      arr.begin().
        add(array().begin().add(array().begin().add('1').end()).end()).
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[[1]]], void 0, 2));
    });

    it('mixed', function () {
      var arr = array();
      arr.begin().
        add(array().begin().add('1').end()).
        add('2').
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[1], 2], void 0, 2));
    });
  })


});
