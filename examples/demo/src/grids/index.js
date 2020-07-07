import angular from 'angular'
import basicGridModule from './basicGrid'
import configGridModule from './configGrid'
// import './restGrid/component'
// import './legacyGrid/component'
// import './legacyGrid/demoGridExample'
// import './legacyGrid/searchForm/component'
// import './restGrid/restGridExample'
// import './commonComponents/searchForm/component'

const gapp = angular.module('demo.gridz', [
  basicGridModule,
  configGridModule
])

gapp.config(['agDateFilterProvider', provider => // set default date format
  provider.setDefaultFormat('MM/DD/YY H:mm a')
])

gapp.run(function($templateCache) {
  $templateCache.put('exampleGridSearchForm.html', require('./commonComponents/searchForm/searchForm.html'))
  $templateCache.put('formDialog.html', require('./commonComponents/form/formDialog.html'))
})

export default gapp.name

