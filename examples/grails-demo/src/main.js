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

import './grids'
import {setClientConfig} from 'angle-grinder/src/dataApi/ky'

setClientConfig({prefixUrl: 'http://localhost:8080'})
$log.debugEnabled(true)
