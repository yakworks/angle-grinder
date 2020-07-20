// jquery should be included seperately
window.jQuery = require('jquery')
window.$ = window.jQuery

require('bootstrap-sass/assets/javascripts/bootstrap/dropdown')
require('bootstrap-sass/assets/javascripts/bootstrap/tooltip') // required by popover
require('bootstrap-sass/assets/javascripts/bootstrap/popover') // required by clickover

require('../components/bootstrapx-clickover/bootstrapx-clickover')

require('free-jqgrid/js/jquery.jqgrid.src')

require('Select2/select2')
require('moment')
require('later/later')
require('perfect-scrollbar')
// require('toastr/toastr.js')
// require('sweetalert/lib/sweet-alert.js')
// used for grid pivot
require('jquery-ui/ui/widgets/draggable')
require('jquery-ui/ui/widgets/sortable')
require('jquery-ui/ui/widgets/droppable')
// require('ladda')
