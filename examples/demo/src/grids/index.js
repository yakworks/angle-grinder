import angular from 'angular'
import localStoreGrid from './localStoreGrid'
import customGridList from './customGridList'
import legacyGridModule from './legacyGrid'
import twoGrids from './twoGrids'


const gapp = angular.module('demo.gridz', [
  localStoreGrid,
  customGridList,
  legacyGridModule,
  twoGrids
])


gapp.run(function($templateCache) {
  $templateCache.put('exampleGridSearchForm.html', require('./legacyGrid/commonComponents/searchForm/searchForm.html'))
  $templateCache.put('formDialog.html', require('./legacyGrid/commonComponents/form/formDialog.html'))
})

export default gapp.name

