// skinny down version of just what we need from https://github.com/mschlitz-trux/ui-bootstrap4.git
// which is the updated bootstrap4 fork of the original https://github.com/angular-ui/bootstrap

import dropdownMod from './src/dropdown'
import tabsMod from './src/tabs'
import modalMod from './src/modal'
import popoverMod from './src/popover'
import tooltipMod from './src/tooltip'

angular.module('ui.bootstrap', [
  dropdownMod,
  tabsMod,
  modalMod,
  popoverMod,
  tooltipMod
])

export default 'ui.bootstrap'
