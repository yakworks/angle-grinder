import angular from 'angular'
import './restGrid/component'
import './legacyGrid/component'
import './basicGrid/basicGridExample'
import './legacyGrid/demoGridExample'
import './legacyGrid/searchForm/component'
import './restGrid/restGridExample'
import './commonComponents/searchForm/component'

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
  $templateCache.put('exampleGridSearchForm.html', require('./commonComponents/searchForm/searchForm.html'))
  $templateCache.put('formDialog.html', require('./commonComponents/form/formDialog.html'))
})

