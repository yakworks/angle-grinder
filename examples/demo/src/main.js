// CSS and Sass
// import './assets/vendor.css.js'
import '~/styles/vendor.css.js'
import '~/styles/all.scss'
import './assets/styles.scss'
//import './assets/plugins.scss'

// VENDOR
import '~/vendor'

//logging turn on debug
import $log from 'angle-grinder/src/ng/utils/Log'
$log.debugEnabled(true)

import './app'
//import './directives/sidebars.js'
import './directives/full-height.js'
import './directives/panel-tools.js'
import './directives/dismiss.js'
//import './directives/select.js'
import './directives/messages.js'
// import "./directives/chat.js"
//import './directives/touchspin.js'

// Controllers
import './app/AppCtrl'
// examples
import './controllers/inboxCtrl'
import './controllers/bootstrapCtrl'
import './controllers/chatCtrl'
import './app/sidebar/SideNavCtrl'
// UI Demo
import './ui/buttons'
import './ui/icons'
import './ui/alerts'
import './ui/tabs'
import './grids'
