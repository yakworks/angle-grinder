/* global angular, hljs */
import hljs from 'highlight.js'
import _ from 'lodash'

/**
 * returns a function to transform attrs to supported ones
 *
 * escape:
 *   hljs-escape or escape
 * no-escape:
 *   hljs-no-escape or no-escape
 * onhighlight:
 *   hljs-onhighlight or onhighlight
 */
function attrGetter(attrs) {
  return function(name) {
    switch (name) {
      case 'escape':
        return angular.isDefined(attrs.hljsEscape)
          ? attrs.hljsEscape
          : attrs.escape

      case 'no-escape':
        return angular.isDefined(attrs.hljsNoEscape)
          ? attrs.hljsNoEscape
          : attrs.noEscape

      case 'onhighlight':
        return angular.isDefined(attrs.hljsOnhighlight)
          ? attrs.hljsOnhighlight
          : attrs.onhighlight
    }
  }
}

function shouldHighlightStatics(attrs) {
  var should = true
  angular.forEach([
    'source', 'include'
  ], function(name) {
    if (attrs[name]) {
      should = false
    }
  })
  return should
}

var ngModule = angular.module('hljs', [])

export default ngModule.name

/**
 * hljsService service
 */
ngModule.provider('hljsService', function() {
  var _hljsOptions = {}

  return {
    setOptions: function(options) {
      _.extend(_hljsOptions, options)
    },
    getOptions: function() {
      return _.cloneDeep(_hljsOptions)
    },
    $get: function() {
      (hljs.configure || angular.noop)(_hljsOptions)
      return hljs
    }
  }
})

/**
 * hljsCache service
 */
ngModule.factory('hljsCache', function($cacheFactory) {
  return $cacheFactory('hljsCache')
})

/**
 * HljsCtrl controller
 */
ngModule.controller('HljsCtrl',
  function HljsCtrl(hljsCache, hljsService, $interpolate, $window) {
    var ctrl = this

    var _elm = null
    var _lang = null
    var _code = null
    var _interpolateScope = false
    var _stopInterpolateWatch = null
    var _hlCb = null

    var RE_INTERPOLATION_STR = escapeRe($interpolate.startSymbol()) +
    '((.|\\s)+?)' + escapeRe($interpolate.endSymbol())

    var INTERPOLATION_SYMBOL = '∫'

    ctrl.init = function(codeElm) {
      _elm = codeElm
    }

    ctrl.setInterpolateScope = function(scope) {
      _interpolateScope = scope

      if (_code) {
        ctrl.highlight(_code)
      }
    }

    ctrl.setLanguage = function(lang) {
      _lang = lang

      if (_code) {
        ctrl.highlight(_code)
      }
    }

    ctrl.highlightCallback = function(cb) {
      _hlCb = cb
    }

    ctrl._highlight = function(code) {
      if (!_elm) {
        return
      }

      var res, cacheKey, interpolateData

      _code = code // preserve raw code

      if (_interpolateScope) {
        interpolateData = extractInterpolations(code)
        code = interpolateData.code
      }

      if (_lang) {
      // cache key: language, scope, code
        cacheKey = ctrl._cacheKey(_lang, !!_interpolateScope, code)
        res = hljsCache.get(cacheKey)

        if (!res) {
          res = hljsService.highlight(_lang, hljsService.fixMarkup(code), true)
          hljsCache.put(cacheKey, res)
        }
      } else {
      // cache key: scope, code
        cacheKey = ctrl._cacheKey(!!_interpolateScope, code)
        res = hljsCache.get(cacheKey)

        if (!res) {
          res = hljsService.highlightAuto(hljsService.fixMarkup(code))
          hljsCache.put(cacheKey, res)
        }
      }

      code = res.value

      if (_interpolateScope) {
        (_stopInterpolateWatch || angular.noop)()

        if (interpolateData) {
          code = recoverInterpolations(code, interpolateData.tokens)
        }

        var interpolateFn = $interpolate(code)
        _stopInterpolateWatch = _interpolateScope.$watch(interpolateFn, function(newVal, oldVal) {
          if (newVal !== oldVal) {
            _elm.html(newVal)
          }
        })
        _interpolateScope.$apply()
        _elm.html(interpolateFn(_interpolateScope))
      } else {
        _elm.html(code)
      }

      // language as class on the <code> tag
      _elm.addClass(res.language)

      if (_hlCb !== null && angular.isFunction(_hlCb)) {
        _hlCb()
      }
    }
    ctrl.highlight = debounce(ctrl._highlight, 17)

    ctrl.clear = function() {
      if (!_elm) {
        return
      }
      _code = null
      _elm.text('')
    }

    ctrl.release = function() {
      _elm = null
      _interpolateScope = null;
      (_stopInterpolateWatch || angular.noop)()
      _stopInterpolateWatch = null
    }

    ctrl._cacheKey = function() {
      var args = Array.prototype.slice.call(arguments)
      var glue = '!angular-highlightjs!'
      return args.join(glue)
    }

    // http://davidwalsh.name/function-debounce
    function debounce(func, wait, immediate) {
      var timeout
      return function() {
        var context = this; var args = arguments
        var later = function() {
          timeout = null
          if (!immediate) {
            func.apply(context, args)
          }
        }
        var callNow = immediate && !timeout
        $window.clearTimeout(timeout)
        timeout = $window.setTimeout(later, wait)
        if (callNow) {
          func.apply(context, args)
        }
      }
    }

    // Ref: http://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    function escapeRe(text, asString) {
      var replacement = asString ? '\\\\$&' : '\\$&'
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, replacement)
    }

    function extractInterpolations(code) {
      var interpolateTokens = []
      var re = new RegExp(RE_INTERPOLATION_STR, 'g')
      var newCode = ''
      var lastIndex = 0
      var arr

      while ((arr = re.exec(code)) !== null) {
        newCode += code.substring(lastIndex, arr.index) + INTERPOLATION_SYMBOL
        lastIndex = arr.index + arr[0].length
        interpolateTokens.push(arr[0])
      }

      newCode += code.substr(lastIndex)

      return {
        code: newCode,
        tokens: interpolateTokens
      }
    }

    function recoverInterpolations(code, tokens) {
      var re = new RegExp(INTERPOLATION_SYMBOL, 'g')
      var newCode = ''
      var lastIndex = 0
      var arr

      while ((arr = re.exec(code)) !== null) {
        newCode += code.substring(lastIndex, arr.index) + tokens.shift()
        lastIndex = arr.index + arr[0].length
      }

      newCode += code.substr(lastIndex)

      return newCode
    }
  })

