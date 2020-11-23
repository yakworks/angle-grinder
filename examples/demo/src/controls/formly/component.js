import template from './component.html'

class controller {
  vm = {}

  componentClick = ($event) => {
    if (this.vm.formly_2_addonSelect){
      return alert(`Customer ${this.vm.formly_2_addonSelect} is selected` )
    }
    alert('Search clicked')
  }

  editColFields = {
    column1:[
      {key: 'foo'},
      {key: 'foo2'}
    ],
    column2:[
      {key: 'bar'},
      {key: 'bar2'}
    ],
    column3:[
      {key: 'baz'},
      { key: 'addonSelect', type: 'select-addon', addon:{icon: 'fa-search', text: 'Search', action: 'componentClick'},
        selectOptions: {dataApiKey: 'customer'}
      }
    ]
  }

  // editColFields = {
  //   column1:[
  //     {key: 'foo'},
  //     {key: 'foo2'}
  //   ],
  //   column2:[
  //     {key: 'bar'},
  //     {key: 'bar2'}
  //   ],
  //   column3:[
  //     {key: 'baz'}
  //   ]
  // }
}

export default angular.module('demo.formlyExample', [])
  .component('formlyExample', {template, controller})
  .name
