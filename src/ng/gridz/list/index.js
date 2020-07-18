import gridMod from '../module'
import agGridList from './ag-grid-list'
import agGridListSearch from './ag-grid-list-search'

angular.module(gridMod)
  .component('agGridListSearch', agGridListSearch)
  .component('agGridList', agGridList)
