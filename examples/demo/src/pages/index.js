import orgShowModule from './org'
import batchModule from './batchList'

// export module name
export default angular
  .module('ag.demo.pages', [
    orgShowModule,
    batchModule
  ])
  .name
