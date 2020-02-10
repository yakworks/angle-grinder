'use strict'
/* eslint-disable */
describe('validationSummary directive', function() {
  var form; var $httpBackend; var summary
  var $rootScope
  var template = '<form ag-form strategy="submitted">' +
      '<input name="firstName" ng-model="firstName" required msg-required="Test message">' +
      '<input name="lastName" ng-model="lastName" msg-something="Something">' +
      '<ag-validation-summary></ag-validation-summary>' +
      '</form>'
  var templatePartial = '<div id="tmp"><ul></ul></div>'

  beforeEach(module('agValidations'))
  beforeEach(inject(function(_$rootScope_, $compile, $templateCache) {
    $rootScope = _$rootScope_
    $templateCache.put('agForm/summary/validationSummary.html', templatePartial)
  }))

  describe('basic template', function() {
    beforeEach(inject(function(_$rootScope_, $compile) {
      form = $compile(template)($rootScope.$new())
      summary = form.find('#tmp')
    }))

    it('should set errors on the scope', function() {
      form.triggerHandler('submit')
      $rootScope.$broadcast('AgForm.ErrorsUpdated')
      expect(summary.scope().errors).toEqual([{
        label: '',
        key: 'required',
        message: 'Test message'
      }])
      expect(summary.scope().showErrors).toBe(true)
    })

    it('should add label to message if label is set', function() {
      form.find('input:first').controller('ngModel').$label = 'Test Label'
      form.triggerHandler('submit')
      $rootScope.$broadcast('AgForm.ErrorsUpdated')
      expect(summary.scope().errors).toEqual([{
        label: 'Test Label',
        key: 'required',
        message: 'Test message'
      }])
      expect(summary.scope().showErrors).toBe(true)
    })
  })
})
