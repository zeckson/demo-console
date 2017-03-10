'use strict';

describe('Array builder', function () {
  var array = function (buffer) {
    return new window.ArrayBuilder(buffer || new window.StreamBuffer());
  };

  describe('simple tests', function () {
    it('empty', function () {
      var arr = array();
      arr.begin().end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([], void 0, 2));
    });

    it('single', function () {
      var arr = array();
      arr.begin().newItem().add('1').end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([1], void 0, 2));
    });

    it('many', function () {
      var arr = array();
      arr.begin().newItem().add('1').newItem().add('2').end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([1, 2], void 0, 2));
    });

    it('many buffer', function () {
      var arr = array();
      arr.begin().
        newItem().add(arr.buffer.push('1')).
        newItem().add(arr.buffer.push('2')).
        newItem().add(arr.buffer.push('3')).
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([1, 2, 3], void 0, 2));
    });


  });

  describe('many-dimensional', function () {

    it('two-dimensional', function () {
      var arr = array();
      arr.begin()
        .newItem().add(array(arr.buffer).begin().newItem().add('1').end()).
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[1]], void 0, 2));
    });

    it('three-dimensional', function () {
      var arr = array();
      arr.begin().
        newItem().add(array(arr.buffer).begin().
          newItem().add(array(arr.buffer).begin().
            newItem().add('1').end()).end()).end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[[1]]], void 0, 2));
    });

    it('three-dimensional empty', function () {
      var arr = array();
      arr.begin().newItem().
        add(array(arr.buffer).begin().newItem().add(array(arr.buffer).begin().end()).end()).
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[[]]], void 0, 2));
    });

    it('mixed', function () {
      var arr = array();
      arr.begin().newItem().
        add(array(arr.buffer).begin().newItem().add('1').end()).newItem().
        add('2').
        end();

      expect(arr.buffer.print()).to.equal(JSON.stringify([[1], 2], void 0, 2));
    });
  });


});
