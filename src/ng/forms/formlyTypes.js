const MOD_NAME = 'angleGrinder.forms'
var forms = angular.module(MOD_NAME)

forms.config(['formlyConfigProvider', function(formlyConfig) {
  formlyConfig.setType({
    name: 'input',
    template: `<ag-input ng-model="model[options.key]" label-key="options.key"
      label="{{to.label}}"></ag-input>`
  })

  formlyConfig.setType({
    name: 'select',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]"
        select-options="{ useDataObject:true, dataApiKey: '{{to.dataApiKey}}'}" data-api-key="{{to.dataApiKey}}">
      </ag-select>`
  })
}])
