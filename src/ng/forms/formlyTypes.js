const MOD_NAME = 'angleGrinder.forms'
var forms = angular.module(MOD_NAME)

forms.config(['formlyConfigProvider', function(formlyConfig) {
  formlyConfig.setType({
    name: 'input',
    template: `<ag-input ng-model="model[options.key]" label-key="options.key"
      label="{{to.label}}" min-length="{{to.minLength}}" max-length="{{to.maxLength}}" ></ag-input>`
  })
  formlyConfig.setType({
    name: 'textarea',
    template: '<ag-textarea label="{{to.label}}" rows="{{to.rows}}" ng-model="model[options.key]"></ag-textarea>'
  })

  formlyConfig.setType({
    name: 'select',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]"
        select-options="{ useDataObject:true}" api-key="{{to.dataApiKey}}">
      </ag-select>`
  })

  formlyConfig.setType({
    name: 'checkbox',
    template: '<ag-checkbox label="{{to.label}}" ng-model="model[options.key]" hint="{{to.label}}"></ag-checkbox>'
  })

  formlyConfig.setType({
    name: 'date',
    template: '<ag-datepicker label="{{to.label}}" ng-model="model[options.key]"></ag-datepicker>'
  })
}])
