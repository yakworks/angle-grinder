import template from './component.html'

class controller {
  vm = {}

  editFormFields = {
    foo:{},
    bar:{},
    baz:{}
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
      {key: 'baz'}
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
