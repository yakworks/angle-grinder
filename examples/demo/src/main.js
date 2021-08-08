// CSS and Sass
import 'angle-grinder/src/styles/vendor.css.js'
import 'angle-grinder/src/styles/all.scss'
import './assets/styles.scss'

// VENDOR
import '~/vendor'

// logging turn on debug
import $log from 'angle-grinder/src/utils/Log'

import './app.config'
import './AppCtrl'

// import './directives/sidebars.js'
import './directives/full-height.js'
import './directives/panel-tools.js'
import './directives/dismiss.js'
// import './directives/select.js'
import './directives/messages.js'
// import "./directives/chat.js"
// import './directives/touchspin.js'

// examples
import './controllers/inboxCtrl'
import './controllers/bootstrapCtrl'
import './controllers/chatCtrl'

// UI Demo
import './ui/tabs'
import './ui/alerts'
import './ui/icons/'
import './grids'

$log.debugEnabled(true)
