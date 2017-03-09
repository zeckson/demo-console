// http://mochajs.org/
// @see http://chaijs.com/api/bdd/

/* global describe, beforeEach, afterEach, it, expect */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "test*" }]*/

'use strict';

var HEADER = '<h3 class="console-container__header">Демо–Консоль</h3>';
var CONSOLE_BEGIN = '<pre class="console-container__code">';
var CONSOLE_END = '</pre>';

describe('Console', function () {
  var testDomContext;
  var jsConsoleInit = window.jsConsoleInit;
  var jsConsole;
  var consoleContainer;

  var html = function () {
    var elements = [];

    return {
      append: function (element) {
        elements.push(element);
        return this;
      },
      build: function () {
        var result = [HEADER, CONSOLE_BEGIN];
        if (elements.length > 0) {
          result.push('\n\n');
          result = result.concat(elements);
        }
        result.push(CONSOLE_END);
        return result.join('');
      }
    };
  };

  var assert = function (elements) {
    var result = html();

    if (elements) {
      elements = Array.isArray(elements) ? elements : [elements];
      elements.forEach(function (el) {
        result.append(el);
      });
    }

    expect(jsConsole.getLogSource()).to.equal(result.build());
  };


  beforeEach(function () {
    // Load html context
    document.body.innerHTML = window.__html__['tests/test-context.html'];
    testDomContext = document.querySelector('.test-context');

    consoleContainer = document.createElement('div');
    testDomContext.appendChild(consoleContainer);

    jsConsole = jsConsoleInit(consoleContainer);
  });

  afterEach(function () {
    testDomContext.innerHTML = '';
    document.body.innerHTML = '';
    jsConsole = null;
    testDomContext = null;
  });

  it('init: should create console stub with API methods', function () {
    expect(jsConsole).to.have.all.keys('log', 'error', 'clean', 'getLogSource');
  });

  it('init: should create HTML console stub ', function () {
    assert();
  });

  it('API: should log undefined', function () {
    jsConsole.log(void 0);

    assert('log: <span class="undefined">undefined</span>\n');
  });

  it('API: should log NaN', function () {
    jsConsole.log(NaN);
    assert('log: <span class="NaN">NaN</span>\n');
  });

  it('API: should log empty string', function () {
    jsConsole.log('');
    assert('log: <span class="string">""</span>\n');
  });

  it('API: should log boolean', function () {
    jsConsole.log(true);
    assert('log: <span class="boolean">true</span>\n');
  });

  it('API: should log number', function () {
    jsConsole.log(100);
    assert('log: <span class="number">100</span>\n');
  });

  it('API: should log Infinity', function () {
    jsConsole.log(Infinity);
    assert('log: <span class="number">Infinity</span>\n');
  });

  it('API: should log -Infinity', function () {
    jsConsole.log(-Infinity);

    assert('log: <span class="number">-Infinity</span>\n');
  });

  it('API: should log array', function () {
    jsConsole.log([0, 1, 2]);
    assert('log: [\n  ' +
      '<span class="number">0</span>,\n  ' +
      '<span class="number">1</span>,\n  ' +
      '<span class="number">2</span>' +
      '\n]\n');
  });

  it('API: should log object', function () {
    jsConsole.log({key: 'value'});

    assert('log: {\n  ' +
      '<span class="key">"key":</span> ' +
      '<span class="string">"value"</span>' +
      '\n}\n');
  });

  it('API: should log function', function () {
    var codeToLog = function () {
      var testVariable = 'method code';
    };

    jsConsole.log(codeToLog);

    assert('log: <span class="function">function () {\n      var testVariable = \'method code\';\n    }</span>\n');
  });

  it('API: should log object method: function', function () {
    var codeToLog = {
      method: function () {
        var testVariable = 'method code';
      }
    };

    jsConsole.log(codeToLog);

    assert('log: {\n  ' +
      '<span class="key">"method":</span> ' +
      '<span class="string">"function () {\\n        var testVariable = \'method code\';\\n      }"' +
      '</span>' +
      '\n}\n');
  });

  it('API: should log array item: function', function () {
    var codeToLog = {
      method: function () {
        var testVariable = 'method code';
      }
    };

    jsConsole.log(codeToLog);

    assert('log: {\n  ' +
      '<span class="key">"method":</span> ' +
      '<span class="string">"function () {\\n        var testVariable = \'method code\';\\n      }"' +
      '</span>' +
      '\n}\n');
  });

  it('API: should log array of objects', function () {
    var codeToLog = [
      {key1: 'value1'},
      {key2: 'value2'}
    ];

    jsConsole.log(codeToLog);

    assert('log: [\n  {\n    ' +
      '<span class="key">"key1":</span> ' +
      '<span class="string">"value1"</span>\n  },\n  {\n    ' +
      '<span class="key">"key2":</span> ' +
      '<span class="string">"value2"</span>' +
      '\n  }\n]\n');
  });

  it('API: should add log handler', function () {
    var codeToLog = 'this code should pass to log handler';
    var reference;

    // TODO: refactor with https://github.com/chaijs/chai-spies
    jsConsole.onlog = function (logData) {
      reference = logData[0]; // logData is arguments array
    };

    jsConsole.log(codeToLog);

    expect(codeToLog).to.equal(reference);
  });
});
