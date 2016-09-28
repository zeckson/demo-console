/* window */

(function (global) {

  /**
   * Init Console
   *
   * @param {HTMLElement} consoleContainer
   * @return {{log: log}}
   */
  function jsConsoleInit(consoleContainer) {
    consoleContainer.classList.add('console-container');

    consoleContainer.innerHTML =
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code"></pre>';

    var codeContainer = consoleContainer.querySelector('.console-container__code');

    if (!codeContainer) {
      throw Error('Console is not inited!');
    }

    /**
     * Show formatted и highlighted code into `consoleContainer`
     */
    var log = function () {
      var args = Array.prototype.slice.call(arguments);
      var resultHtml;

      /* TODO: add Time stamp */
      codeContainer.innerHTML += '\n\nlog: ';

      args.forEach(function (code) {
        // Switch will not work — isNaN check is required
        if (typeof code === 'undefined') {
          resultHtml = '<span class="undefined">undefined</span>';

        } else if (typeof code === 'number' && global.isNaN(code)) {
          resultHtml = '<span class="NaN">NaN</span>';

        } else if (typeof code === 'function') {
          resultHtml = '<span class="function">' + code.toString() + '</span>';

        } else {
          resultHtml = syntaxHighlight(code);
        }

        codeContainer.innerHTML += ' ' + resultHtml;
      });

      codeContainer.innerHTML += '\n';

      if (typeof this.onlog === 'function') {
        this.onlog(args);
      }
    };

    var clean = function () {
      codeContainer.innerHTML = '';
    };

    var getLogSource = function () {
      return consoleContainer.innerHTML;
    };

    global.onerror = function (err) {
      log(err);
    };

    // Public interface
    return {
      log: log,
      clean: clean,
      getLogSource: getLogSource
    };

  }

  /**
   * Highlight code syntax with HTML
   *
   * @param {*} code
   * @returns {String} HTML-formatted code
   *
   * @see http://stackoverflow.com/a/7220510/456020
   */
  function syntaxHighlight(code) {
    // Stringify object methods (begin)
    if (typeof code === 'object' && code !== null && !Array.isArray(code)) {
      Object.keys(code).forEach(function (key) {
        if (typeof code[key] === 'function') {
          code[key] = code[key].toString();
        }
      });
    }

    if (Array.isArray(code)) {
      code.forEach(function (item, i) {
        if (typeof item === 'function') {
          code[i] = item.toString();
        }
      });
    }
    // Stringify object methods (end)

    var json = global.JSON.stringify(code, undefined, 2);

    // http://stackoverflow.com/questions/12317049
    var regExpSource = [
      '(',
      /"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"/,
      /(\s*:)?/,
      /|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/,
      ')'
    ].map(function (r) {
      return r.source;
    }).join('');

    // Escape characters
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(new RegExp(regExpSource, 'g'),
      function (match) {
        var cls = 'number';

        if (/^"/.test(match)) {

          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }

        } else if (/true|false/.test(match)) {
          cls = 'boolean';

        } else if (/null/.test(match)) {
          cls = 'null';
        }

        return '<span class="' + cls + '">' + match + '</span>';
      });
  }

  var messages = [];
  global.onerror = function (err) {
    messages.push(err);
  };

  global.console.info = function (message) {
    messages.push(message);
  };

  window.addEventListener('DOMContentLoaded', function () {
    var style = global.document.createElement('style');
    style.innerHTML = '@import url(\'//htmlacademy.github.io/console-stub/lib/index.css\');';
    global.document.head.appendChild(style);
    var jsConsole = jsConsoleInit(global.document.body);
    global.console.log = jsConsole.log;
    global.console.error = jsConsole.log;
    global.console.info = jsConsole.log;
    global.console.debug = jsConsole.log;

    messages.forEach(function (message) {
      jsConsole.log(message);
    });
  });


})(window);