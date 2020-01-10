/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module('angleGrinder.common')

// Build an url with the query string from the given params
app.value('urlBuilder', function(path, params) {
  if (params == null) { params = {} }
  const queryString = _.chain(params).map((value, key) => `${key}=${value}`).join('&').value()
  return _.filter([path, queryString], part => part.length > 0).join('?')
})

/*
Sample context path configuration:

```
app.config [
"pathWithContextProvider", (pathWithContextProvider) ->
  contextPath = $("body").data("context-path")
  pathWithContextProvider.setContextPath(contextPath)
]
```
*/
app.provider('pathWithContext', function() {
  let contextPath = '/'

  // strips '/' from the end and the beginning
  const sanitizePath = function(path) {
    if (path.length === 0) { return '/' }
    return '/' + path.replace(/\/*$/, '').replace(/^\/*/, '')
  }

  // Returns sanitized context path
  return {
    setContextPath(path) {
      contextPath = sanitizePath(path)
    }, // it cannot return a value

    $get: [
      'urlBuilder', urlBuilder => function(path, params) {
      // build a path with the context
        if (params == null) { params = {} }
        path = _.filter([contextPath, sanitizePath(path)], part => !_.isNil(part) && (part !== '/')).join('')
        // append query string from the given params
        return urlBuilder(path, params)
      }

    ]
  }
})

app.filter('withContext', ['pathWithContext', pathWithContext => path => pathWithContext(path)
])
