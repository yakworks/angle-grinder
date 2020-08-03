import AgBaseControl from '../AgBaseControl'

class Controller extends AgBaseControl {
  $onInit() {
    super.onInit()
    this.newTag = ''
  }

  $postLink() {
    const element = this.$element
    element.bind('keydown', (e) => {
      const key = e.which
      if ((key === 9) || (key === 13)) {
        if (this.newTag.length === 0) return
        e.preventDefault()
      }
      if (key === 8) { this.$scope.$apply(() => this.deleteTag()) }
    })

    element.bind('keyup', (e) => {
      const key = e.which
      // Tab, Enter or , pressed
      if ((key === 9) || (key === 13) || (key === 188)) {
        if (this.newTag.length === 0) return
        e.preventDefault()
        return this.$scope.$apply(() => this.addTag())
      }
    })

    element.bind('focusout', (e) => {
      e.preventDefault()
      return this.$scope.$apply(() => this.addTag())
    })
  }

  tagArray() {
    if (this.value === undefined) { return [] }
    return this.value
  }

  addTag() {
    if (this.newTag.length === 0) { return }
    const tagArray = this.tagArray()
    if (!Array.from(tagArray).includes(this.newTag)) {
      this.updateValue(_.uniq([...tagArray, ...this.newTag.split(',')]))
    }
    return this.newTag = ''
  }

  deleteTag(key) {
    const tagArray = this.tagArray()
    if ((tagArray.length > 0) && (this.newTag.length === 0) && (key === undefined)) {
      tagArray.pop()
    } else if (key !== undefined) {
      tagArray.splice(key, 1)
    }
    this.updateValue(tagArray)
  }

  updateValue(tagArray) {
    this.value = tagArray.filter(tag => tag !== '')
    this.onChange()
  }
}

export default () => ({
  ...AgBaseControl.common.dir,
  template: require('./ag-input-list.html'),
  controller: Controller,
  require: {
    ngModelCtrl: 'ngModel',
    formCtrl: '^agForm'
  },
  scope: {
    ...AgBaseControl.common.scope
  }
})
