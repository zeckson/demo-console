// http://mochajs.org/
// @see http://chaijs.com/api/bdd/

/* global describe, beforeEach, afterEach, it, expect */

describe('Console', function() {
  var jsConsoleInit = window.jsConsoleInit;
  var jsConsole;


  beforeEach(function() {
    var consoleContainer = document.createElement('div');
    jsConsole = jsConsoleInit(consoleContainer);
  });

  afterEach(function() {
    jsConsole = null;
  });

  it('API: should init console stub', function() {
    expect(jsConsole).to.have.all.keys('log', 'clean');
  });

});
