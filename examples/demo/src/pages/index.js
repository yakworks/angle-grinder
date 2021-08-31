import orgShowModule from './org'

import batchModule from './batchList'

import ngSvelteMod from './ngSvelte'

// export module name
export default angular
  .module('ag.demo.pages', [
    orgShowModule,

    batchModule,

    ngSvelteMod

  ])
  .name
