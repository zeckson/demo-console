'use strict';

(function (global) {

  var INDENT_CHAR = '  ';

  /**
   * Init Console
   *
   * @param {HTMLElement} consoleContainer
   * @return {{log: log}}
   */
  function jsConsoleInit(consoleContainer) {
    consoleContainer.classList.add('console-container');

    consoleContainer.innerHTML = '<pre class="console-container__code"></pre>';

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

  var printError = function (error) {
    if (error instanceof Error) {
      error = error.message;
    }
    return '<span class="error">' + error.toString() + '</span>';
  };

  var createIndent = function (value) {
    if (!value) return '';
    return new Array(value + 1).join(INDENT_CHAR);
  };

  var printValue = function (value, indent) {
    var html;
    var type = typeof value;
    switch (type) {
      case 'undefined':
        html = '<span class="undefined">undefined</span>';
        break;

      case 'number':
        if (global.isNaN(value)) {
          html = '<span class="NaN">NaN</span>';
        } else if ((value === Infinity || value === -Infinity)) {
          html = '<span class="number">' + (value === -Infinity ? '-' : '') + 'Infinity</span>';
        } else {
          html = '<span class="' + type + '">' + value + '</span>';
        }
        break;

      case 'function':
        html = '<span class="function">' + value.toString() + '</span>';
        break;

      case 'string':
        html = '<span class="' + type + '">"' + value + '"</span>';
        break;

      case 'object':
        html = printObject(value, indent);
        break;

      default:
        html = '<span class="' + type + '">' + value + '</span>';
    }

    return createIndent(indent) + html;
  };

  var printArrayLike = function (value, indent) {
    var innerIndent = indent + 1;
    var myIndent = createIndent(indent);
    var html = [myIndent, '[\n'];
    html.push(value.map(function (it) {
        return printValue(it, innerIndent);
      }).join(',\n')
    );
    html.push('\n');
    html.push(myIndent);
    html.push(']');

    return myIndent + html.join('');
  };

  var printPlainObject = function (value, indent) {
    var keys = Object.keys(value);
    var innerIndent = indent + 1;
    var myIndent = createIndent(indent);
    var html = [myIndent, '{'];
    for (var i = 0; keys.length; i++) {
      var key = keys[i];
      html.push(createIndent(innerIndent))
    }
    html.push('}');
    return createIndent(indent);
  };

  var printObject = function (value, indent) {
    // TODO: isArray or ArrayLike
    if (Array.isArray(value)) {
      return syntaxHighlight(value);
    } else if (value instanceof Error) {
      return printError(value);
    }
    return syntaxHighlight(value);
  };

  var printEntries = function (entries, error) {
    /* TODO: add Time stamp */
    var html = 'log: ';

    if (error) {
      html += printError(entries[0]);

    } else {
      entries.forEach(function (code, i) {
        html += printValue(code, 0);
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
