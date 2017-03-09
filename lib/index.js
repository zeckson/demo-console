'use strict';

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

      codeContainer.innerHTML += printEntries(args);

      if (typeof logger.onlog === 'function') {
        logger.onlog(args);
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
    var logger = {
      log: log,
      error: err,
      clean: clean,
      getLogSource: getLogSource
    };

    return logger;

  }

  var printEntries = function (entries, error) {
    /* TODO: add Time stamp */
    var html = 'log: ';

    if (error) {
      html += '<span class="error">' + entries[0].toString() + '</span>';

    } else {
      entries.forEach(function (code, i) {

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
              html += '<span class="' + type + '">' + code + '</span>';
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

        if (i < entries.length - 1) {
          html += '\t';
        }

      });
    }

    return html + '\n\n\n';
  };

  /**
   * Highlight code syntax with HTML
   *
   * @param {*} code
   * @return {String} HTML-formatted code
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

    var json = global.JSON.stringify(code, void 0, 2);

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

    return json.replace(new RegExp(regExpSource, 'g'), function (match) {
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

  global.jsConsoleInit = jsConsoleInit;

})(window);
