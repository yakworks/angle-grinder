'use strict'
import toast from 'angle-grinder/src/tools/toast'

/* @ngInject */
export default class ToasterDemoCtrl {
  constructor() {
    this.type = 'success',
    this.title = 'Title',
    this.text = 'Message'
  }

  pop(text) {
    toast[this.type](this.text, this.title)
  }
}
