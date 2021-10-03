// import agFormly from './ag-formly'
import agFormlyForm from './ag-formly-form'
import formlyModName from 'angular-formly'
import formlyTypes from './formlyTypes'
import FormlyFormController from './formly-form.controller'

// disable the api-checks for formly
const apiCheck = require('api-check')
apiCheck.globalConfig.disabled = true

const mod = angular
  .module('ag.formly', [formlyModName])
  .directive('agFormlyForm', agFormlyForm)
  .controller('FormlyFormController', FormlyFormController)
  // .directive('agFormly', agFormly)

mod.config(function(formlyConfigProvider) {
  'ngInject';
  formlyTypes(formlyConfigProvider)
})

export default mod.name
