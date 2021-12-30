export default function setupTypes(formlyConfig) {
  function setType(cfg) {
    formlyConfig.setType(cfg)
  }

  setType({
    name: 'input',
    template: `<ag-input ng-model="model[options.key]" label-key="id" element-id="{{id}}"
      label="{{to.label}}" min-length="{{to.minLength}}" hint="{{to.hint}}" max-length="{{to.maxLength}}" ></ag-input>`
  })

  setType({
    name: 'input-wildcard',
    template: `<ag-input-wildcard ng-model="model[options.key]" label-key="id" element-id="{{id}}"
      label="{{to.label}}" min-length="{{to.minLength}}" hint="{{to.hint}}" max-length="{{to.maxLength}}" ></ag-input-wildcard>`
  })

  setType({
    name: 'input-list',
    template: `<ag-input-list ng-model="model[options.key]" label-key="id" element-id="{{id}}"
      label="{{to.label}}" min-length="{{to.minLength}}" hint="{{to.hint}}" max-length="{{to.maxLength}}" >
      </ag-input-list>`
  })

  setType({
    name: 'textarea',
    template: '<ag-textarea label="{{to.label}}" rows="{{to.rows}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-textarea>'
  })

  setType({
    name: 'select',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}" element-id="{{id}}"
        select-options="to.selectOptions" api-key="{{to.dataApiKey}}">
      </ag-select>`
  })

  setType({
    name: 'select-addon',
    template: `<ag-select label="{{to.label}}" ng-model="model[options.key]" hint="{{to.hint}}" element-id="{{id}}"
        select-options="to.selectOptions" api-key="{{to.dataApiKey}}">
        <ag-button color="{{to.addon.color}}" icon-left="{{to.addon.icon}}" ng-click="to.onClick($event)">{{to.addon.text}}</ag-button>
      </ag-select>`
  })

  setType({
    name: 'checkbox',
    template: '<ag-checkbox label="{{to.label}}" ng-model="model[options.key]" element-id="{{id}}" hint="{{to.hint}}"></ag-checkbox>'
  })

  setType({
    name: 'date',
    template: '<ag-date is-expanded label="{{to.label}}" element-id="{{id}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-date>'
  })
  setType({
    name: 'date-range',
    template: '<ag-daterange label="{{to.label}}" element-id="{{id}}" ng-model="model[options.key]" hint="{{to.hint}}"></ag-daterange>'
  })

  setType({
    name: 'amount',
    template: '<ag-amount label="{{to.label}}" ng-model="model[options.key]" element-id="{{id}}" hint="{{to.hint}}"></ag-amount>'
  })
  setType({
    name: 'amount-range',
    template: '<ag-amount-range label="{{to.label}}" ng-model="model[options.key]" element-id="{{id}}" hint="{{to.hint}}"></ag-amount-range>'
  })

  setType({
    name: 'label',
    template: '<ag-label ng-required="{{to.required}}">{{to.label}}</ag-label>'
  })
}
