import angular from 'angular'
import filtersModule from './filtersModule'

var app = angular.module(filtersModule)

// Convert line braks to html
app.filter('newLines', () => function(text) {
  if (!angular.isString(text)) { return text }
  return text.replace(/\n/g, '<br />')
})
