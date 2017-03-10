'use strict';

(function () {
  var parseParams = function (funString) {
    var paramsStart = funString.indexOf('(');
    var paramsEnd = funString.indexOf(')');

    var paramsContent = funString.substring(paramsStart + 1, paramsEnd).trim();

    if (!paramsContent) {
      return [];
    }

    return paramsContent.
      split(',').map(function (it) {
        return it.trim();
      });
  };
  var parseBody = function (funString) {
    var bodyStart = funString.indexOf('{');
    var bodyEnd = funString.indexOf('}');

    var bodyContent = funString.substring(bodyStart + 1, bodyEnd).trim();

    if (!bodyContent) {
      return [];
    }

    return bodyContent.split('\n').map(function (it) {
      return it.trim();
    });
  };

  var parse = function (funString) {
    return {
      params: parseParams(funString),
      lines: parseBody(funString)
    };
  };

  window.functionParseUtils = {
    parse: parse,
    parseBody: parseBody,
    parseParams: parseParams
  };
})();
