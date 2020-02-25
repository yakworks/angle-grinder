import angular from 'angular'
import _ from 'lodash'

const MOD_NAME = 'ag.pathWithContext'
export default MOD_NAME

const app = angular.module(MOD_NAME, [])

// Build an url with the query string from the given params
app.value('urlBuilder', function(path, params) {
  if (params == null) { params = {} }
  // see https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba

  const queryString = _.join(_.map(params, (value, key) => `${key}=${value}`), '&')
  // const queryString = _.chain(params).map((value, key) => `${key}=${value}`).join('&').value()
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

app.filter('withContext', ['pathWithContext', pathWithContext => path => pathWithContext(path)])
