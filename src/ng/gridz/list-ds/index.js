import gridMod from '../module'
import agGridDatastore from './ag-grid-datastore'
import agGridDsSearch from './ag-grid-ds-search'

angular.module(gridMod)
  .component('agGridDatastore', agGridDatastore)
  .component('agGridDsSearch', agGridDsSearch)
