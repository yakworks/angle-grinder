describe "module: angleGrinder.forms", ->

  beforeEach module "angleGrinder.forms"

  $scope = null

  beforeEach inject ($rootScope) ->
    $scope = $rootScope.$new()

  describe "directive: maxLines", ->
    $injector = null
    element = null
    form = null
    modelCtrl = null
    modelValue = null

    compileTemplate = (str) ->
      $compile = $injector.get("$compile")
      element = $compile(str)($scope)
      $scope.$digest()

    setProfile = (str) ->
      $scope.$apply -> modelCtrl.$setViewValue str

    beforeEach inject (_$injector_) ->
      $injector = _$injector_
      compileTemplate """
        <form name="form">
          <div ag-field-group for="profile">
            <textarea name="profile" ng-model="user.profile" ag-max-lines="3"></textarea>
          </div>
        </form>
      """

      form = $scope.form
      modelCtrl = form.profile
      modelValue = $scope.user = {}

    describe "when number of lines exceed", ->
      beforeEach ->
        setProfile("line1 \n line2 \n line3 \n line4")

      it "sets field as invalid", ->
        expect(modelCtrl.$valid).to.be.false
        expect(modelCtrl.$error.maxlines).to.be.true
        expect(modelValue.profile).to.be.undefined

      it "sets form as invalid", ->
        expect(form.$valid).to.be.false
        expect(form.$error.maxlines[0].$name).to.equal "profile"


    describe "when number of lines are less", ->
      beforeEach ->
        setProfile "line1 \n line2"

      it "marks field as valid", ->
        expect(modelCtrl.$valid).to.be.true

      it "marks form as valid", ->
        expect(form.$valid).to.be.true


    describe "when number of lines are equal", ->
      beforeEach ->
        setProfile "line1 \n line2 \n line3"

      it "marks field as valid", ->
        expect(modelCtrl.$valid).to.be.true

      it "marks form as valid", ->
        expect(form.$valid).to.be.true


