// CSS and Sass
import 'angle-grinder/src/styles/vendor.css.js'
// import 'angle-grinder/src/styles/all.scss'
import './assets/styles.scss'
// framework7
import 'angle-grinder/svelte/framework7'

// VENDOR
import 'angle-grinder/src/vendor'

// logging turn on debug
import $log from '@yakit/core/logger'

// load the angular modules
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
import './grids'

// $log.debugEnabled(true)

