import angular from 'angular'
import basicGridModule from './basicGrid'
import basicRestGridModule from './basicGridRest'
import configGridModule from './configGrid'
import legacyGridModule from './legacyGrid'
// import './restGrid/component'
// import './legacyGrid/searchForm/component'
// import './restGrid/restGridExample'
// import './commonComponents/searchForm/component'

const gapp = angular.module('demo.gridz', [
  basicGridModule,
  basicRestGridModule,
  configGridModule,
  legacyGridModule
])

gapp.config(['agDateFilterProvider', provider => // set default date format
  provider.setDefaultFormat('MM/DD/YY H:mm a')
])

gapp.run(function($templateCache) {
  $templateCache.put('exampleGridSearchForm.html', require('./commonComponents/searchForm/searchForm.html'))
  $templateCache.put('formDialog.html', require('./commonComponents/form/formDialog.html'))
})

export default gapp.name

