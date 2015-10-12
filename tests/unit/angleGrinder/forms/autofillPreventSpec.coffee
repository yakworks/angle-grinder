describe "module: angleGrinder.forms directive: autofillPrevent", ->
  beforeEach module "angleGrinder.forms"

  element = null
  $scope = null
  ngModel = null

  beforeEach inject ($rootScope, $compile) ->
    $scope = $rootScope.$new()
    $scope.user = password: "password"

    element = angular.element """
        <input type="password"
					   name="password"
					   ng-model="user.password"
					   ng-required="user.newRecord()" autofill-prevent />
      """
    $compile(element)($scope)
    $scope.$digest()
    ngModel = element.data("$ngModelController")

  describe "$viewChangeListeners", ->

    beforeEach ->
      ngModel.$viewChangeListeners[0] = sinon.stub()

    it "reaction for changes in ngModel", ->
      expect(ngModel.$viewValue).to.equal "password"
      # Set new value to ngModel.$viewValue
      ngModel.$setViewValue "newAutofillValue"
      # If listener reacts on ngModel.$viewValue changes
      expect(ngModel.$viewChangeListeners[0]).to.be.a "function"
      expect(ngModel.$viewChangeListeners[0]).to.have.been.called
      # ngModel.$viewValue should have a new value
      expect(ngModel.$viewValue).to.equal "newAutofillValue"

  describe "autofill prevention", ->

    it "ngModel.$viewValue", ->
      expect(ngModel.$viewValue).to.equal "password"
      ngModel.$setViewValue "newAutofillValue"
      # ngModel.$viewValue should roll back to previous value
      expect(ngModel.$viewValue).to.equal undefined

