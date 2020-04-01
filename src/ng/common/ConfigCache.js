import angular from 'angular'
import commonModule from './commonModule'

var app = angular.module(commonModule)

app.provider('ConfigCache', function() {
  this.$get = ['$cacheFactory', '$http', 'pathWithContext', '$q', '$timeout', function($cacheFactory, $http, pathWithContext, $q) {
    const cache = $cacheFactory('configsFromServer')
    const urls = []
    const hasUrl = (url) => {
      return !angular.isUndefined(cache.get(url))
    }

    const cloneConfig = (conf) => {
      // jqgrid adds `action` column to colModel, and if we return same object it will add column on each reload
      if (conf.colModel) {
        return { ...conf, colModel: [...conf.colModel] }
      }
      return { ...conf }
    }
    const putToCache = (url, value) => {
      if (angular.isUndefined(cache.get(url))) {
        urls.push(url)
      }
      cache.put(url, cloneConfig(value))
    }
    const getFromCache = (key) => {
      return cloneConfig(cache.get(key))
    }
    return {
      put: function(url, value) {
        putToCache(url, value)
      },
      get: function(url, onSuccess = data => {
        return { ...data }
      }) {
        const def = $q.defer()
        if (hasUrl(url)) {
          def.resolve(onSuccess(getFromCache(url)))
        } else {
          $http.get(pathWithContext(url)).then((resp) => {
            // In cache we store result that was got from remote
            putToCache(url, resp.data)
            // to user return data with changes from onSuccess
            def.resolve(onSuccess(resp.data))
          })
        }
        return def.promise
      },
      getFromCache(url) {
        return getFromCache(url)
      },
      getUrls() {
        return urls
      },
      hasUrl(url) {
        return hasUrl(url)
      }
    }
  }]
})
