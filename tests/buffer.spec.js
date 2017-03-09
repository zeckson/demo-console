'use strict';

describe('Buffer', function () {
  chai.use(chaiDiff);

  it('one level indent', function () {
    var buffer = new window.Buffer();
    buffer.push('{');
    buffer.indent();
    buffer.push('key: value');
    buffer.unindent();
    buffer.push('}');

    expect(buffer.print()).to.equal(JSON.stringify({key: 'value'}, void 0, 2));
  });
});