/**
 * hljs directive
 */
ngModule.directive('hljs', function($parse) {
  return {
    restrict: 'EA',
    controller: 'HljsCtrl',
    compile: function(tElm, tAttrs, transclude) {
      // get static code
      // strip the starting "new line" character
      var staticHTML = tElm[0].innerHTML.replace(/^(\r\n|\r|\n)/, '')
      var staticText = tElm[0].textContent.replace(/^(\r\n|\r|\n)/, '')

      // put template
      tElm.html('<pre><code class="hljs"></code></pre>')

      return function postLink(scope, iElm, iAttrs, ctrl) {
        var escapeCheck

        var attrs = attrGetter(iAttrs)

        if (angular.isDefined(attrs('escape'))) {
          escapeCheck = $parse(attrs('escape'))
        } else if (angular.isDefined(attrs('no-escape'))) {
          escapeCheck = $parse('false')
        }

        ctrl.init(iElm.find('code'))

        if (attrs('onhighlight')) {
          ctrl.highlightCallback(function() {
            scope.$eval(attrs('onhighlight'))
          })
        }

        if ((staticHTML || staticText) && shouldHighlightStatics(iAttrs)) {
          var code

          // Auto-escape check
          // default to "true"
          if (escapeCheck && !escapeCheck(scope)) {
            code = staticText
          } else {
            code = staticHTML
          }

          ctrl.highlight(code)
        }

        scope.$on('$destroy', function() {
          ctrl.release()
        })
      }
    }
  }
})

/**
 * language directive
 */
ngModule.directive('hljsLanguage', () => ({
  require: '?hljs',
  restrict: 'A',
  link: function(scope, iElm, iAttrs, ctrl) {
    if (!ctrl) {
      return
    }
    iAttrs.$observe('hljsLanguage', function(lang) {
      if (angular.isDefined(lang)) {
        ctrl.setLanguage(lang)
      }
    })
  }
}))

/**
 * source directive
 */
ngModule.directive('hljsSource', function() {
  return {
    require: '?hljs',
    restrict: 'A',
    link: function(scope, iElm, iAttrs, ctrl) {
      if (!ctrl) {
        return
      }

      scope.$watch(iAttrs.hljsSource, function(newCode, oldCode) {
        if (newCode) {
          ctrl.highlight(newCode)
        } else {
          ctrl.clear()
        }
      })
    }
  }
})
