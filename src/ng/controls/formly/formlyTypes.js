
export default function setupTypes(formlyConfig) {
  formlyConfig.setType({
    name: 'input',
    template: `<ag-input ng-model="model[options.key]" label-key="options.key"
      label="{{to.label}}" min-length="{{to.minLength}}" hint="{{to.hint}}" max-length="{{to.maxLength}}" ></ag-input>`
  })
  formlyConfig.setType({
    name: 'textarea',
    template: '<ag-textarea label="{{to.label}}" rows="{{to.rows}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-textarea>'
  })

  formlyConfig.setType({
    name: 'select',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"
        select-options="to.selectOptions" api-key="{{to.dataApiKey}}">
      </ag-select>`
  })

  formlyConfig.setType({
    name: 'select-multi',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"
        select-options="to.selectOptions" api-key="{{to.dataApiKey}}">
      </ag-select>`
  })

  formlyConfig.setType({
    name: 'checkbox',
    template: '<ag-checkbox label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-checkbox>'
  })

  formlyConfig.setType({
    name: 'date',
    template: '<ag-datepicker is-expanded label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-datepicker>'
  })

  formlyConfig.setType({
    name: 'amount',
    template: '<ag-amount label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-amount>'
  })

  formlyConfig.setType({
    name: 'label',
    template: '<ag-label ng-required="{{to.required}}">{{to.label}}</ag-label>'
  })
}
