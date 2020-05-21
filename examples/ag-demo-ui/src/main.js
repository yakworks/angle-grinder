// CSS and Sass
import 'angle-grinder/src/styles/vendor.css.js'
import 'angle-grinder/src/styles/all.scss'
import './assets/styles.scss'

// VENDOR
import 'angle-grinder/src/vendor'

// logging turn on debug
import $log from 'angle-grinder/src/utils/Log'

import angular from 'angular'
import uibootstrap from 'angular-ui-bootstrap' // uibootstrap is just a string with the name of the module
import Org from './org/index'
import OrgTab from './tabbedOrg/index'
import User from './user/index'
import OrgShowCase from './orgShowCase/index'

import './layout/AppCtrl'
import './layout/app.config'

const forms = angular.module('angleGrinder.forms')

// Just an example for configuring dates formats
forms.config([
  'agDateProvider', function(provider) {
    provider.setViewFormat('MM/DD/YY')
    return provider.setLocalDateFormat('YYYY-MM-DD')
  }
])
