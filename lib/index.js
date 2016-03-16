/* window */

(function(global) {

  /**
   * Init Console
   *
   * @param {Node} consoleContainer
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
    var log = function() {
      var args = Array.prototype.slice.call(arguments);
      var resultHtml;

      /* TODO: add Time stamp */
      codeContainer.innerHTML += '\n\nlog: ';

      args.forEach(function(code) {
        // Switch will not work — isNaN check is required
        if (typeof code === 'undefined') {
          resultHtml = '<span class="undefined">undefined</span>';

        } else if (typeof code === 'number' && global.isNaN(code)) {
          resultHtml = '<span class="nan">NaN</span>';

        } else {
          resultHtml = syntaxHighlight(global.JSON.stringify(code, undefined, 2));
        }

        codeContainer.innerHTML += ' ' + resultHtml;
      });

      codeContainer.innerHTML += '\n';
    };

    var clean = function() {
      codeContainer.innerHTML = '';
    };

    var getLogSource = function() {
      return consoleContainer.innerHTML;
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
   * @param {Object} json
   * @returns {string} HTML-formatted code
   *
   * @see http://stackoverflow.com/a/7220510/456020
   */
  function syntaxHighlight(json) {

    // http://stackoverflow.com/questions/12317049
    var regExpSource = [
      '(',
      /"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"/,
      /(\s*:)?/,
      /|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/,
      ')'
    ].map(function(r) {
      return r.source;
    }).join('');

    // Escape characters
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return json.replace(new RegExp(regExpSource, 'g'),
      function(match) {
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
