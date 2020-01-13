import angular from 'angular'
import commonModule from './commonModule'

var app = angular.module(commonModule)

// Convert line braks to html
app.filter('newLines', () => function(text) {
  if (!angular.isString(text)) { return text }
  return text.replace(/\n/g, '<br />')
})
