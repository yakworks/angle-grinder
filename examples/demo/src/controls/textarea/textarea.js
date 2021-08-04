import template from './textarea.html'

class controller {
  vm = {
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
      'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
      'when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  }
}

export default angular.module('ag.demo.textarea', [])
  .component('textareaDemo', { template, controller })
  .name
