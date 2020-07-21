
export default function setupTypes(formlyConfig) {
  function setType(cfg) {
    formlyConfig.setType(cfg)
  }

  setType({
    name: 'input',
    template: `<ag-input ng-model="model[options.key]" label-key="options.key"
      label="{{to.label}}" min-length="{{to.minLength}}" hint="{{to.hint}}" max-length="{{to.maxLength}}" ></ag-input>`
  })
  setType({
    name: 'input-list',
    template: `<ag-input-list ng-model="model[options.key]" label-key="options.key"
      label="{{to.label}}" min-length="{{to.minLength}}" hint="{{to.hint}}" max-length="{{to.maxLength}}" >
      </ag-input-list>`
  })

  setType({
    name: 'textarea',
    template: '<ag-textarea label="{{to.label}}" rows="{{to.rows}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-textarea>'
  })

  setType({
    name: 'select',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"
        select-options="to.selectOptions" api-key="{{to.dataApiKey}}">
      </ag-select>`
  })

  setType({
    name: 'checkbox',
    template: '<ag-checkbox label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-checkbox>'
  })

  setType({
    name: 'date',
    template: '<ag-datepicker is-expanded label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-datepicker>'
  })
  setType({
    name: 'date-range',
    template: '<ag-daterange label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-daterange>'
  })

  setType({
    name: 'amount',
    template: '<ag-amount label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-amount>'
  })
  setType({
    name: 'amount-range',
    template: '<ag-amount-range label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-amount-range>'
  })

  setType({
    name: 'label',
    template: '<ag-label ng-required="{{to.required}}">{{to.label}}</ag-label>'
  })
}
