'use strict';

describe('Buffer', function () {
  chai.use(chaiDiff);

  it('push', function () {
    var buffer = new window.Buffer();

    expect(buffer.push('{}').print()).to.equal('{}');
  });

  it('print with indent', function () {
    var buffer = new window.Buffer();
    expect(buffer.outerIndent().push('{}').print(1)).to.equal('  {}');
  });

});
