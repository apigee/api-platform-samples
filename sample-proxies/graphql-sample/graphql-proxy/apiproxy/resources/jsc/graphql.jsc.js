// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var graphql_authz = (function (exports) {
    'use strict';

    function Main(exports) {
    'use strict;'

		if (!properties) {
      //fake the properties map
      properties = {};
    }

    if (!context) {
      //fake the context object
      context = {
        getVariable: function getVariable() {},
        setVariable: function setVariable() {}
      };
    }

    function resolveVars(str) {
      if (!str || !str.replace) {
        return null;
      }

      var replaced = str.replace(/\{([a-z0-9_.]+)\}/gi, function (match, p1) {
        return getVar(p1) || match;
      });
      return replaced;
    }

    function getProp(prop_name) {
      return properties[prop_name];
    }

    function getVar(var_name) {
      return context.getVariable(var_name);
    }

    function setVar(var_name, var_val) {
      context.setVariable(var_name, var_val);
    }

    function resolveProp(prop_name, defaultValue) {
      var prop_value = getProp(prop_name);
      var result = resolveVars(prop_value);

      if (!result && typeof defaultValue !== 'undefined') {
        return defaultValue;
      }

      return result;
    }

    var resolveVars_1 = resolveVars;
    var getVar_1 = getVar;
    var setVar_1 = setVar;
    var getProp_1 = getProp;
    var resolveProp_1 = resolveProp;

    var resolver = {
    	resolveVars: resolveVars_1,
    	getVar: getVar_1,
    	setVar: setVar_1,
    	getProp: getProp_1,
    	resolveProp: resolveProp_1
    };

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    /**
     * Copyright (c) 2018-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    var nodejsCustomInspectSymbol = typeof Symbol === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;

    function _typeof$1(obj) {
      if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
        _typeof$1 = function _typeof$$1(obj) {
          return _typeof(obj);
        };
      } else {
        _typeof$1 = function _typeof$$1(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
        };
      }

      return _typeof$1(obj);
    }
    /**
     * Used to print values in error messages.
     */

    function inspect(value) {
      switch (_typeof$1(value)) {
        case 'string':
          return JSON.stringify(value);

        case 'function':
          return value.name ? "[function ".concat(value.name, "]") : '[function]';

        case 'object':
          if (value) {
            var customInspectFn = getCustomFn(value);

            if (customInspectFn) {
              // $FlowFixMe(>=0.90.0)
              var customValue = customInspectFn.call(value);
              return typeof customValue === 'string' ? customValue : inspect(customValue);
            } else if (Array.isArray(value)) {
              return '[' + value.map(inspect).join(', ') + ']';
            }

            var properties = Object.keys(value).map(function (k) {
              return "".concat(k, ": ").concat(inspect(value[k]));
            }).join(', ');
            return properties ? '{ ' + properties + ' }' : '{}';
          }

          return String(value);

        default:
          return String(value);
      }
    }

    function getCustomFn(object) {
      var customInspectFn = object[String(nodejsCustomInspectSymbol)];

      if (typeof customInspectFn === 'function') {
        return customInspectFn;
      }

      if (typeof object.inspect === 'function') {
        return object.inspect;
      }
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * The `defineToJSON()` function defines toJSON() and inspect() prototype
     * methods, if no function provided they become aliases for toString().
     */

    function defineToJSON( // eslint-disable-next-line flowtype/no-weak-types
    classObject) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : classObject.prototype.toString;
      classObject.prototype.toJSON = fn;
      classObject.prototype.inspect = fn;

      if (nodejsCustomInspectSymbol) {
        classObject.prototype[nodejsCustomInspectSymbol] = fn;
      }
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    function invariant(condition, message) {
      /* istanbul ignore else */
      if (!condition) {
        throw new Error(message);
      }
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    /**
     * The `defineToStringTag()` function checks first to see if the runtime
     * supports the `Symbol` class and then if the `Symbol.toStringTag` constant
     * is defined as a `Symbol` instance. If both conditions are met, the
     * Symbol.toStringTag property is defined as a getter that returns the
     * supplied class constructor's name.
     *
     * @method defineToStringTag
     *
     * @param {Class<any>} classObject a class such as Object, String, Number but
     * typically one of your own creation through the class keyword; `class A {}`,
     * for example.
     */
    function defineToStringTag(classObject) {
      if (typeof Symbol === 'function' && Symbol.toStringTag) {
        Object.defineProperty(classObject.prototype, Symbol.toStringTag, {
          get: function get() {
            return this.constructor.name;
          }
        });
      }
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * A representation of source input to GraphQL.
     * `name` and `locationOffset` are optional. They are useful for clients who
     * store GraphQL documents in source files; for example, if the GraphQL input
     * starts at line 40 in a file named Foo.graphql, it might be useful for name to
     * be "Foo.graphql" and location to be `{ line: 40, column: 0 }`.
     * line and column in locationOffset are 1-indexed
     */

    var Source = function Source(body, name, locationOffset) {
      this.body = body;
      this.name = name || 'GraphQL request';
      this.locationOffset = locationOffset || {
        line: 1,
        column: 1
      };
      !(this.locationOffset.line > 0) ? invariant(0, 'line in locationOffset is 1-indexed and must be positive') : void 0;
      !(this.locationOffset.column > 0) ? invariant(0, 'column in locationOffset is 1-indexed and must be positive') : void 0;
    }; // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

    defineToStringTag(Source);

    var source = /*#__PURE__*/Object.freeze({
        Source: Source
    });

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    /**
     * Represents a location in a Source.
     */

    /**
     * Takes a Source and a UTF-8 character offset, and returns the corresponding
     * line and column as a SourceLocation.
     */
    function getLocation(source, position) {
      var lineRegexp = /\r\n|[\n\r]/g;
      var line = 1;
      var column = position + 1;
      var match;

      while ((match = lineRegexp.exec(source.body)) && match.index < position) {
        line += 1;
        column = position + 1 - (match.index + match[0].length);
      }

      return {
        line: line,
        column: column
      };
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * Prints a GraphQLError to a string, representing useful location information
     * about the error's position in the source.
     */

    function printError(error) {
      var printedLocations = [];

      if (error.nodes) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = error.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;

            if (node.loc) {
              printedLocations.push(highlightSourceAtLocation(node.loc.source, getLocation(node.loc.source, node.loc.start)));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else if (error.source && error.locations) {
        var source = error.source;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = error.locations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var location = _step2.value;
            printedLocations.push(highlightSourceAtLocation(source, location));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return printedLocations.length === 0 ? error.message : [error.message].concat(printedLocations).join('\n\n') + '\n';
    }
    /**
     * Render a helpful description of the location of the error in the GraphQL
     * Source document.
     */

    function highlightSourceAtLocation(source, location) {
      var firstLineColumnOffset = source.locationOffset.column - 1;
      var body = whitespace(firstLineColumnOffset) + source.body;
      var lineIndex = location.line - 1;
      var lineOffset = source.locationOffset.line - 1;
      var lineNum = location.line + lineOffset;
      var columnOffset = location.line === 1 ? firstLineColumnOffset : 0;
      var columnNum = location.column + columnOffset;
      var lines = body.split(/\r\n|[\n\r]/g);
      return "".concat(source.name, " (").concat(lineNum, ":").concat(columnNum, ")\n") + printPrefixedLines([// Lines specified like this: ["prefix", "string"],
      ["".concat(lineNum - 1, ": "), lines[lineIndex - 1]], ["".concat(lineNum, ": "), lines[lineIndex]], ['', whitespace(columnNum - 1) + '^'], ["".concat(lineNum + 1, ": "), lines[lineIndex + 1]]]);
    }

    function printPrefixedLines(lines) {
      var existingLines = lines.filter(function (_ref) {
        var _ = _ref[0],
            line = _ref[1];
        return line !== undefined;
      });
      var padLen = 0;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = existingLines[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref4 = _step3.value;
          var prefix = _ref4[0];
          padLen = Math.max(padLen, prefix.length);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return existingLines.map(function (_ref3) {
        var prefix = _ref3[0],
            line = _ref3[1];
        return lpad(padLen, prefix) + line;
      }).join('\n');
    }

    function whitespace(len) {
      return Array(len + 1).join(' ');
    }

    function lpad(len, str) {
      return whitespace(len - str.length) + str;
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    function GraphQLError( // eslint-disable-line no-redeclare
    message, nodes, source, positions, path, originalError, extensions) {
      // Compute list of blame nodes.
      var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : undefined : nodes ? [nodes] : undefined; // Compute locations in the source for the given nodes/positions.


      var _source = source;

      if (!_source && _nodes) {
        var node = _nodes[0];
        _source = node && node.loc && node.loc.source;
      }

      var _positions = positions;

      if (!_positions && _nodes) {
        _positions = _nodes.reduce(function (list, node) {
          if (node.loc) {
            list.push(node.loc.start);
          }

          return list;
        }, []);
      }

      if (_positions && _positions.length === 0) {
        _positions = undefined;
      }

      var _locations;

      if (positions && source) {
        _locations = positions.map(function (pos) {
          return getLocation(source, pos);
        });
      } else if (_nodes) {
        _locations = _nodes.reduce(function (list, node) {
          if (node.loc) {
            list.push(getLocation(node.loc.source, node.loc.start));
          }

          return list;
        }, []);
      }

      var _extensions = extensions || originalError && originalError.extensions;

      Object.defineProperties(this, {
        message: {
          value: message,
          // By being enumerable, JSON.stringify will include `message` in the
          // resulting output. This ensures that the simplest possible GraphQL
          // service adheres to the spec.
          enumerable: true,
          writable: true
        },
        locations: {
          // Coercing falsey values to undefined ensures they will not be included
          // in JSON.stringify() when not provided.
          value: _locations || undefined,
          // By being enumerable, JSON.stringify will include `locations` in the
          // resulting output. This ensures that the simplest possible GraphQL
          // service adheres to the spec.
          enumerable: Boolean(_locations)
        },
        path: {
          // Coercing falsey values to undefined ensures they will not be included
          // in JSON.stringify() when not provided.
          value: path || undefined,
          // By being enumerable, JSON.stringify will include `path` in the
          // resulting output. This ensures that the simplest possible GraphQL
          // service adheres to the spec.
          enumerable: Boolean(path)
        },
        nodes: {
          value: _nodes || undefined
        },
        source: {
          value: _source || undefined
        },
        positions: {
          value: _positions || undefined
        },
        originalError: {
          value: originalError
        },
        extensions: {
          // Coercing falsey values to undefined ensures they will not be included
          // in JSON.stringify() when not provided.
          value: _extensions || undefined,
          // By being enumerable, JSON.stringify will include `path` in the
          // resulting output. This ensures that the simplest possible GraphQL
          // service adheres to the spec.
          enumerable: Boolean(_extensions)
        }
      }); // Include (non-enumerable) stack trace.

      if (originalError && originalError.stack) {
        Object.defineProperty(this, 'stack', {
          value: originalError.stack,
          writable: true,
          configurable: true
        });
      } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, GraphQLError);
      } else {
        Object.defineProperty(this, 'stack', {
          value: Error().stack,
          writable: true,
          configurable: true
        });
      }
    }
    GraphQLError.prototype = Object.create(Error.prototype, {
      constructor: {
        value: GraphQLError
      },
      name: {
        value: 'GraphQLError'
      },
      toString: {
        value: function toString() {
          return printError(this);
        }
      }
    });

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * Produces a GraphQLError representing a syntax error, containing useful
     * descriptive information about the syntax error's position in the source.
     */

    function syntaxError(source, position, description) {
      return new GraphQLError("Syntax Error: ".concat(description), undefined, source, [position]);
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * Given an arbitrary Error, presumably thrown while attempting to execute a
     * GraphQL operation, produce a new GraphQLError aware of the location in the
     * document responsible for the original Error.
     */

    function locatedError(originalError, nodes, path) {
      // Note: this uses a brand-check to support GraphQL errors originating from
      // other contexts.
      if (originalError && Array.isArray(originalError.path)) {
        return originalError;
      }

      return new GraphQLError(originalError && originalError.message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * Given a GraphQLError, format it according to the rules described by the
     * Response Format, Errors section of the GraphQL Specification.
     */

    function formatError(error) {
      !error ? invariant(0, 'Received null or undefined error.') : void 0;
      var message = error.message || 'An unknown error occurred.';
      var locations = error.locations;
      var path = error.path;
      var extensions = error.extensions;
      return extensions ? {
        message: message,
        locations: locations,
        path: path,
        extensions: extensions
      } : {
        message: message,
        locations: locations,
        path: path
      };
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    var error = /*#__PURE__*/Object.freeze({
        GraphQLError: GraphQLError,
        syntaxError: syntaxError,
        locatedError: locatedError,
        printError: printError,
        formatError: formatError
    });

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    /**
     * Produces the value of a block string from its parsed raw value, similar to
     * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
     *
     * This implements the GraphQL spec's BlockStringValue() static algorithm.
     */
    function blockStringValue(rawString) {
      // Expand a block string's raw value into independent lines.
      var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.

      var commonIndent = null;

      for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        var indent = leadingWhitespace(line);

        if (indent < line.length && (commonIndent === null || indent < commonIndent)) {
          commonIndent = indent;

          if (commonIndent === 0) {
            break;
          }
        }
      }

      if (commonIndent) {
        for (var _i = 1; _i < lines.length; _i++) {
          lines[_i] = lines[_i].slice(commonIndent);
        }
      } // Remove leading and trailing blank lines.


      while (lines.length > 0 && isBlank(lines[0])) {
        lines.shift();
      }

      while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
        lines.pop();
      } // Return a string of the lines joined with U+000A.


      return lines.join('\n');
    }

    function leadingWhitespace(str) {
      var i = 0;

      while (i < str.length && (str[i] === ' ' || str[i] === '\t')) {
        i++;
      }

      return i;
    }

    function isBlank(str) {
      return leadingWhitespace(str) === str.length;
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * Given a Source object, this returns a Lexer for that source.
     * A Lexer is a stateful stream generator in that every time
     * it is advanced, it returns the next token in the Source. Assuming the
     * source lexes, the final Token emitted by the lexer will be of kind
     * EOF, after which the lexer will repeatedly return the same EOF token
     * whenever called.
     */

    function createLexer(source, options) {
      var startOfFileToken = new Tok(TokenKind.SOF, 0, 0, 0, 0, null);
      var lexer = {
        source: source,
        options: options,
        lastToken: startOfFileToken,
        token: startOfFileToken,
        line: 1,
        lineStart: 0,
        advance: advanceLexer,
        lookahead: lookahead
      };
      return lexer;
    }

    function advanceLexer() {
      this.lastToken = this.token;
      var token = this.token = this.lookahead();
      return token;
    }

    function lookahead() {
      var token = this.token;

      if (token.kind !== TokenKind.EOF) {
        do {
          // Note: next is only mutable during parsing, so we cast to allow this.
          token = token.next || (token.next = readToken(this, token));
        } while (token.kind === TokenKind.COMMENT);
      }

      return token;
    }
    /**
     * The return type of createLexer.
     */

    /**
     * An exported enum describing the different kinds of tokens that the
     * lexer emits.
     */


    var TokenKind = Object.freeze({
      SOF: '<SOF>',
      EOF: '<EOF>',
      BANG: '!',
      DOLLAR: '$',
      AMP: '&',
      PAREN_L: '(',
      PAREN_R: ')',
      SPREAD: '...',
      COLON: ':',
      EQUALS: '=',
      AT: '@',
      BRACKET_L: '[',
      BRACKET_R: ']',
      BRACE_L: '{',
      PIPE: '|',
      BRACE_R: '}',
      NAME: 'Name',
      INT: 'Int',
      FLOAT: 'Float',
      STRING: 'String',
      BLOCK_STRING: 'BlockString',
      COMMENT: 'Comment'
    });
    /**
     * The enum type representing the token kinds values.
     */

    /**
     * A helper function to describe a token as a string for debugging
     */

    function getTokenDesc(token) {
      var value = token.value;
      return value ? "".concat(token.kind, " \"").concat(value, "\"") : token.kind;
    }
    var charCodeAt = String.prototype.charCodeAt;
    var slice = String.prototype.slice;
    /**
     * Helper function for constructing the Token object.
     */

    function Tok(kind, start, end, line, column, prev, value) {
      this.kind = kind;
      this.start = start;
      this.end = end;
      this.line = line;
      this.column = column;
      this.value = value;
      this.prev = prev;
      this.next = null;
    } // Print a simplified form when appearing in JSON/util.inspect.


    defineToJSON(Tok, function () {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column
      };
    });

    function printCharCode(code) {
      return (// NaN/undefined represents access beyond the end of the file.
        isNaN(code) ? TokenKind.EOF : // Trust JSON for ASCII.
        code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : // Otherwise print the escaped form.
        "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"")
      );
    }
    /**
     * Gets the next token from the source starting at the given position.
     *
     * This skips over whitespace until it finds the next lexable token, then lexes
     * punctuators immediately or calls the appropriate helper function for more
     * complicated tokens.
     */


    function readToken(lexer, prev) {
      var source = lexer.source;
      var body = source.body;
      var bodyLength = body.length;
      var pos = positionAfterWhitespace(body, prev.end, lexer);
      var line = lexer.line;
      var col = 1 + pos - lexer.lineStart;

      if (pos >= bodyLength) {
        return new Tok(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
      }

      var code = charCodeAt.call(body, pos); // SourceCharacter

      switch (code) {
        // !
        case 33:
          return new Tok(TokenKind.BANG, pos, pos + 1, line, col, prev);
        // #

        case 35:
          return readComment(source, pos, line, col, prev);
        // $

        case 36:
          return new Tok(TokenKind.DOLLAR, pos, pos + 1, line, col, prev);
        // &

        case 38:
          return new Tok(TokenKind.AMP, pos, pos + 1, line, col, prev);
        // (

        case 40:
          return new Tok(TokenKind.PAREN_L, pos, pos + 1, line, col, prev);
        // )

        case 41:
          return new Tok(TokenKind.PAREN_R, pos, pos + 1, line, col, prev);
        // .

        case 46:
          if (charCodeAt.call(body, pos + 1) === 46 && charCodeAt.call(body, pos + 2) === 46) {
            return new Tok(TokenKind.SPREAD, pos, pos + 3, line, col, prev);
          }

          break;
        // :

        case 58:
          return new Tok(TokenKind.COLON, pos, pos + 1, line, col, prev);
        // =

        case 61:
          return new Tok(TokenKind.EQUALS, pos, pos + 1, line, col, prev);
        // @

        case 64:
          return new Tok(TokenKind.AT, pos, pos + 1, line, col, prev);
        // [

        case 91:
          return new Tok(TokenKind.BRACKET_L, pos, pos + 1, line, col, prev);
        // ]

        case 93:
          return new Tok(TokenKind.BRACKET_R, pos, pos + 1, line, col, prev);
        // {

        case 123:
          return new Tok(TokenKind.BRACE_L, pos, pos + 1, line, col, prev);
        // |

        case 124:
          return new Tok(TokenKind.PIPE, pos, pos + 1, line, col, prev);
        // }

        case 125:
          return new Tok(TokenKind.BRACE_R, pos, pos + 1, line, col, prev);
        // A-Z _ a-z

        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 95:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
          return readName(source, pos, line, col, prev);
        // - 0-9

        case 45:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return readNumber(source, pos, code, line, col, prev);
        // "

        case 34:
          if (charCodeAt.call(body, pos + 1) === 34 && charCodeAt.call(body, pos + 2) === 34) {
            return readBlockString(source, pos, line, col, prev, lexer);
          }

          return readString(source, pos, line, col, prev);
      }

      throw syntaxError(source, pos, unexpectedCharacterMessage(code));
    }
    /**
     * Report a message that an unexpected character was encountered.
     */


    function unexpectedCharacterMessage(code) {
      if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
        return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
      }

      if (code === 39) {
        // '
        return "Unexpected single quote character ('), did you mean to use " + 'a double quote (")?';
      }

      return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
    }
    /**
     * Reads from body starting at startPosition until it finds a non-whitespace
     * character, then returns the position of that character for lexing.
     */


    function positionAfterWhitespace(body, startPosition, lexer) {
      var bodyLength = body.length;
      var position = startPosition;

      while (position < bodyLength) {
        var code = charCodeAt.call(body, position); // tab | space | comma | BOM

        if (code === 9 || code === 32 || code === 44 || code === 0xfeff) {
          ++position;
        } else if (code === 10) {
          // new line
          ++position;
          ++lexer.line;
          lexer.lineStart = position;
        } else if (code === 13) {
          // carriage return
          if (charCodeAt.call(body, position + 1) === 10) {
            position += 2;
          } else {
            ++position;
          }

          ++lexer.line;
          lexer.lineStart = position;
        } else {
          break;
        }
      }

      return position;
    }
    /**
     * Reads a comment token from the source file.
     *
     * #[\u0009\u0020-\uFFFF]*
     */


    function readComment(source, start, line, col, prev) {
      var body = source.body;
      var code;
      var position = start;

      do {
        code = charCodeAt.call(body, ++position);
      } while (code !== null && ( // SourceCharacter but not LineTerminator
      code > 0x001f || code === 0x0009));

      return new Tok(TokenKind.COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
    }
    /**
     * Reads a number token from the source file, either a float
     * or an int depending on whether a decimal point appears.
     *
     * Int:   -?(0|[1-9][0-9]*)
     * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
     */


    function readNumber(source, start, firstCode, line, col, prev) {
      var body = source.body;
      var code = firstCode;
      var position = start;
      var isFloat = false;

      if (code === 45) {
        // -
        code = charCodeAt.call(body, ++position);
      }

      if (code === 48) {
        // 0
        code = charCodeAt.call(body, ++position);

        if (code >= 48 && code <= 57) {
          throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
        }
      } else {
        position = readDigits(source, position, code);
        code = charCodeAt.call(body, position);
      }

      if (code === 46) {
        // .
        isFloat = true;
        code = charCodeAt.call(body, ++position);
        position = readDigits(source, position, code);
        code = charCodeAt.call(body, position);
      }

      if (code === 69 || code === 101) {
        // E e
        isFloat = true;
        code = charCodeAt.call(body, ++position);

        if (code === 43 || code === 45) {
          // + -
          code = charCodeAt.call(body, ++position);
        }

        position = readDigits(source, position, code);
      }

      return new Tok(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, slice.call(body, start, position));
    }
    /**
     * Returns the new position in the source after reading digits.
     */


    function readDigits(source, start, firstCode) {
      var body = source.body;
      var position = start;
      var code = firstCode;

      if (code >= 48 && code <= 57) {
        // 0 - 9
        do {
          code = charCodeAt.call(body, ++position);
        } while (code >= 48 && code <= 57); // 0 - 9


        return position;
      }

      throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
    }
    /**
     * Reads a string token from the source file.
     *
     * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
     */


    function readString(source, start, line, col, prev) {
      var body = source.body;
      var position = start + 1;
      var chunkStart = position;
      var code = 0;
      var value = '';

      while (position < body.length && (code = charCodeAt.call(body, position)) !== null && // not LineTerminator
      code !== 0x000a && code !== 0x000d) {
        // Closing Quote (")
        if (code === 34) {
          value += slice.call(body, chunkStart, position);
          return new Tok(TokenKind.STRING, start, position + 1, line, col, prev, value);
        } // SourceCharacter


        if (code < 0x0020 && code !== 0x0009) {
          throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
        }

        ++position;

        if (code === 92) {
          // \
          value += slice.call(body, chunkStart, position - 1);
          code = charCodeAt.call(body, position);

          switch (code) {
            case 34:
              value += '"';
              break;

            case 47:
              value += '/';
              break;

            case 92:
              value += '\\';
              break;

            case 98:
              value += '\b';
              break;

            case 102:
              value += '\f';
              break;

            case 110:
              value += '\n';
              break;

            case 114:
              value += '\r';
              break;

            case 116:
              value += '\t';
              break;

            case 117:
              // u
              var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));

              if (charCode < 0) {
                throw syntaxError(source, position, 'Invalid character escape sequence: ' + "\\u".concat(body.slice(position + 1, position + 5), "."));
              }

              value += String.fromCharCode(charCode);
              position += 4;
              break;

            default:
              throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
          }

          ++position;
          chunkStart = position;
        }
      }

      throw syntaxError(source, position, 'Unterminated string.');
    }
    /**
     * Reads a block string token from the source file.
     *
     * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
     */


    function readBlockString(source, start, line, col, prev, lexer) {
      var body = source.body;
      var position = start + 3;
      var chunkStart = position;
      var code = 0;
      var rawValue = '';

      while (position < body.length && (code = charCodeAt.call(body, position)) !== null) {
        // Closing Triple-Quote (""")
        if (code === 34 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34) {
          rawValue += slice.call(body, chunkStart, position);
          return new Tok(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, blockStringValue(rawValue));
        } // SourceCharacter


        if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
          throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
        }

        if (code === 10) {
          // new line
          ++position;
          ++lexer.line;
          lexer.lineStart = position;
        } else if (code === 13) {
          // carriage return
          if (charCodeAt.call(body, position + 1) === 10) {
            position += 2;
          } else {
            ++position;
          }

          ++lexer.line;
          lexer.lineStart = position;
        } else if ( // Escape Triple-Quote (\""")
        code === 92 && charCodeAt.call(body, position + 1) === 34 && charCodeAt.call(body, position + 2) === 34 && charCodeAt.call(body, position + 3) === 34) {
          rawValue += slice.call(body, chunkStart, position) + '"""';
          position += 4;
          chunkStart = position;
        } else {
          ++position;
        }
      }

      throw syntaxError(source, position, 'Unterminated string.');
    }
    /**
     * Converts four hexadecimal chars to the integer that the
     * string represents. For example, uniCharCode('0','0','0','f')
     * will return 15, and uniCharCode('0','0','f','f') returns 255.
     *
     * Returns a negative number on error, if a char was invalid.
     *
     * This is implemented by noting that char2hex() returns -1 on error,
     * which means the result of ORing the char2hex() will also be negative.
     */


    function uniCharCode(a, b, c, d) {
      return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
    }
    /**
     * Converts a hex character to its integer value.
     * '0' becomes 0, '9' becomes 9
     * 'A' becomes 10, 'F' becomes 15
     * 'a' becomes 10, 'f' becomes 15
     *
     * Returns -1 on error.
     */


    function char2hex(a) {
      return a >= 48 && a <= 57 ? a - 48 // 0-9
      : a >= 65 && a <= 70 ? a - 55 // A-F
      : a >= 97 && a <= 102 ? a - 87 // a-f
      : -1;
    }
    /**
     * Reads an alphanumeric + underscore name from the source.
     *
     * [_A-Za-z][_0-9A-Za-z]*
     */


    function readName(source, start, line, col, prev) {
      var body = source.body;
      var bodyLength = body.length;
      var position = start + 1;
      var code = 0;

      while (position !== bodyLength && (code = charCodeAt.call(body, position)) !== null && (code === 95 || // _
      code >= 48 && code <= 57 || // 0-9
      code >= 65 && code <= 90 || // A-Z
      code >= 97 && code <= 122) // a-z
      ) {
        ++position;
      }

      return new Tok(TokenKind.NAME, start, position, line, col, prev, slice.call(body, start, position));
    }

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    /**
     * The set of allowed kind values for AST nodes.
     */
    var Kind = Object.freeze({
      // Name
      NAME: 'Name',
      // Document
      DOCUMENT: 'Document',
      OPERATION_DEFINITION: 'OperationDefinition',
      VARIABLE_DEFINITION: 'VariableDefinition',
      SELECTION_SET: 'SelectionSet',
      FIELD: 'Field',
      ARGUMENT: 'Argument',
      // Fragments
      FRAGMENT_SPREAD: 'FragmentSpread',
      INLINE_FRAGMENT: 'InlineFragment',
      FRAGMENT_DEFINITION: 'FragmentDefinition',
      // Values
      VARIABLE: 'Variable',
      INT: 'IntValue',
      FLOAT: 'FloatValue',
      STRING: 'StringValue',
      BOOLEAN: 'BooleanValue',
      NULL: 'NullValue',
      ENUM: 'EnumValue',
      LIST: 'ListValue',
      OBJECT: 'ObjectValue',
      OBJECT_FIELD: 'ObjectField',
      // Directives
      DIRECTIVE: 'Directive',
      // Types
      NAMED_TYPE: 'NamedType',
      LIST_TYPE: 'ListType',
      NON_NULL_TYPE: 'NonNullType',
      // Type System Definitions
      SCHEMA_DEFINITION: 'SchemaDefinition',
      OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
      // Type Definitions
      SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
      OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
      FIELD_DEFINITION: 'FieldDefinition',
      INPUT_VALUE_DEFINITION: 'InputValueDefinition',
      INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
      UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
      ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
      ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
      INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
      // Directive Definitions
      DIRECTIVE_DEFINITION: 'DirectiveDefinition',
      // Type System Extensions
      SCHEMA_EXTENSION: 'SchemaExtension',
      // Type Extensions
      SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
      OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
      INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
      UNION_TYPE_EXTENSION: 'UnionTypeExtension',
      ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
      INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
    });
    /**
     * The enum type representing the possible kind values of AST nodes.
     */

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */

    /**
     * The set of allowed directive location values.
     */
    var DirectiveLocation = Object.freeze({
      // Request Definitions
      QUERY: 'QUERY',
      MUTATION: 'MUTATION',
      SUBSCRIPTION: 'SUBSCRIPTION',
      FIELD: 'FIELD',
      FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
      FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
      INLINE_FRAGMENT: 'INLINE_FRAGMENT',
      VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
      // Type System Definitions
      SCHEMA: 'SCHEMA',
      SCALAR: 'SCALAR',
      OBJECT: 'OBJECT',
      FIELD_DEFINITION: 'FIELD_DEFINITION',
      ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
      INTERFACE: 'INTERFACE',
      UNION: 'UNION',
      ENUM: 'ENUM',
      ENUM_VALUE: 'ENUM_VALUE',
      INPUT_OBJECT: 'INPUT_OBJECT',
      INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
    });
    /**
     * The enum type representing the directive location values.
     */

    /**
     * Copyright (c) 2015-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     * 
     */
    /**
     * Configuration options to control parser behavior
     */

    /**
     * Given a GraphQL source, parses it into a Document.
     * Throws GraphQLError if a syntax error is encountered.
     */

    function parse(source, options) {
      var sourceObj = typeof source === 'string' ? new Source(source) : source;

      if (!(sourceObj instanceof Source)) {
        throw new TypeError("Must provide Source. Received: ".concat(inspect(sourceObj)));
      }

      var lexer = createLexer(sourceObj, options || {});
      return parseDocument(lexer);
    }
    /**
     * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
     * that value.
     * Throws GraphQLError if a syntax error is encountered.
     *
     * This is useful within tools that operate upon GraphQL Values directly and
     * in isolation of complete GraphQL documents.
     *
     * Consider providing the results to the utility function: valueFromAST().
     */

    function parseValue(source, options) {
      var sourceObj = typeof source === 'string' ? new Source(source) : source;
      var lexer = createLexer(sourceObj, options || {});
      expect(lexer, TokenKind.SOF);
      var value = parseValueLiteral(lexer, false);
      expect(lexer, TokenKind.EOF);
      return value;
    }
    /**
     * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
     * that type.
     * Throws GraphQLError if a syntax error is encountered.
     *
     * This is useful within tools that operate upon GraphQL Types directly and
     * in isolation of complete GraphQL documents.
     *
     * Consider providing the results to the utility function: typeFromAST().
     */

    function parseType(source, options) {
      var sourceObj = typeof source === 'string' ? new Source(source) : source;
      var lexer = createLexer(sourceObj, options || {});
      expect(lexer, TokenKind.SOF);
      var type = parseTypeReference(lexer);
      expect(lexer, TokenKind.EOF);
      return type;
    }
    /**
     * Converts a name lex token into a name parse node.
     */

    function parseName(lexer) {
      var token = expect(lexer, TokenKind.NAME);
      return {
        kind: Kind.NAME,
        value: token.value,
        loc: loc(lexer, token)
      };
    } // Implements the parsing rules in the Document section.

    /**
     * Document : Definition+
     */


    function parseDocument(lexer) {
      var start = lexer.token;
      return {
        kind: Kind.DOCUMENT,
        definitions: many(lexer, TokenKind.SOF, parseDefinition, TokenKind.EOF),
        loc: loc(lexer, start)
      };
    }
    /**
     * Definition :
     *   - ExecutableDefinition
     *   - TypeSystemDefinition
     *   - TypeSystemExtension
     */


    function parseDefinition(lexer) {
      if (peek(lexer, TokenKind.NAME)) {
        switch (lexer.token.value) {
          case 'query':
          case 'mutation':
          case 'subscription':
          case 'fragment':
            return parseExecutableDefinition(lexer);

          case 'schema':
          case 'scalar':
          case 'type':
          case 'interface':
          case 'union':
          case 'enum':
          case 'input':
          case 'directive':
            return parseTypeSystemDefinition(lexer);

          case 'extend':
            return parseTypeSystemExtension(lexer);
        }
      } else if (peek(lexer, TokenKind.BRACE_L)) {
        return parseExecutableDefinition(lexer);
      } else if (peekDescription(lexer)) {
        return parseTypeSystemDefinition(lexer);
      }

      throw unexpected(lexer);
    }
    /**
     * ExecutableDefinition :
     *   - OperationDefinition
     *   - FragmentDefinition
     */


    function parseExecutableDefinition(lexer) {
      if (peek(lexer, TokenKind.NAME)) {
        switch (lexer.token.value) {
          case 'query':
          case 'mutation':
          case 'subscription':
            return parseOperationDefinition(lexer);

          case 'fragment':
            return parseFragmentDefinition(lexer);
        }
      } else if (peek(lexer, TokenKind.BRACE_L)) {
        return parseOperationDefinition(lexer);
      }

      throw unexpected(lexer);
    } // Implements the parsing rules in the Operations section.

    /**
     * OperationDefinition :
     *  - SelectionSet
     *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
     */


    function parseOperationDefinition(lexer) {
      var start = lexer.token;

      if (peek(lexer, TokenKind.BRACE_L)) {
        return {
          kind: Kind.OPERATION_DEFINITION,
          operation: 'query',
          name: undefined,
          variableDefinitions: [],
          directives: [],
          selectionSet: parseSelectionSet(lexer),
          loc: loc(lexer, start)
        };
      }

      var operation = parseOperationType(lexer);
      var name;

      if (peek(lexer, TokenKind.NAME)) {
        name = parseName(lexer);
      }

      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: operation,
        name: name,
        variableDefinitions: parseVariableDefinitions(lexer),
        directives: parseDirectives(lexer, false),
        selectionSet: parseSelectionSet(lexer),
        loc: loc(lexer, start)
      };
    }
    /**
     * OperationType : one of query mutation subscription
     */


    function parseOperationType(lexer) {
      var operationToken = expect(lexer, TokenKind.NAME);

      switch (operationToken.value) {
        case 'query':
          return 'query';

        case 'mutation':
          return 'mutation';

        case 'subscription':
          return 'subscription';
      }

      throw unexpected(lexer, operationToken);
    }
    /**
     * VariableDefinitions : ( VariableDefinition+ )
     */


    function parseVariableDefinitions(lexer) {
      return peek(lexer, TokenKind.PAREN_L) ? many(lexer, TokenKind.PAREN_L, parseVariableDefinition, TokenKind.PAREN_R) : [];
    }
    /**
     * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
     */


    function parseVariableDefinition(lexer) {
      var start = lexer.token;
      return {
        kind: Kind.VARIABLE_DEFINITION,
        variable: parseVariable(lexer),
        type: (expect(lexer, TokenKind.COLON), parseTypeReference(lexer)),
        defaultValue: skip(lexer, TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : undefined,
        directives: parseDirectives(lexer, true),
        loc: loc(lexer, start)
      };
    }
    /**
     * Variable : $ Name
     */


    function parseVariable(lexer) {
      var start = lexer.token;
      expect(lexer, TokenKind.DOLLAR);
      return {
        kind: Kind.VARIABLE,
        name: parseName(lexer),
        loc: loc(lexer, start)
      };
    }
    /**
     * SelectionSet : { Selection+ }
     */


    function parseSelectionSet(lexer) {
      var start = lexer.token;
      return {
        kind: Kind.SELECTION_SET,
        selections: many(lexer, TokenKind.BRACE_L, parseSelection, TokenKind.BRACE_R),
        loc: loc(lexer, start)
      };
    }
    /**
     * Selection :
     *   - Field
     *   - FragmentSpread
     *   - InlineFragment
     */


    function parseSelection(lexer) {
      return peek(lexer, TokenKind.SPREAD) ? parseFragment(lexer) : parseField(lexer);
    }
    /**
     * Field : Alias? Name Arguments? Directives? SelectionSet?
     *
     * Alias : Name :
     */


    function parseField(lexer) {
      var start = lexer.token;
      var nameOrAlias = parseName(lexer);
      var alias;
      var name;

      if (skip(lexer, TokenKind.COLON)) {
        alias = nameOrAlias;
        name = parseName(lexer);
      } else {
        name = nameOrAlias;
      }

      return {
        kind: Kind.FIELD,
        alias: alias,
        name: name,
        arguments: parseArguments(lexer, false),
        directives: parseDirectives(lexer, false),
        selectionSet: peek(lexer, TokenKind.BRACE_L) ? parseSelectionSet(lexer) : undefined,
        loc: loc(lexer, start)
      };
    }
    /**
     * Arguments[Const] : ( Argument[?Const]+ )
     */


    function parseArguments(lexer, isConst) {
      var item = isConst ? parseConstArgument : parseArgument;
      return peek(lexer, TokenKind.PAREN_L) ? many(lexer, TokenKind.PAREN_L, item, TokenKind.PAREN_R) : [];
    }
    /**
     * Argument[Const] : Name : Value[?Const]
     */


    function parseArgument(lexer) {
      var start = lexer.token;
      return {
        kind: Kind.ARGUMENT,
        name: parseName(lexer),
        value: (expect(lexer, TokenKind.COLON), parseValueLiteral(lexer, false)),
        loc: loc(lexer, start)
      };
    }

    function parseConstArgument(lexer) {
      var start = lexer.token;
      return {
        kind: Kind.ARGUMENT,
        name: parseName(lexer),
        value: (expect(lexer, TokenKind.COLON), parseConstValue(lexer)),
        loc: loc(lexer, start)
      };
    } // Implements the parsing rules in the Fragments section.

    /**
     * Corresponds to both FragmentSpread and InlineFragment in the spec.
     *
     * FragmentSpread : ... FragmentName Directives?
     *
     * InlineFragment : ... TypeCondition? Directives? SelectionSet
     */


    function parseFragment(lexer) {
      var start = lexer.token;
      expect(lexer, TokenKind.SPREAD);
      var hasTypeCondition = skipKeyword(lexer, 'on');

      if (!hasTypeCondition && peek(lexer, TokenKind.NAME)) {
        return {
          kind: Kind.FRAGMENT_SPREAD,
          name: parseFragmentName(lexer),
          directives: parseDirectives(lexer, false),
          loc: loc(lexer, start)
        };
      }

      return {
        kind: Kind.INLINE_FRAGMENT,
        typeCondition: hasTypeCondition ? parseNamedType(lexer) : undefined,
        directives: parseDirectives(lexer, false),
        selectionSet: parseSelectionSet(lexer),
        loc: loc(lexer, start)
      };
    }
    /**
     * FragmentDefinition :
     *   - fragment FragmentName on TypeCondition Directives? SelectionSet
     *
     * TypeCondition : NamedType
     */


    function parseFragmentDefinition(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'fragment'); // Experimental support for defining variables within fragments changes
      // the grammar of FragmentDefinition:
      //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

      if (lexer.options.experimentalFragmentVariables) {
        return {
          kind: Kind.FRAGMENT_DEFINITION,
          name: parseFragmentName(lexer),
          variableDefinitions: parseVariableDefinitions(lexer),
          typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
          directives: parseDirectives(lexer, false),
          selectionSet: parseSelectionSet(lexer),
          loc: loc(lexer, start)
        };
      }

      return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: parseFragmentName(lexer),
        typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
        directives: parseDirectives(lexer, false),
        selectionSet: parseSelectionSet(lexer),
        loc: loc(lexer, start)
      };
    }
    /**
     * FragmentName : Name but not `on`
     */


    function parseFragmentName(lexer) {
      if (lexer.token.value === 'on') {
        throw unexpected(lexer);
      }

      return parseName(lexer);
    } // Implements the parsing rules in the Values section.

    /**
     * Value[Const] :
     *   - [~Const] Variable
     *   - IntValue
     *   - FloatValue
     *   - StringValue
     *   - BooleanValue
     *   - NullValue
     *   - EnumValue
     *   - ListValue[?Const]
     *   - ObjectValue[?Const]
     *
     * BooleanValue : one of `true` `false`
     *
     * NullValue : `null`
     *
     * EnumValue : Name but not `true`, `false` or `null`
     */


    function parseValueLiteral(lexer, isConst) {
      var token = lexer.token;

      switch (token.kind) {
        case TokenKind.BRACKET_L:
          return parseList(lexer, isConst);

        case TokenKind.BRACE_L:
          return parseObject(lexer, isConst);

        case TokenKind.INT:
          lexer.advance();
          return {
            kind: Kind.INT,
            value: token.value,
            loc: loc(lexer, token)
          };

        case TokenKind.FLOAT:
          lexer.advance();
          return {
            kind: Kind.FLOAT,
            value: token.value,
            loc: loc(lexer, token)
          };

        case TokenKind.STRING:
        case TokenKind.BLOCK_STRING:
          return parseStringLiteral(lexer);

        case TokenKind.NAME:
          if (token.value === 'true' || token.value === 'false') {
            lexer.advance();
            return {
              kind: Kind.BOOLEAN,
              value: token.value === 'true',
              loc: loc(lexer, token)
            };
          } else if (token.value === 'null') {
            lexer.advance();
            return {
              kind: Kind.NULL,
              loc: loc(lexer, token)
            };
          }

          lexer.advance();
          return {
            kind: Kind.ENUM,
            value: token.value,
            loc: loc(lexer, token)
          };

        case TokenKind.DOLLAR:
          if (!isConst) {
            return parseVariable(lexer);
          }

          break;
      }

      throw unexpected(lexer);
    }

    function parseStringLiteral(lexer) {
      var token = lexer.token;
      lexer.advance();
      return {
        kind: Kind.STRING,
        value: token.value,
        block: token.kind === TokenKind.BLOCK_STRING,
        loc: loc(lexer, token)
      };
    }

    function parseConstValue(lexer) {
      return parseValueLiteral(lexer, true);
    }

    function parseValueValue(lexer) {
      return parseValueLiteral(lexer, false);
    }
    /**
     * ListValue[Const] :
     *   - [ ]
     *   - [ Value[?Const]+ ]
     */


    function parseList(lexer, isConst) {
      var start = lexer.token;
      var item = isConst ? parseConstValue : parseValueValue;
      return {
        kind: Kind.LIST,
        values: any(lexer, TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
        loc: loc(lexer, start)
      };
    }
    /**
     * ObjectValue[Const] :
     *   - { }
     *   - { ObjectField[?Const]+ }
     */


    function parseObject(lexer, isConst) {
      var start = lexer.token;
      expect(lexer, TokenKind.BRACE_L);
      var fields = [];

      while (!skip(lexer, TokenKind.BRACE_R)) {
        fields.push(parseObjectField(lexer, isConst));
      }

      return {
        kind: Kind.OBJECT,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * ObjectField[Const] : Name : Value[?Const]
     */


    function parseObjectField(lexer, isConst) {
      var start = lexer.token;
      return {
        kind: Kind.OBJECT_FIELD,
        name: parseName(lexer),
        value: (expect(lexer, TokenKind.COLON), parseValueLiteral(lexer, isConst)),
        loc: loc(lexer, start)
      };
    } // Implements the parsing rules in the Directives section.

    /**
     * Directives[Const] : Directive[?Const]+
     */


    function parseDirectives(lexer, isConst) {
      var directives = [];

      while (peek(lexer, TokenKind.AT)) {
        directives.push(parseDirective(lexer, isConst));
      }

      return directives;
    }
    /**
     * Directive[Const] : @ Name Arguments[?Const]?
     */


    function parseDirective(lexer, isConst) {
      var start = lexer.token;
      expect(lexer, TokenKind.AT);
      return {
        kind: Kind.DIRECTIVE,
        name: parseName(lexer),
        arguments: parseArguments(lexer, isConst),
        loc: loc(lexer, start)
      };
    } // Implements the parsing rules in the Types section.

    /**
     * Type :
     *   - NamedType
     *   - ListType
     *   - NonNullType
     */


    function parseTypeReference(lexer) {
      var start = lexer.token;
      var type;

      if (skip(lexer, TokenKind.BRACKET_L)) {
        type = parseTypeReference(lexer);
        expect(lexer, TokenKind.BRACKET_R);
        type = {
          kind: Kind.LIST_TYPE,
          type: type,
          loc: loc(lexer, start)
        };
      } else {
        type = parseNamedType(lexer);
      }

      if (skip(lexer, TokenKind.BANG)) {
        return {
          kind: Kind.NON_NULL_TYPE,
          type: type,
          loc: loc(lexer, start)
        };
      }

      return type;
    }
    /**
     * NamedType : Name
     */

    function parseNamedType(lexer) {
      var start = lexer.token;
      return {
        kind: Kind.NAMED_TYPE,
        name: parseName(lexer),
        loc: loc(lexer, start)
      };
    } // Implements the parsing rules in the Type Definition section.

    /**
     * TypeSystemDefinition :
     *   - SchemaDefinition
     *   - TypeDefinition
     *   - DirectiveDefinition
     *
     * TypeDefinition :
     *   - ScalarTypeDefinition
     *   - ObjectTypeDefinition
     *   - InterfaceTypeDefinition
     *   - UnionTypeDefinition
     *   - EnumTypeDefinition
     *   - InputObjectTypeDefinition
     */

    function parseTypeSystemDefinition(lexer) {
      // Many definitions begin with a description and require a lookahead.
      var keywordToken = peekDescription(lexer) ? lexer.lookahead() : lexer.token;

      if (keywordToken.kind === TokenKind.NAME) {
        switch (keywordToken.value) {
          case 'schema':
            return parseSchemaDefinition(lexer);

          case 'scalar':
            return parseScalarTypeDefinition(lexer);

          case 'type':
            return parseObjectTypeDefinition(lexer);

          case 'interface':
            return parseInterfaceTypeDefinition(lexer);

          case 'union':
            return parseUnionTypeDefinition(lexer);

          case 'enum':
            return parseEnumTypeDefinition(lexer);

          case 'input':
            return parseInputObjectTypeDefinition(lexer);

          case 'directive':
            return parseDirectiveDefinition(lexer);
        }
      }

      throw unexpected(lexer, keywordToken);
    }

    function peekDescription(lexer) {
      return peek(lexer, TokenKind.STRING) || peek(lexer, TokenKind.BLOCK_STRING);
    }
    /**
     * Description : StringValue
     */


    function parseDescription(lexer) {
      if (peekDescription(lexer)) {
        return parseStringLiteral(lexer);
      }
    }
    /**
     * SchemaDefinition : schema Directives[Const]? { OperationTypeDefinition+ }
     */


    function parseSchemaDefinition(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'schema');
      var directives = parseDirectives(lexer, true);
      var operationTypes = many(lexer, TokenKind.BRACE_L, parseOperationTypeDefinition, TokenKind.BRACE_R);
      return {
        kind: Kind.SCHEMA_DEFINITION,
        directives: directives,
        operationTypes: operationTypes,
        loc: loc(lexer, start)
      };
    }
    /**
     * OperationTypeDefinition : OperationType : NamedType
     */


    function parseOperationTypeDefinition(lexer) {
      var start = lexer.token;
      var operation = parseOperationType(lexer);
      expect(lexer, TokenKind.COLON);
      var type = parseNamedType(lexer);
      return {
        kind: Kind.OPERATION_TYPE_DEFINITION,
        operation: operation,
        type: type,
        loc: loc(lexer, start)
      };
    }
    /**
     * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
     */


    function parseScalarTypeDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'scalar');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      return {
        kind: Kind.SCALAR_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        loc: loc(lexer, start)
      };
    }
    /**
     * ObjectTypeDefinition :
     *   Description?
     *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
     */


    function parseObjectTypeDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'type');
      var name = parseName(lexer);
      var interfaces = parseImplementsInterfaces(lexer);
      var directives = parseDirectives(lexer, true);
      var fields = parseFieldsDefinition(lexer);
      return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        description: description,
        name: name,
        interfaces: interfaces,
        directives: directives,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * ImplementsInterfaces :
     *   - implements `&`? NamedType
     *   - ImplementsInterfaces & NamedType
     */


    function parseImplementsInterfaces(lexer) {
      var types = [];

      if (skipKeyword(lexer, 'implements')) {
        // Optional leading ampersand
        skip(lexer, TokenKind.AMP);

        do {
          types.push(parseNamedType(lexer));
        } while (skip(lexer, TokenKind.AMP) || // Legacy support for the SDL?
        lexer.options.allowLegacySDLImplementsInterfaces && peek(lexer, TokenKind.NAME));
      }

      return types;
    }
    /**
     * FieldsDefinition : { FieldDefinition+ }
     */


    function parseFieldsDefinition(lexer) {
      // Legacy support for the SDL?
      if (lexer.options.allowLegacySDLEmptyFields && peek(lexer, TokenKind.BRACE_L) && lexer.lookahead().kind === TokenKind.BRACE_R) {
        lexer.advance();
        lexer.advance();
        return [];
      }

      return peek(lexer, TokenKind.BRACE_L) ? many(lexer, TokenKind.BRACE_L, parseFieldDefinition, TokenKind.BRACE_R) : [];
    }
    /**
     * FieldDefinition :
     *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
     */


    function parseFieldDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      var name = parseName(lexer);
      var args = parseArgumentDefs(lexer);
      expect(lexer, TokenKind.COLON);
      var type = parseTypeReference(lexer);
      var directives = parseDirectives(lexer, true);
      return {
        kind: Kind.FIELD_DEFINITION,
        description: description,
        name: name,
        arguments: args,
        type: type,
        directives: directives,
        loc: loc(lexer, start)
      };
    }
    /**
     * ArgumentsDefinition : ( InputValueDefinition+ )
     */


    function parseArgumentDefs(lexer) {
      if (!peek(lexer, TokenKind.PAREN_L)) {
        return [];
      }

      return many(lexer, TokenKind.PAREN_L, parseInputValueDef, TokenKind.PAREN_R);
    }
    /**
     * InputValueDefinition :
     *   - Description? Name : Type DefaultValue? Directives[Const]?
     */


    function parseInputValueDef(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      var name = parseName(lexer);
      expect(lexer, TokenKind.COLON);
      var type = parseTypeReference(lexer);
      var defaultValue;

      if (skip(lexer, TokenKind.EQUALS)) {
        defaultValue = parseConstValue(lexer);
      }

      var directives = parseDirectives(lexer, true);
      return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        description: description,
        name: name,
        type: type,
        defaultValue: defaultValue,
        directives: directives,
        loc: loc(lexer, start)
      };
    }
    /**
     * InterfaceTypeDefinition :
     *   - Description? interface Name Directives[Const]? FieldsDefinition?
     */


    function parseInterfaceTypeDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'interface');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var fields = parseFieldsDefinition(lexer);
      return {
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * UnionTypeDefinition :
     *   - Description? union Name Directives[Const]? UnionMemberTypes?
     */


    function parseUnionTypeDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'union');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var types = parseUnionMemberTypes(lexer);
      return {
        kind: Kind.UNION_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        types: types,
        loc: loc(lexer, start)
      };
    }
    /**
     * UnionMemberTypes :
     *   - = `|`? NamedType
     *   - UnionMemberTypes | NamedType
     */


    function parseUnionMemberTypes(lexer) {
      var types = [];

      if (skip(lexer, TokenKind.EQUALS)) {
        // Optional leading pipe
        skip(lexer, TokenKind.PIPE);

        do {
          types.push(parseNamedType(lexer));
        } while (skip(lexer, TokenKind.PIPE));
      }

      return types;
    }
    /**
     * EnumTypeDefinition :
     *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
     */


    function parseEnumTypeDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'enum');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var values = parseEnumValuesDefinition(lexer);
      return {
        kind: Kind.ENUM_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        values: values,
        loc: loc(lexer, start)
      };
    }
    /**
     * EnumValuesDefinition : { EnumValueDefinition+ }
     */


    function parseEnumValuesDefinition(lexer) {
      return peek(lexer, TokenKind.BRACE_L) ? many(lexer, TokenKind.BRACE_L, parseEnumValueDefinition, TokenKind.BRACE_R) : [];
    }
    /**
     * EnumValueDefinition : Description? EnumValue Directives[Const]?
     *
     * EnumValue : Name
     */


    function parseEnumValueDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      return {
        kind: Kind.ENUM_VALUE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        loc: loc(lexer, start)
      };
    }
    /**
     * InputObjectTypeDefinition :
     *   - Description? input Name Directives[Const]? InputFieldsDefinition?
     */


    function parseInputObjectTypeDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'input');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var fields = parseInputFieldsDefinition(lexer);
      return {
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description: description,
        name: name,
        directives: directives,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * InputFieldsDefinition : { InputValueDefinition+ }
     */


    function parseInputFieldsDefinition(lexer) {
      return peek(lexer, TokenKind.BRACE_L) ? many(lexer, TokenKind.BRACE_L, parseInputValueDef, TokenKind.BRACE_R) : [];
    }
    /**
     * TypeSystemExtension :
     *   - SchemaExtension
     *   - TypeExtension
     *
     * TypeExtension :
     *   - ScalarTypeExtension
     *   - ObjectTypeExtension
     *   - InterfaceTypeExtension
     *   - UnionTypeExtension
     *   - EnumTypeExtension
     *   - InputObjectTypeDefinition
     */


    function parseTypeSystemExtension(lexer) {
      var keywordToken = lexer.lookahead();

      if (keywordToken.kind === TokenKind.NAME) {
        switch (keywordToken.value) {
          case 'schema':
            return parseSchemaExtension(lexer);

          case 'scalar':
            return parseScalarTypeExtension(lexer);

          case 'type':
            return parseObjectTypeExtension(lexer);

          case 'interface':
            return parseInterfaceTypeExtension(lexer);

          case 'union':
            return parseUnionTypeExtension(lexer);

          case 'enum':
            return parseEnumTypeExtension(lexer);

          case 'input':
            return parseInputObjectTypeExtension(lexer);
        }
      }

      throw unexpected(lexer, keywordToken);
    }
    /**
     * SchemaExtension :
     *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
     *  - extend schema Directives[Const]
     */


    function parseSchemaExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'schema');
      var directives = parseDirectives(lexer, true);
      var operationTypes = peek(lexer, TokenKind.BRACE_L) ? many(lexer, TokenKind.BRACE_L, parseOperationTypeDefinition, TokenKind.BRACE_R) : [];

      if (directives.length === 0 && operationTypes.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.SCHEMA_EXTENSION,
        directives: directives,
        operationTypes: operationTypes,
        loc: loc(lexer, start)
      };
    }
    /**
     * ScalarTypeExtension :
     *   - extend scalar Name Directives[Const]
     */


    function parseScalarTypeExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'scalar');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);

      if (directives.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.SCALAR_TYPE_EXTENSION,
        name: name,
        directives: directives,
        loc: loc(lexer, start)
      };
    }
    /**
     * ObjectTypeExtension :
     *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
     *  - extend type Name ImplementsInterfaces? Directives[Const]
     *  - extend type Name ImplementsInterfaces
     */


    function parseObjectTypeExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'type');
      var name = parseName(lexer);
      var interfaces = parseImplementsInterfaces(lexer);
      var directives = parseDirectives(lexer, true);
      var fields = parseFieldsDefinition(lexer);

      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.OBJECT_TYPE_EXTENSION,
        name: name,
        interfaces: interfaces,
        directives: directives,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * InterfaceTypeExtension :
     *   - extend interface Name Directives[Const]? FieldsDefinition
     *   - extend interface Name Directives[Const]
     */


    function parseInterfaceTypeExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'interface');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var fields = parseFieldsDefinition(lexer);

      if (directives.length === 0 && fields.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.INTERFACE_TYPE_EXTENSION,
        name: name,
        directives: directives,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * UnionTypeExtension :
     *   - extend union Name Directives[Const]? UnionMemberTypes
     *   - extend union Name Directives[Const]
     */


    function parseUnionTypeExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'union');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var types = parseUnionMemberTypes(lexer);

      if (directives.length === 0 && types.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.UNION_TYPE_EXTENSION,
        name: name,
        directives: directives,
        types: types,
        loc: loc(lexer, start)
      };
    }
    /**
     * EnumTypeExtension :
     *   - extend enum Name Directives[Const]? EnumValuesDefinition
     *   - extend enum Name Directives[Const]
     */


    function parseEnumTypeExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'enum');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var values = parseEnumValuesDefinition(lexer);

      if (directives.length === 0 && values.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.ENUM_TYPE_EXTENSION,
        name: name,
        directives: directives,
        values: values,
        loc: loc(lexer, start)
      };
    }
    /**
     * InputObjectTypeExtension :
     *   - extend input Name Directives[Const]? InputFieldsDefinition
     *   - extend input Name Directives[Const]
     */


    function parseInputObjectTypeExtension(lexer) {
      var start = lexer.token;
      expectKeyword(lexer, 'extend');
      expectKeyword(lexer, 'input');
      var name = parseName(lexer);
      var directives = parseDirectives(lexer, true);
      var fields = parseInputFieldsDefinition(lexer);

      if (directives.length === 0 && fields.length === 0) {
        throw unexpected(lexer);
      }

      return {
        kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name: name,
        directives: directives,
        fields: fields,
        loc: loc(lexer, start)
      };
    }
    /**
     * DirectiveDefinition :
     *   - Description? directive @ Name ArgumentsDefinition? on DirectiveLocations
     */


    function parseDirectiveDefinition(lexer) {
      var start = lexer.token;
      var description = parseDescription(lexer);
      expectKeyword(lexer, 'directive');
      expect(lexer, TokenKind.AT);
      var name = parseName(lexer);
      var args = parseArgumentDefs(lexer);
      expectKeyword(lexer, 'on');
      var locations = parseDirectiveLocations(lexer);
      return {
        kind: Kind.DIRECTIVE_DEFINITION,
        description: description,
        name: name,
        arguments: args,
        locations: locations,
        loc: loc(lexer, start)
      };
    }
    /**
     * DirectiveLocations :
     *   - `|`? DirectiveLocation
     *   - DirectiveLocations | DirectiveLocation
     */


    function parseDirectiveLocations(lexer) {
      // Optional leading pipe
      skip(lexer, TokenKind.PIPE);
      var locations = [];

      do {
        locations.push(parseDirectiveLocation(lexer));
      } while (skip(lexer, TokenKind.PIPE));

      return locations;
    }
    /*
     * DirectiveLocation :
     *   - ExecutableDirectiveLocation
     *   - TypeSystemDirectiveLocation
     *
     * ExecutableDirectiveLocation : one of
     *   `QUERY`
     *   `MUTATION`
     *   `SUBSCRIPTION`
     *   `FIELD`
     *   `FRAGMENT_DEFINITION`
     *   `FRAGMENT_SPREAD`
     *   `INLINE_FRAGMENT`
     *
     * TypeSystemDirectiveLocation : one of
     *   `SCHEMA`
     *   `SCALAR`
     *   `OBJECT`
     *   `FIELD_DEFINITION`
     *   `ARGUMENT_DEFINITION`
     *   `INTERFACE`
     *   `UNION`
     *   `ENUM`
     *   `ENUM_VALUE`
     *   `INPUT_OBJECT`
     *   `INPUT_FIELD_DEFINITION`
     */


    function parseDirectiveLocation(lexer) {
      var start = lexer.token;
      var name = parseName(lexer);

      if (DirectiveLocation.hasOwnProperty(name.value)) {
        return name;
      }

      throw unexpected(lexer, start);
    } // Core parsing utility functions

    /**
     * Returns a location object, used to identify the place in
     * the source that created a given parsed object.
     */


    function loc(lexer, startToken) {
      if (!lexer.options.noLocation) {
        return new Loc(startToken, lexer.lastToken, lexer.source);
      }
    }

    function Loc(startToken, endToken, source) {
      this.start = startToken.start;
      this.end = endToken.end;
      this.startToken = startToken;
      this.endToken = endToken;
      this.source = source;
    } // Print a simplified form when appearing in JSON/util.inspect.


    defineToJSON(Loc, function () {
      return {
        start: this.start,
        end: this.end
      };
    });
    /**
     * Determines if the next token is of a given kind
     */

    function peek(lexer, kind) {
      return lexer.token.kind === kind;
    }
    /**
     * If the next token is of the given kind, return true after advancing
     * the lexer. Otherwise, do not change the parser state and return false.
     */


    function skip(lexer, kind) {
      if (lexer.token.kind === kind) {
        lexer.advance();
        return true;
      }

      return false;
    }
    /**
     * If the next token is of the given kind, return that token after advancing
     * the lexer. Otherwise, do not change the parser state and throw an error.
     */


    function expect(lexer, kind) {
      var token = lexer.token;

      if (token.kind === kind) {
        lexer.advance();
        return token;
      }

      throw syntaxError(lexer.source, token.start, "Expected ".concat(kind, ", found ").concat(getTokenDesc(token)));
    }
    /**
     * If the next token is a keyword with the given value, return true after advancing
     * the lexer. Otherwise, do not change the parser state and return false.
     */


    function skipKeyword(lexer, value) {
      var token = lexer.token;

      if (token.kind === TokenKind.NAME && token.value === value) {
        lexer.advance();
        return true;
      }

      return false;
    }
    /**
     * If the next token is a keyword with the given value, return that token after
     * advancing the lexer. Otherwise, do not change the parser state and throw
     * an error.
     */


    function expectKeyword(lexer, value) {
      if (!skipKeyword(lexer, value)) {
        throw syntaxError(lexer.source, lexer.token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(lexer.token)));
      }
    }
    /**
     * Helper function for creating an error when an unexpected lexed token
     * is encountered.
     */


    function unexpected(lexer, atToken) {
      var token = atToken || lexer.token;
      return syntaxError(lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token)));
    }
    /**
     * Returns a possibly empty list of parse nodes, determined by
     * the parseFn. This list begins with a lex token of openKind
     * and ends with a lex token of closeKind. Advances the parser
     * to the next lex token after the closing token.
     */


    function any(lexer, openKind, parseFn, closeKind) {
      expect(lexer, openKind);
      var nodes = [];

      while (!skip(lexer, closeKind)) {
        nodes.push(parseFn(lexer));
      }

      return nodes;
    }
    /**
     * Returns a non-empty list of parse nodes, determined by
     * the parseFn. This list begins with a lex token of openKind
     * and ends with a lex token of closeKind. Advances the parser
     * to the next lex token after the closing token.
     */


    function many(lexer, openKind, parseFn, closeKind) {
      expect(lexer, openKind);
      var nodes = [parseFn(lexer)];

      while (!skip(lexer, closeKind)) {
        nodes.push(parseFn(lexer));
      }

      return nodes;
    }

    var parser = /*#__PURE__*/Object.freeze({
        parse: parse,
        parseValue: parseValue,
        parseType: parseType,
        parseConstValue: parseConstValue,
        parseTypeReference: parseTypeReference,
        parseNamedType: parseNamedType
    });

    function getCjsExportFromNamespace (n) {
    	return n && n.default || n;
    }

    var _require = getCjsExportFromNamespace(parser);

    var _require2 = getCjsExportFromNamespace(source);

    var errors = getCjsExportFromNamespace(error);

    // Copyright 2019 Google LLC
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.
    var gql_parse = _require.parse;

    var Source$1 = _require2.Source;



    function parse$1(query) {
      if (!query) {
        throw new errors.syntaxError(null, 0, 'Null or empty string');
      }

      if (typeof query === 'string') {
        return gql_parse(new Source$1(query));
      }

      return query;
    }

    function getPaths(query) {
      query = parse$1(query);
      var all_entitlements = [];

      if (query.kind === 'Document' && query.definitions && query.definitions.length > 0) {
        query.definitions.forEach(function (definition) {
          var sub_entitlements = getPaths(definition);
          all_entitlements = all_entitlements.concat(sub_entitlements);
        });
      } else if (query.kind === 'OperationDefinition' && query.operation === 'query' && query.selectionSet && query.selectionSet.selections && query.selectionSet.selections.length > 0) {
        query.selectionSet.selections.forEach(function (selection) {
          var entitlements = getPaths(selection);
          entitlements.forEach(function (entitlement) {
            all_entitlements.push("query.".concat(entitlement));
          });
        });
      } else if (query.kind === 'OperationDefinition' && query.operation === 'mutation' && query.selectionSet && query.selectionSet.selections && query.selectionSet.selections.length > 0) {
        query.selectionSet.selections.forEach(function (selection) {
          var entitlements = getPaths(selection);
          entitlements.forEach(function (entitlement) {
            all_entitlements.push("mutation.".concat(entitlement));
          });
        });
      } else if (query.kind === 'Field') {
        var field_name = query.name.value;
        var sub_entitlements = [];

        if (query.selectionSet && query.selectionSet.selections && query.selectionSet.selections.length > 0) {
          query.selectionSet.selections.forEach(function (selection) {
            var entitlements = getPaths(selection);
            entitlements.forEach(function (entitlement) {
              sub_entitlements.push("".concat(field_name, ".").concat(entitlement));
            });
          });
        }

        if (sub_entitlements.length === 0) {
          all_entitlements.push(field_name);
        } else {
          all_entitlements = all_entitlements.concat(sub_entitlements);
        }
      } else if (query.kind === 'InlineFragment' && query.typeCondition && query.typeCondition.kind === 'NamedType') {
        var type_name = query.typeCondition.name.value;
        var _sub_entitlements = [];

        if (query.selectionSet && query.selectionSet.selections && query.selectionSet.selections.length > 0) {
          query.selectionSet.selections.forEach(function (selection) {
            var entitlements = getPaths(selection);
            entitlements.forEach(function (entitlement) {
              _sub_entitlements.push("".concat(type_name, ".").concat(entitlement));
            });
          });
        }

        if (_sub_entitlements.length === 0) {
          all_entitlements.push(type_name);
        } else {
          all_entitlements = all_entitlements.concat(_sub_entitlements);
        }
      }

      return all_entitlements;
    }

    function entitlement_equals(a, b) {
      if (a === b) {
        return true;
      } // convert the left-side into a regular expression


      var regex = '^' + a //add the regex begin marker
      .replace(/\./g, '\\.') //escape dots (these are special characters)
      .replace(/\*\*/g, '.+') //convert ** into a Regex
      .replace(/\*/g, '[^.]+') //convert * into Regex
      + '$'; //add the regex end marker

      return b.match(regex) !== null;
    }
    /***
     * This function takes a GraphQL query and checks that all the selections
     * in the query are satisfied by the given list of entitlements.
     *
     *
     * Each entitlement itself is structured as a Dot separated hierarchy of Fields
     *
     *     e.g.
     *     GrandParent.Parent.Child
     *
     * You can use a single wildcard as place-holder for a single field
     *
     *     e.g.
     *     GrandParent.*.Child
     *     (This would match the Child field who has a GrandParent, two levels up)
     *
     * You can use double wildcard as placeholder for multiple fields
     *
     *     e.g.
     *     GrandParent.**
     *     (This would match any hierarchy that starts with GrandParent)
     *
     *
     *
     * @param query
     * @param entitlements
     * @return
     *
     * Returns empty array [], if all the query entitlements are satisfied by the given list of entitlements
     * Otherwise, it returns the list of query entitlements which have not been satisfied.
     */


    function authorize(query) {
      var entitlements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (typeof entitlements == 'string') {
        entitlements = entitlements.split(/[\s,;]+/);
      }

      query = parse$1(query);
      var query_entitlements = getPaths(query); // perform a comparison between given entitlements and requested entitlements from query
      // whenever a match is found, the element is removed from the array
      // if the request array is empty, it means all the erquests match/overlap w/entitelments 

      entitlements.forEach(function (entitlement) {
        if (query_entitlements.length == 0) {
          //exit early if there are no more query entitlements to match
          return;
        }

        var elements_to_remove = [];

        for (var i = 0; i < query_entitlements.length; i++) {
          var query_entitlement = query_entitlements[i];

          if (entitlement_equals(entitlement, query_entitlement)) {
            elements_to_remove.push(i);
          }
        } //remove matched elements


        for (var j = elements_to_remove.length - 1; j >= 0; j--) {
          var element_to_remove = elements_to_remove[j];
          query_entitlements.splice(element_to_remove, 1);
        }
      });
      return query_entitlements;
    }

    function make_node(field, origin, definitions) {
      var type_name = get_field_type_name(field);
      return {
        name: field.name.value,
        children: [],
        scopes: get_scopes_from_field(field).concat(get_scopes_from_type(definitions[type_name])),
        origin: origin || false,
        type: type_name
      };
    }

    function make_entitlements(path, scope) {
      var fields = [];
      path.forEach(function (node) {
        fields.push(node.name);
      });
      var entitlements = [];

      if (scope.self) {
        entitlements.push(fields.join("."));
      }

      if (scope.children) {
        entitlements.push(fields.join(".") + ".*");
      }

      if (scope.descendants) {
        entitlements.push(fields.join(".") + ".**");
      }

      return entitlements;
    }

    function boolean(value, defaultValue) {
      if (typeof value === 'boolean') {
        return value;
      }

      return defaultValue;
    }

    function get_scope_from_directive(directive) {

      if (directive.name.value !== 'scope') {
        return;
      }

      var args = {};
      directive.arguments.forEach(function (arg) {
        args[arg.name.value] = arg.value.value;
      });
      return {
        name: args.name,
        query: boolean(args.query, false),
        mutation: boolean(args.mutation, false),
        descendants: boolean(args.cascade, true)
      };
    }

    function get_scopes_from_directives(directives) {
      var scopes = [];

      if (!directives || !directives.length) {
        return scopes;
      }

      directives.forEach(function (directive) {
        var scope = get_scope_from_directive(directive);

        if (scope) {
          scopes.push(scope);
        }
      });
      return scopes;
    }

    function get_scopes_from_type(type) {
      if (!type) {
        return [];
      }

      var scopes = get_scopes_from_directives(type.directives);
      scopes.forEach(function (scope) {
        scope.children = true;
        scope.self = false;
      });
      return scopes;
    }

    function get_scopes_from_field(field) {
      if (!field) {
        return [];
      }

      var scopes = get_scopes_from_directives(field.directives);
      scopes.forEach(function (scope) {
        scope.children = false;
        scope.self = true;
      });
      return scopes;
    }

    function get_field_type_name(field) {
      if (field.type) {
        return get_field_type_name(field.type);
      }

      return field.name.value;
    }

    function schemaToGraph(parsedSchema) {
      var graph = [];
      var visited_types = {};
      var queue = [];
      var definitions = {};
      parsedSchema.definitions.forEach(function (definition) {
        definitions[definition.name.value] = definition;
      });
      var root_query = make_node(definitions['Query'], true, definitions);
      root_query.name = root_query.name.toLowerCase();
      queue.push(root_query);
      var root_mutation = make_node(definitions['Mutation'], true, definitions);
      root_mutation.name = root_mutation.name.toLowerCase();
      queue.push(root_mutation);

      var _loop = function _loop() {
        var node = queue.shift();

        if (visited_types[node.type]) {
          visited_types[node.type].children.forEach(function (child) {
            node.children.push(child);
          });
          graph.push(node);
          return "continue";
        }

        if (!definitions[node.type] || !definitions[node.type].fields) {
          graph.push(node);
          return "continue";
        }

        definitions[node.type].fields.forEach(function (field) {
          var child_node = make_node(field, false, definitions);
          node.children.push(child_node);
          queue.push(child_node);
        });
        visited_types[node.type] = {
          "children": node.children
        };
        graph.push(node);
      };

      while (queue.length > 0) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }

      return graph;
    }

    function is_mutation_path(path) {
      if (!path || !path.length) {
        return false;
      }

      var origin = path[0];
      return origin.name === 'mutation';
    }

    function is_query_path(path) {
      if (!path || !path.length) {
        return false;
      }

      var origin = path[0];
      return origin.name === 'query';
    }
    /***
     * This function derives the entitlements from a GraphQL schema that is annotated with @scope directives
     **
     * The location of the @scope directive indicates the paths that are accessible by the given scope.
     *
     * The @scope directive to a GraphQL type, or a field within a type.
     * Depending on where you put the @scope directive, it has different meaning.
     *
     * 1) If the @scope directive appears on a GraphQL type, then it applies to all fields of this GraphQL type
     *  (NOTE: this is not the same as all the fields within the GraphQL type)
     *
     * 2) If the @scope directive appears on a field, then it applies only the field itself (regardless of the GraphQL type)
     *
     *
     * The @scope directive is defined as follows:
     *
     *  directive  @scope(name: String!, query: Boolean, mutation: Boolean, cascade: Boolean)
     *
     *  name - This is the name of the scope
     *  query (default: false) - Whether or not this scope is relevant to GraphQL queries
     *  mutation (default: false) - Whether or not this scope is relevant to GraphQL mutations
     *  cascade - (default: true) Whether or not this scope is applicable to all the descendants of the field.
     *
     *
     * @param schemaText
     * @return
     *
     * Returns an object containing a map of scope name to a list of entitlements from the schema.
     *
     * { "scopeA": [ "query.employee","query.employee.**"],
     *   "scopeB" : [ "query.company","query.company.**"]
     *  }
     *
     */


    function schemaToEntitlements(schema) {
      schema = parse$1(schema);
      var graph = schemaToGraph(schema); // starting at origins, find all possible paths to any scopes.
      // When ready to add a path, see if scope exists in object. If not,
      // create entry.
      //arbitrarily using stack for DFS

      var stack = [];
      var paths = {};
      graph.forEach(function (node) {
        if (node.origin) {
          stack.push([node]);
        }
      });

      var _loop2 = function _loop2() {
        var path = stack.pop();
        var last_node = path[path.length - 1]; //all scopes will be strings

        if (last_node.scopes.length > 0) {
          last_node.scopes.forEach(function (scope) {
            if (!paths[scope.name]) {
              paths[scope.name] = [];
            }

            if (is_mutation_path(path) && !scope.mutation) {
              return;
            }

            if (is_query_path(path) && !scope.query) {
              return;
            }

            paths[scope.name] = paths[scope.name].concat(make_entitlements(path, scope));
          });
        }

        last_node.children.forEach(function (child) {
          //check if child exists in path already to avoid loops
          var found_loop = false;
          path.forEach(function (element) {
            if (element === child) {
              found_loop = true;
              return;
            }
          });

          if (found_loop) {
            return;
          }

          stack.push(path.concat([child]));
        });
      };

      while (stack.length > 0) {
        _loop2();
      }

      return paths;
    }

    var getPaths_1 = getPaths;
    var parse_1 = parse$1;
    var authorize_1 = authorize;
    var schemaToEntitlements_1 = schemaToEntitlements;
    var errors_1 = errors;

    var graphql = {
    	getPaths: getPaths_1,
    	parse: parse_1,
    	authorize: authorize_1,
    	schemaToEntitlements: schemaToEntitlements_1,
    	errors: errors_1
    };

    // Copyright 2019 Google LLC
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.
    var errors$1 = graphql.errors;

    function errorMessage(ex) {
      if (!ex) {
        return "";
      }

      if (ex instanceof errors$1.GraphQLError) {
        var message = ex.message;

        if (ex.locations) {
          message += ". Location: " + JSON.stringify(ex.locations);
        }

        return message;
      }

      return ex.message;
    }

    var errorMessage_1 = errorMessage;

    var util = {
    	errorMessage: errorMessage_1
    };

    // Copyright 2019 Google LLC
    //
    // Licensed under the Apache License, Version 2.0 (the "License");
    // you may not use this file except in compliance with the License.
    // You may obtain a copy of the License at
    //
    //      http://www.apache.org/licenses/LICENSE-2.0
    //
    // Unless required by applicable law or agreed to in writing, software
    // distributed under the License is distributed on an "AS IS" BASIS,
    // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    // See the License for the specific language governing permissions and
    // limitations under the License.
    var setVar$1 = resolver.setVar,
        resolveProp$1 = resolver.resolveProp;

    var authorize$1 = graphql.authorize,
        errors$2 = graphql.errors;

    var errorMessage$1 = util.errorMessage;

    function authz() {
      var input = resolveProp$1("input");
      var entitlements = resolveProp$1("entitlements");
      var debug = resolveProp$1("debug");

      if (debug) {
        print("graphql.authz.input: " + input);
        print("graphql.authz.entitlements: " + entitlements);
      }

      try {
        var unauthorized_paths = authorize$1(input, entitlements);
        var authorized = unauthorized_paths.length === 0;

        if (debug) {
          print("graphql.authz.unauthorized_paths: " + unauthorized_paths.join(","));
          print("graphql.authz.authorized: " + authorized);
        }

        setVar$1("graphql.authz.authorized", authorized);

        if (authorized) {
          return; //exit early
        }

        var error_message = "GraphQL: Unauthorized access to: " + unauthorized_paths.join(",");

        if (debug) {
          print("graphql.authz.error_message: " + error_message);
        }

        setVar$1("graphql.authz.unauthorized_paths", unauthorized_paths);
        setVar$1("graphql.authz.error_message", error_message);
        throw error_message;
      } catch (ex) {
        if (ex instanceof errors$2.GraphQLError) {
          var message = errorMessage$1(ex);
          setVar$1("graphql.authz.error_message", message);
          throw message;
        }

        throw ex;
      }
    }

    authz();

    var graphql_jsc = {

    };

    exports.default = graphql_jsc;

    }
     Main(exports);

    return exports;

}({}));
