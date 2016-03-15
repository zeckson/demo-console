// http://mochajs.org/
// @see http://chaijs.com/api/bdd/

/* global describe, beforeEach, afterEach, it, expect */

describe('Console', function() {
  var testDomContext;
  var jsConsoleInit = window.jsConsoleInit;
  var jsConsole;
  var consoleContainer;


  beforeEach(function() {
    // Load html context
    document.body.innerHTML = window.__html__['tests/test-context.html'];
    testDomContext = document.querySelector('.test-context');

    consoleContainer = document.createElement('div');
    testDomContext.appendChild(consoleContainer);

    jsConsole = jsConsoleInit(consoleContainer);
  });

  afterEach(function() {
    testDomContext.innerHTML = '';
    document.body.innerHTML = '';
    jsConsole = null;
    testDomContext = null;
  });

  it('init: should create console stub with API methods', function() {
    expect(jsConsole).to.have.all.keys('log', 'clean', 'getLogSource');
  });

  it('init: should create HTML console stub ', function() {
    expect(consoleContainer.innerHTML).to.equal(
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code"></pre>'
    );
  });

  it('API: should log undefined', function() {
    var undefinedToLog = undefined;
    var emptyStringReference = '' +
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code">log: <span class="undefined">undefined</span>\n\n</pre>';

    jsConsole.log(undefinedToLog);

    expect(jsConsole.getLogSource()).to.equal(emptyStringReference);
  });

  it('API: should log NaN', function() {
    var nanToLog = NaN;
    var emptyStringReference = '' +
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code">log: <span class="nan">NaN</span>\n\n</pre>';

    jsConsole.log(nanToLog);

    expect(jsConsole.getLogSource()).to.equal(emptyStringReference);
  });

  it('API: should log empty string', function() {
    var emptyString = '';
    var emptyStringReference = '' +
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code">log: <span class="string">""</span>\n\n</pre>';

    jsConsole.log(emptyString);

    expect(jsConsole.getLogSource()).to.equal(emptyStringReference);
  });

  it('API: should log boolean', function() {
    var booleanToLog = true;
    var emptyStringReference = '' +
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code">log: <span class="boolean">true</span>\n\n</pre>';

    jsConsole.log(booleanToLog);

    expect(jsConsole.getLogSource()).to.equal(emptyStringReference);
  });

  it('API: should log number', function() {
    var numberToLog = 100;
    var emptyStringReference = '' +
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code">log: <span class="number">100</span>\n\n</pre>';

    jsConsole.log(numberToLog);

    expect(jsConsole.getLogSource()).to.equal(emptyStringReference);
  });


});
