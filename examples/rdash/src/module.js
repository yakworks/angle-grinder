import angular from 'angular'
import uibootstrap from 'angular-ui-bootstrap' // uibootstrap is just a string with the name of the module
import ngcookies from 'angular-cookies'
import uirouter from 'angular-ui-router'

angular.module('RDash', [uibootstrap, uirouter, ngcookies])

export default 'RDash'
