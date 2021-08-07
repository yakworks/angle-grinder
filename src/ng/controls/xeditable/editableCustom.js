import angular from 'angular'

var app = angular.module('ag.xeditable')

// Ability to provide custom template directly in the DOM
app.directive('editableCustom', [
  'editableDirectiveFactory', function(editableDirectiveFactory) {
    const result = editableDirectiveFactory({ directiveName: 'editableCustom' })

    // Here be dragons...
    const { compile } = result
    result.compile = function(element) {
      // find template element, grab its html and remove it from the DOM
      const templateEl = element.next('[editable-custom-template]')
      const tpl = templateEl.html()
      templateEl.remove()

      compile.apply(this, arguments)

      // override linking function
      const { link } = result
      return function(scope, element, attrs, ctrl) {
        // assign a template to the editable controller
        const eCtrl = ctrl[0]
        eCtrl.inputTpl = tpl

        return link.apply(this, arguments)
      }
    }

    return result
  }
])
