import basicMod from './basic'
import complexMod from './complex'

export default angular
  .module('demo.components.tabs', [
    basicMod,
    complexMod
  ])
  .name // .name returns the module name
