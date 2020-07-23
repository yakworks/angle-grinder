import angular from 'angular'
import agModule from 'angle-grinder/src/angle-grinder'

//app layout items
import freshLayoutModule from './fresh'

// demo sections
import gridsModule from './grids'

// store
import dataApiModule from './store'

export default angular.module('app', [
  agModule,
  dataApiModule,
  freshLayoutModule,
  gridsModule
]).name
