'use strict'

window.toastr = require('toastr')

/* @ngInject */
export default class ToasterDemoCtrl {
  constructor() {
    this.type = 'success',
    this.title = 'Title',
    this.text = 'Message'
  }

  pop(text) {
    toastr[this.type](this.text, this.title)
  }
}
