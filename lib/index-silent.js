/* window */

(function (global) {

  var CSS_URL = '//zeckson.github.io/console-stub/lib/index.css';

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

    var printEntries = function (entries, error) {
      /* TODO: add Time stamp */
      var html = '\n\nlog: ';

      if (error) {
        html += '<span class="error">' + entries[0].toString() + '</span>';

      } else {
        entries.forEach(function (code) {

          var type = typeof code;
          switch (type) {
            case 'undefined':
              html += '<span class="undefined">undefined</span>';
              break;

            case 'number':
              if (global.isNaN(code)) {
                html += '<span class="NaN">NaN</span>';
              } else if ((code === Infinity || code === -Infinity)) {
                html += '<span class="number">' + (code === -Infinity ? '-' : '') + 'Infinity</span>';
              } else {
                html += '<span class="' + type + '">' + code + '</span>'
              }
              break;

            case 'function':
              html += '<span class="function">' + code.toString() + '</span>';
              break;

            case 'string':
              html += '<span class="' + type + '">"' + code + '"</span>';
              break;

            case 'object':
              html += syntaxHighlight(code);
              break;

            default:
              html += '<span class="' + type + '">' + code + '</span>';
          }

          html += ' ';

        });
      }


      return html + '\n';
    };
    /**
     * Show formatted и highlighted code into `consoleContainer`
     */
    var log = function () {
      var args = Array.prototype.slice.call(arguments);

      codeContainer.innerHTML += printEntries(args);

      if (typeof this.onlog === 'function') {
        this.onlog(args);
      }
    };

    var err = function (errorMessage) {
      codeContainer.innerHTML += printEntries([errorMessage], true);
    };

    var clean = function () {
      codeContainer.innerHTML = '';
    };

    var getLogSource = function () {
      return consoleContainer.innerHTML;
    };

    // Public interface
    return {
      log: log,
      error: err,
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

  window.addEventListener('DOMContentLoaded', function () {
    var link = global.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_URL;
    global.document.head.appendChild(link);
    var jsConsole = jsConsoleInit(global.document.body);
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
  });


})(window);
