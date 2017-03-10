'use strict';

(function (global) {
  var CSS_URL = '//htmlacademy.github.io/demo-console/lib/index.css';
  var SCRIPT_URL = '//htmlacademy.github.io/demo-console/lib/index.js';

  var errors = [];
  var collectErr = function (err) {
    errors.push(err);
  };
  global.onerror = collectErr;
  global.console.warn = collectErr;
  global.console.error = collectErr;

  var messages = [];
  var collectMsg = function (msg) {
    messages.push(msg);
  };
  global.console.info = collectMsg;
  global.console.log = collectMsg;
  global.console.debug = collectMsg;

  var init = function () {
    var div = global.document.createElement('div');
    var jsConsole = global.jsConsoleInit(div);
    global.document.body.appendChild(div);

    global.console.log = jsConsole.log;
    global.console.error = jsConsole.error;
    global.console.info = jsConsole.log;
    global.console.warn = jsConsole.error;

    errors.forEach(function (error) {
      jsConsole.error(error);
    });
    messages.forEach(function (msg) {
      jsConsole.log(msg);
    });
    global.onerror = function (error) {
      jsConsole.error(error);
    };
  };

  var loadStyles = function () {
    var link = global.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_URL;
    global.document.head.appendChild(link);
  };

  var loadScript = function (callback) {
    var script = global.document.createElement('script');
    script.src = SCRIPT_URL;
    script.onload = callback;
    global.document.head.appendChild(script);
  };


  window.addEventListener('DOMContentLoaded', function () {
    loadScript(init);
    loadStyles();
  });

})(window);
