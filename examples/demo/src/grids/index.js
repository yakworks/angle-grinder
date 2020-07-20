import angular from 'angular'
import localStoreGrid from './localStoreGrid'
import customGridList from './customGridList'
import legacyGridModule from './legacyGrid'


const gapp = angular.module('demo.gridz', [
  localStoreGrid,
  customGridList,
  legacyGridModule
])

// gapp.config(['agDateFilterProvider', provider => // set default date format
//   provider.setDefaultFormat('MM/DD/YY H:mm a')
// ])

gapp.run(function($templateCache) {
  $templateCache.put('exampleGridSearchForm.html', require('./legacyGrid/commonComponents/searchForm/searchForm.html'))
  $templateCache.put('formDialog.html', require('./legacyGrid/commonComponents/form/formDialog.html'))
})

export default gapp.name

