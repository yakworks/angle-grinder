import angular from 'angular'
import './restApiGrid/component'
import './grid/component'
import './basicGrid/component'
import './searchForm/component'

const app = angular.module('app')

app.config(['agDateFilterProvider', provider => // set default date format
  provider.setDefaultFormat('MM/DD/YY H:mm a')
])

app.config(['agCurrencyFilterProvider', function(provider) {
  // set default currency format
  // provider.setDefaultFormat('<%= amount %> <%= symbol %>')
  // return provider.setDefaultSymbol('GBP')
}
])

app.run(function($templateCache) {
  $templateCache.put('exampleGridSearchForm.html', require('./searchForm/searchForm.html'))
  $templateCache.put('formDialog.html', require('./form/formDialog.html'))
})

