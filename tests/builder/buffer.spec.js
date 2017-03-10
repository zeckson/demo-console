'use strict';

describe('Buffer', function () {

  it('push', function () {
    var buffer = new window.Buffer();

    expect(buffer.push('{}').print()).to.equal('{}');
  });

  it('print with indent', function () {
    var buffer = new window.Buffer();
    expect(buffer.push((new window.Buffer()).outerIndent().push('{}')).print()).to.equal('  {}');
  });

});
