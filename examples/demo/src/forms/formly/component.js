import template from './component.html'

class controller {
  vm = {}

  editFormFields = {
    foo:{},
    bar:{},
    baz:{}
  }
  editColFields = {
    column1:{
      foo:{}
    },
    column2:{
      bar:{}
    },
    column3:{
      baz:{}
    }
  }

}

export default angular.module('demo.formlyExample', [])
  .component('formlyExample', {template, controller})
  .name
