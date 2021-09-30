import angular from 'angular'

var filtersMod = angular.module('ag.filters', [])

// change default locale to use `-` symbol for negative currencies
filtersMod.config(function($localeProvider, $provide) {
  'ngInject';
  const defaultLocale = $localeProvider.$get()

  angular.extend(defaultLocale.NUMBER_FORMATS.PATTERNS[1], {
    negPre: '-',
    negSuf: ''
  })

  return $provide.value('$locale', defaultLocale)
})

// filter to convert html to plain text
filtersMod.filter('htmlToPlaintext', function() {
  return function(text) {
    return String(text).replace(/<[^>]+>/gm, '')
  }
})

export default filtersMod.name
