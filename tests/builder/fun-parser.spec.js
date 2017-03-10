'use strict';

describe('Function Parse Utils', function () {

  describe('parse params', function () {
    it('empty params', function () {
      var params = window.functionParseUtils.parseParams('function () {}');

      expect(params.length).to.equal(0);
    });

    it('empty params trimmed', function () {
      var params = window.functionParseUtils.parseParams('function (     ) {}');

      expect(params.length).to.equal(0);
    });

    it('single param', function () {
      var params = window.functionParseUtils.parseParams('function (a) {}');

      expect(params).to.eql(['a']);
    });

    it('many params', function () {
      var params = window.functionParseUtils.parseParams('function (a,b,c) {}');

      expect(params).to.eql(['a', 'b', 'c']);
    });

    it('many params trimmed', function () {
      var params = window.functionParseUtils.parseParams('function (a   ,  b   ,c   ) {}');

      expect(params).to.eql(['a', 'b', 'c']);
    });

    it('real function', function () {
      var params = window.functionParseUtils.parseParams(function (a) {
        return a;
      }.toString());

      expect(params).to.eql(['a']);
    });
  });

  describe('parse body', function () {
    it('empty body', function () {
      var lines = window.functionParseUtils.parseBody('function () {}');

      expect(lines.length).to.equal(0);
    });

    it('empty body trim', function () {
      var lines = window.functionParseUtils.parseBody('function () {        }');

      expect(lines.length).to.equal(0);
    });

    it('empty body trim multiline', function () {
      var lines = window.functionParseUtils.parseBody('function () {  \n\n\n\n\n\r\n   }');

      expect(lines.length).to.equal(0);
    });

    it('one liner', function () {
      var lines = window.functionParseUtils.parseBody('function () { var a = 5 }');

      expect(lines).to.eql(['var a = 5']);
    });

    it('one liner indented', function () {
      var lines = window.functionParseUtils.parseBody('function () {\n\tvar a = 5\n}');

      expect(lines).to.eql(['var a = 5']);
    });

    it('two liner', function () {
      var lines = window.functionParseUtils.parseBody(function () {
        var a = 5;
        return a;
      }.toString());

      expect(lines).to.eql(['var a = 5;', 'return a;']);
    });

    it('many liner trimmed', function () {
      var lines = window.functionParseUtils.
        parseBody('function () {\n\t    var a = 5;\r\n   \t   return a;    \n}');

      expect(lines).to.eql(['var a = 5;', 'return a;']);
    });

  });

  describe('parse function', function () {
    it('empty', function () {
      var parsed = window.functionParseUtils.parse(function () {

      }.toString());

      expect(parsed.params).to.eql([]);
      expect(parsed.lines).to.eql([]);
    });

    it('one line', function () {
      var parsed = window.functionParseUtils.parse(function (it) {
        return it;

      }.toString());

      expect(parsed.params).to.eql(['it']);
      expect(parsed.lines).to.eql(['return it;']);
    });

    it('multi line', function () {
      var parsed = window.functionParseUtils.parse(function (it, a, b) {
        var c = a + b * 2;
        return it + c;

      }.toString());

      expect(parsed.params).to.eql(['it', 'a', 'b']);
      expect(parsed.lines).to.eql(['var c = a + b * 2;', 'return it + c;']);
    });

  });

});
