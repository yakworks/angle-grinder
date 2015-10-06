beforeEach ->
  mocks = angular.module "mocks", []

  mocks.factory "formMock", ->
    class FormMock
      constructor: -> @$setValidity(false)

      $setValidity: (valid) ->
        @$valid = valid
        @$invalid = not valid
        this

    -> new FormMock()

  angular.mock.module "angleGrinder.forms", "mocks"
