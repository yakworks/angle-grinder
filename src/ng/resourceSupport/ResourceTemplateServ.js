import angular from 'angular'
import resourceModule from './resourceModule'

angular.module(resourceModule)
  .constant('contextPath', $('body').data('contextPath'))
// Generate a template url for the given resource and path
  .constant('ResourceTemplateServ', function(resource, path) {
    const parts = []

    parts.push($('body').data('contextPath'))
    parts.push(resource.replace(/^\//, ''))
    parts.push(path)

    return parts.join('/')
  })
