/* window */

(function(global) {

  /**
   * Init Console
   *
   * @param {Node} consoleContainer
   * @return {{log: log}}
   */
  function jsConsoleInit(consoleContainer) {
    consoleContainer.className = 'console-container';

    consoleContainer.innerHTML =
      '<h3 class="console-container__header">Демо–Консоль</h3>' +
      '<pre class="console-container__code"></pre>';

    var codeContainer = consoleContainer.querySelector('.console-container__code');

    /**
     * Show formatted и highlighted code into `consoleContainer`
     */
    var log = function() {
      var args = Array.prototype.slice.call(arguments);
      var resultHtml;

      /* TODO: add Time stamp */
      codeContainer.innerHTML = 'log: ';

      args.forEach(function(code) {
        // Switch will not work — isNaN check is required
        if (typeof code === 'undefined') {
          resultHtml = 'undefined';

        } else if (typeof code === 'number' && global.isNaN(code)) {
          resultHtml = 'NaN';

        } else {
          resultHtml = syntaxHighlight(global.JSON.stringify(code, undefined, 2));
        }

        codeContainer.innerHTML += resultHtml;
      });

      codeContainer.innerHTML += '\n\n';
    };

    var clean = function() {
      codeContainer.innerHTML = '';
    };

    // Public interface
    return {
      log: log,
      clean: clean
    };

  }

  /**
   * Добавляет HTML-подсветку синтаксиса
   *
   * @param {Object} json
   * @returns {string} HTML-formatted code
   */
  function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,

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
